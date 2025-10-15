import { loadState } from '@nextcloud/initial-state'
import {
	createConnection,
	subscribeEntities,
	createLongLivedTokenAuth,
} from 'home-assistant-js-websocket'
import YAML from 'yaml'
import axios from '@nextcloud/axios'
import { generateUrl } from '@nextcloud/router'

document.addEventListener('DOMContentLoaded', () => {
	OCA.Dashboard.register('hass-yaml-widget', (el, { widget }) => {
		try {
			const yamlEntities = YAML.parse(loadState('integration_homeassistant', 'dashboard-yaml-widget'))
			if (yamlEntities.type !== 'entities') {
				el.innerHTML = 'YAML is not of "type: entities"'
			}
			Object.values(yamlEntities.entities).forEach(entry => {
				if (entry.type === 'divider') {
					el.innerHTML += '<div class="entity-line type-divider"><hr style="width: 100%"></div>'
				} if (entry.type === 'section') {
					el.innerHTML += `<hr style="width: 100%"><div class="entity-line type-section">${entry.label}</div>`
				} if (entry.type === 'weblink') {
					el.innerHTML += `<div class="entity-line type-weblink"><a target="_blank" href="${entry.url}">${entry.name}</a</div>`
				} else if (entry.entity) {
					const name = entry.name ?? entry.entity
					let handler = ''
					if (entry.entity.startsWith('light') || entry.entity.startsWith('switch')) {
						handler = `<label class="switch"><input type="checkbox" data-entity-id="${entry.entity}"><span class="slider round"></span></label>`
					} else if (entry.entity.startsWith('media_player') || entry.entity.startsWith('sensor')) {
						handler = `<span data-entity-id="${entry.entity}"> - &nbsp; &nbsp;</span>`
					} else if (entry.entity.startsWith('script')) {
						handler = `<input type="button" data-entity-id="${entry.entity}" value="RUN">`
					}
					el.innerHTML += `<div class="entity-line entity"><div><p title="${name}">${name}</p></div><div>${handler}</div></div>`
				 }
			})
		} catch (e) {
			el.innerHTML = Object.keys(e).length
				? JSON.stringify(e)
				: 'Nothing to show :))<br><br>Go to "Administrator settings" > "Home assistant integration" to get started.'
		}
		const url = new URL(loadState('integration_homeassistant', 'dashboard-base-url'))
		const auth = createLongLivedTokenAuth(
			`${url.protocol}//${url.host}`,
			loadState('integration_homeassistant', 'dashboard-long-lived-access-token').trim(),
		)
		createConnection({ auth })
			.then((connection) => subscribeEntities(connection, (entities) => {
				document.querySelectorAll('[data-entity-id]').forEach(element => {
					const entity = entities[element.dataset.entityId]
					if (element.tagName === 'INPUT' && element.getAttribute('type') === 'checkbox') {
						element.checked = entity?.state === 'on'
						element.disabled = entity?.state === 'unavailable' || !entity
					} else {
						element.innerHTML = entity?.state + ' ' + (entity?.attributes?.unit_of_measurement ?? '')
					}

					const nameP = element.closest('div.entity-line').querySelector('p')
					const name = nameP.dataset.initName || entity?.attributes?.friendly_name
					if (name !== nameP.innerHTML) {
						nameP.innerHTML = name
						nameP.setAttribute('title', name)
					}
				})
			})).catch(() => { el.innerHTML = 'Cannot connect to websocket server!<br><br>' + el.innerHTML })

	})
})

document.addEventListener('click', async (e) => {
	if (!e.target.dataset.entityId) return
	const { checked, dataset: { entityId } } = e.target
	if (entityId.startsWith('light') || entityId.startsWith('switch')) {
		await axios.post(generateUrl(`/apps/integration_homeassistant/turn_${checked ? 'on' : 'off'}`), { entity_id: entityId })
	} else if (entityId.startsWith('script')) {
		await axios.post(generateUrl('/apps/integration_homeassistant/run_script'), { entity_id: entityId })
	}
}, false)
