<?php
namespace OCA\HassIntegration\Sections;

use OCA\HassIntegration\AppInfo\Application;
use OCP\IL10N;
use OCP\IURLGenerator;
use OCP\Settings\IIconSection;

class HAssAdmin implements IIconSection {
	public const SETTINGS_SECTION = 'integration_homeassistant';
	private IL10N $l;
	private IURLGenerator $urlGenerator;

	public function __construct(IL10N $l, IURLGenerator $urlGenerator) {
		$this->l = $l;
		$this->urlGenerator = $urlGenerator;
	}

	public function getIcon(): string {
		return $this->urlGenerator->imagePath(Application::APP_ID, 'logo-dark.svg');
	}

	public function getID(): string { return self::SETTINGS_SECTION; }

	public function getName(): string { return $this->l->t('Home assistant integration'); }

	public function getPriority(): int { return 98; }
}
