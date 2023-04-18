import { loadState } from '@nextcloud/initial-state'
import axios from '@nextcloud/axios'
import { generateUrl } from '@nextcloud/router'

document.addEventListener('DOMContentLoaded', () => {
	OCA.Dashboard.register('hass-widget', (el, { widget }) => {
		el.innerHTML = loadState('integration_homeassistant', 'dashboard-template-widget')
		el.parentElement.style.overflow = 'auto'
		const refreshInterval = parseInt(loadState('integration_homeassistant', 'dashboard-template-widget-refresh-interval'))
		if (refreshInterval > 0) {
			setInterval(async () => {
				el.innerHTML = (await axios.get(generateUrl('/apps/integration_homeassistant/template-widget'))).data[0]
			}, refreshInterval * 1000)
		}
	})
})
