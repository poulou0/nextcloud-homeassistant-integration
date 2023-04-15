<?php
namespace OCA\HassIntegration\Settings;

use OCA\HassIntegration\AppInfo\Application;
use OCA\HassIntegration\Sections\HAssAdmin;
use OCP\AppFramework\Http\TemplateResponse;
use OCP\IConfig;
use OCP\IL10N;
use OCP\Settings\ISettings;

class AdminSettings implements ISettings {
	private IL10N $l;
	private IConfig $config;

	public function __construct(IConfig $config, IL10N $l) {
		$this->config = $config;
		$this->l = $l;
	}

	/**
	 * @return TemplateResponse
	 */
	public function getForm() {
		return new TemplateResponse(Application::APP_ID, 'admin-settings', [
			'base_url' => $this->config->getAppValue(Application::APP_ID, 'base_url', ''),
			'long_lived_access_token' => $this->config->getAppValue(Application::APP_ID, 'long_lived_access_token', ''),
		], '');
	}

	public function getSection() {
		return HAssAdmin::SETTINGS_SECTION; // Name of the previously created section.
	}

	/**
	 * @return int whether the form should be rather on the top or bottom of
	 * the admin section. The forms are arranged in ascending order of the
	 * priority values. It is required to return a value between 0 and 100.
	 *
	 * E.g.: 70
	 */
	public function getPriority() {
		return 70;
	}
}
