import { loadState } from '@nextcloud/initial-state'
import axios from '@nextcloud/axios'
import { generateUrl } from '@nextcloud/router'

document.addEventListener('DOMContentLoaded', () => {
	OCA.Dashboard.register('hass-template-widget', (el, { widget }) => {
		el.innerHTML = nl2br(loadState('integration_homeassistant', 'dashboard-template-widget'))
		if (!el.innerHTML) el.innerHTML = emptyMsg()
		el.parentElement.style.overflow = 'auto'
		const refreshInterval = parseInt(loadState('integration_homeassistant', 'dashboard-template-widget-refresh-interval'))
		if (refreshInterval > 0) {
			setInterval(async () => {
				el.innerHTML = nl2br((await axios.post(generateUrl('/apps/integration_homeassistant/template'))).data[0])
				if (!el.innerHTML) el.innerHTML = emptyMsg()
			}, refreshInterval * 1000)
		}
	})
})

/**
 * Replace line breaks with <br>
 * @param {string} s The variable to convert
 */
function nl2br(s) {
	return s.toString().replace(/(?:\r\n|\r|\n)/g, '<br>')
}

/**
 * Prints guide
 */
function emptyMsg() { return 'Nothing to show :))<br><br>Go to "Administrator settings" > "Home assistant integration" to get started.' }
