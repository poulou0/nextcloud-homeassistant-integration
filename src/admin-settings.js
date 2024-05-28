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
	document.querySelector('#template_widget').addEventListener('change', inputHandler)
	document.querySelector('#template_widget_refresh_interval').addEventListener('change', inputHandler)
	document.querySelector('#yaml_widget').addEventListener('change', inputHandler)
	const tablinks = document.getElementsByClassName('tablinks')
	const openTab = function(evt, tabName) {
		let i
		const tabcontent = document.getElementsByClassName('tabcontent')
		for (i = 0; i < tabcontent.length; i++) {
			tabcontent[i].style.display = 'none'
		}
		for (i = 0; i < tablinks.length; i++) {
			tablinks[i].className = tablinks[i].className.replace(' active', '')
		}
		document.getElementById(tabName).style.display = 'block'
		evt.currentTarget.className += ' active'
	}
	for (let i = 0; i < tablinks.length; i++) {
		tablinks[i].addEventListener('click', function(e) { openTab(e, tablinks[i].dataset.target) }, false)
	}
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
