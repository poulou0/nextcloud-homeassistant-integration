<?php

namespace OCA\HassIntegration\Dashboard;

use OCA\HassIntegration\Service\HassIntegrationService;
use OCP\AppFramework\Services\IInitialState;
use OCP\Dashboard\IAPIWidget;
use OCP\IL10N;
use OCA\HassIntegration\AppInfo\Application;
use OCP\IConfig;
use OCP\Util;

class TemplateWidget implements IAPIWidget {
	private $l10n;
	private $hassIntegrationService;
	private IConfig $config;
	private $initialStateService;

	public function __construct(
		IL10N $l10n,
		HassIntegrationService $hassIntegrationService,
		IConfig $config,
		IInitialState $initialStateService,
	) {
		$this->l10n = $l10n;
		$this->hassIntegrationService = $hassIntegrationService;
		$this->config = $config;
		$this->initialStateService = $initialStateService;
	}

	public function getId(): string { return 'hass-widget'; }
	public function getTitle(): string { return $this->l10n->t('Home assistant'); }
	public function getOrder(): int { return 10; }
	public function getIconClass(): string { return 'icon-hasswidget'; }
	public function getUrl(): ?string { return null; }

	public function load(): void
	{
		$items = $this->getItems();
		$this->initialStateService->provideInitialState('dashboard-template-widget', $items);
		$interval = (int) $this->config->getAppValue(Application::APP_ID, 'template_widget_refresh_interval', 30);
		$this->initialStateService->provideInitialState('dashboard-template-widget-refresh-interval', $interval);

		Util::addScript(Application::APP_ID, Application::APP_ID . '-templateWidget');
		Util::addStyle(Application::APP_ID, 'dashboard');
	}

	public function getItems(string $userId = null, ?string $since = null, int $limit = 7): array {
		return $this->hassIntegrationService->getWidgetItems();
	}
}
