document.addEventListener("DOMContentLoaded", function () {
	document.querySelector("#hassintegration button").addEventListener("click", function () {
		saveSetting('base_url');
		saveSetting('long_lived_access_token');
	});
});

function saveSetting(settingName) {
	const settingValue = document.querySelector(`#${settingName}`).value;
	OC.msg.startSaving(`#${settingName}_msg`);
	OCP.AppConfig.setValue('hassintegration', settingName, settingValue, {
		success: function () {
			OC.msg.finishedSuccess(`#${settingName}_msg`, t('hassintegration', 'Saved'));
		},
		error: function () {
			OC.msg.finishedError(`#${settingName}_msg`, t('hassintegration', 'Error'));
		},
	});
}
