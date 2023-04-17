import { showSuccess, showError } from '@nextcloud/dialogs'
import '@nextcloud/dialogs/dist/index.css'

document.addEventListener('DOMContentLoaded', function() {
	const inputHandler = function(evt) { saveSetting(this.id) }
	document.querySelector('#base_url').addEventListener('change', inputHandler)
	document.querySelector('#long_lived_access_token').addEventListener('change', inputHandler)
	document.querySelector('#hass_template').addEventListener('change', inputHandler)
	document.querySelector('#hass_template_refresh_interval').addEventListener('change', inputHandler)
})

/**
 * Save a setting by name.
 *
 * @param {string} settingName The name/id of the field.
 * @return {void}
 */
function saveSetting(settingName) {
	const settingValue = document.querySelector(`#${settingName}`).value
	OCP.AppConfig.setValue('integration_homeassistant', settingName, settingValue, {
		success() {
			showSuccess(`Saved '${settingName.replaceAll('_', ' ').replaceAll('hass ', '')}'!`)
		},
		error() {
			showError(`Error while saving '${settingName}'`)
		},
	})
}
