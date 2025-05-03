import { showSuccess, showError } from '@nextcloud/dialogs'
import { generateOcsUrl } from '@nextcloud/router'
import axios from '@nextcloud/axios'
import { confirmPassword } from '@nextcloud/password-confirmation'
import '@nextcloud/dialogs/style.css'
import '@nextcloud/password-confirmation/style.css'

document.addEventListener('DOMContentLoaded', function() {
	const inputHandler = function(evt) { saveSetting(this.id, this.value) }
	document.querySelector('#base_url').addEventListener('change', inputHandler)
	document.querySelector('#long_lived_access_token').addEventListener('change', inputHandler)
	document.querySelector('#template_widget_title').addEventListener('change', inputHandler)
	document.querySelector('#template_widget').addEventListener('change', inputHandler)
	document.querySelector('#template_widget_refresh_interval').addEventListener('change', inputHandler)
	document.querySelector('#yaml_widget_title').addEventListener('change', inputHandler)
	document.querySelector('#yaml_widget').addEventListener('change', inputHandler)

	setupTabs()
})

/**
 * Save a setting by name.
 *
 * @param {string} key The name/id of the field.
 * @param {string} value The value to be set.
 * @return {void}
 */
const saveSetting = async (key, value) => {
	try {
		await confirmPassword()
		const url = generateOcsUrl(`/apps/provisioning_api/api/v1/config/apps/integration_homeassistant/${key}`)
		await axios.post(url, new URLSearchParams({ value }).toString())
		showSuccess(`Saved '${key}'!`)
	} catch (er) {
		showError(`Error while saving '${key}'`)
	}
}

/**
 * Setup the admin panel tabs.
 *
 * @return {void}
 */
const setupTabs = () => {
	const tablinks = document.querySelectorAll('.tablinks')
	// eslint-disable-next-line no-console
	console.log(tablinks)
	const tabcontent = document.querySelectorAll('.tabcontent')
	const openTab = (evt, tabId) => {
		tablinks.forEach((link) => link.classList.remove('active'))
		tabcontent.forEach((content) => { content.style.display = 'none' })
		document.querySelector(`#${tabId}`).style.display = 'block'
		evt.currentTarget.classList.add('active')
	}
	for (let i = 0; i < tablinks.length; i++) {
		tablinks[i].addEventListener('click', function(e) { openTab(e, tablinks[i].dataset.target) }, false)
	}
}
