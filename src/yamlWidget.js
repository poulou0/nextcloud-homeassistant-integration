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
		el.parentElement.style.overflow = 'auto';
		(async () => {
			const auth = createLongLivedTokenAuth(
				loadState('integration_homeassistant', 'dashboard-base-url'),
				loadState('integration_homeassistant', 'dashboard-long-lived-access-token'),
			)
			const connection = await createConnection({ auth })
			const yamlEntities = YAML.parse(loadState('integration_homeassistant', 'dashboard-yaml-widget'))
			if (yamlEntities.type !== 'entities') {
				el.innerHTML = 'YAML is not of "type: entities"'
				return
			}
			subscribeEntities(connection, (entities) => {
				el.innerHTML = ''
				const checkbox = (entityId) => `<label class="switch">
					<input type="checkbox" data-entity-id="${entityId}" ${entities[entityId].state === 'unavailable' ? 'disabled' : ''} ${entities[entityId].state === 'on' ? 'checked' : ''}>
					<span class="slider round"></span>
				</label>`
				Object.values(yamlEntities.entities).forEach(entry => {
					if (!entry.entity.startsWith('light') && !entry.entity.startsWith('switch')) return
					el.innerHTML += '<div style="display:flex;justify-content: space-between; align-items: center; margin-bottom: 5px">'
					+ (entry.name ?? entities[entry.entity].attributes.friendly_name)
					+ checkbox(entry.entity)
					+ '</div>'
				})
			})
		})()
	})
})

document.addEventListener('click', async (e) => {
	if (!e.target.dataset.entityId) return
	await axios.post(generateUrl(`/apps/integration_homeassistant/turn_${e.target.checked ? 'on' : 'off'}`), { entity_id: e.target.dataset.entityId })
}, false)
