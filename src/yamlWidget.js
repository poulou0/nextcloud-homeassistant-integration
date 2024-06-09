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
		el.parentElement.style.overflow = 'auto'
		try {
			const yamlEntities = YAML.parse(loadState('integration_homeassistant', 'dashboard-yaml-widget'))
			if (yamlEntities.type !== 'entities') {
				el.innerHTML = 'YAML is not of "type: entities"'
			}
			const checkboxHTML = (entityId) => {
				return `<label class="switch"><input type="checkbox" data-entity-id="${entityId}"><span class="slider round"></span></label>`
			}
			const sensorHTML = (entityId) => {
				return `<span data-entity-id="${entityId}"> - &nbsp; &nbsp;</span>`
			}
			Object.values(yamlEntities.entities).forEach(entry => {
				if (entry.type === 'divider') {
					el.innerHTML += '<div class="entity-line type-divider"><hr style="width: 100%"></div>'
					return
				} if (entry.type === 'section') {
					el.innerHTML += `<div class="entity-line type-section">${entry.label}</div>`
					return
				} if (entry.type === 'weblink') {
					el.innerHTML += `<div class="entity-line type-weblink"><a target="_blank" href="${entry.url}">${entry.name}</a</div>`

				} else if (entry.entity) {
					const isLightOrSensor = entry.entity.startsWith('light') || entry.entity.startsWith('switch')
					const name = entry.name ?? entry.entity
					el.innerHTML += `<div class="entity-line entity">
						<div><p data-init-name="${entry.name ?? ''}" title="${name}">${name}</p></div>
						<div>${isLightOrSensor ? checkboxHTML(entry.entity) : sensorHTML(entry.entity)}</div>
					</div>`
				 }
			})
		} catch (e) {
			el.innerHTML = Object.keys(e).length
				? JSON.stringify(e)
				: 'Nothing to show :))<br><br>Go to "Administrator settings" > "Home assistant integration" to get started.'
		}
		const auth = createLongLivedTokenAuth(
			loadState('integration_homeassistant', 'dashboard-base-url'),
			loadState('integration_homeassistant', 'dashboard-long-lived-access-token'),
		)
		createConnection({ auth })
			.then((connection) => subscribeEntities(connection, (entities) => {
				document.querySelectorAll('[data-entity-id]').forEach(element => {
					const entityId = element.dataset.entityId
					const entity = entities[entityId]
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
	await axios.post(generateUrl(`/apps/integration_homeassistant/turn_${e.target.checked ? 'on' : 'off'}`), { entity_id: e.target.dataset.entityId })
}, false)
