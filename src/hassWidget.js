import { loadState } from '@nextcloud/initial-state'

/**
 * Append to the rendering of the widget.
 *
 * @param {Element} el The DOM element of the widget.
 * @return {void}
 */
function renderWidget(el) {
	const paragraph = document.createElement('p')
	paragraph.innerHTML = loadState('hassintegration', 'dashboard-widget-items')
	el.append(paragraph)
}

document.addEventListener('DOMContentLoaded', () => {
	OCA.Dashboard.register('hass-widget', (el, { widget }) => {
		renderWidget(el)
	})
})
