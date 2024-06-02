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
				return
			}

			const auth = createLongLivedTokenAuth(
				loadState('integration_homeassistant', 'dashboard-base-url'),
				loadState('integration_homeassistant', 'dashboard-long-lived-access-token'),
			)
			createConnection({ auth })
				.then((connection) => subscribeEntities(connection, (entities) => {
					el.innerHTML = ''
					const checkboxHTML = (entityId) => {
						const isUnavailable = entities[entityId].state === 'unavailable'
						const isOn = entities[entityId].state === 'on'
						return `<div><label class="switch" for="${entityId}">
						<input type="checkbox" id="${entityId}" data-entity-id="${entityId}" ${isUnavailable ? 'disabled' : ''} ${isOn ? 'checked' : ''}>
						<span class="slider round"></span>
					</label></div>`
					}
					const sensorHTML = (entityId) => {
						return '<div><p>' + entities[entityId].state + ' ' + (entities[entityId].attributes.unit_of_measurement ?? '') + '</p></div>'
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
							return
						} else if (!entry.entity) { return }

						const isLightOrSensor = entry.entity.startsWith('light') || entry.entity.startsWith('switch')
						const name = entry.name ?? entities[entry.entity].attributes.friendly_name
						el.innerHTML += `<div class="entity-line entity">
						<div><p title="${name}">${name}</p></div>
						${isLightOrSensor ? checkboxHTML(entry.entity) : sensorHTML(entry.entity)}
					</div>`
					})
				}))
		} catch (e) {
			el.innerHTML = JSON.stringify(e)
		 }
	})
})

document.addEventListener('click', async (e) => {
	if (!e.target.dataset.entityId) return
	await axios.post(generateUrl(`/apps/integration_homeassistant/turn_${e.target.checked ? 'on' : 'off'}`), { entity_id: e.target.dataset.entityId })
}, false)
