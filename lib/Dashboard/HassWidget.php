<?php

namespace OCA\HassIntegration\Dashboard;

use OCA\HassIntegration\Service\GifService;
use OCP\AppFramework\Services\IInitialState;
use OCP\Dashboard\IAPIWidget;
use OCP\IL10N;

use OCA\HassIntegration\AppInfo\Application;
use OCP\Util;

class HassWidget implements IAPIWidget {
	private $l10n;
	private $gifService;
	private $initialStateService;
	private $userId;

	public function __construct(IL10N $l10n,
								GifService $gifService,
								IInitialState $initialStateService,
								?string $userId) {
		$this->l10n = $l10n;
		$this->gifService = $gifService;
		$this->initialStateService = $initialStateService;
		$this->userId = $userId;
	}

	public function getId(): string {
		return 'hass-widget';
	}

	public function getTitle(): string {
		return $this->l10n->t('Home assistant');
	}

	public function getOrder(): int {
		return 10;
	}

	public function getIconClass(): string {
		return 'icon-hasswidget';
	}

	public function getUrl(): ?string {
		return null;
	}

	public function load(): void {
		if ($this->userId !== null) {
			$items = $this->getItems($this->userId);
			$this->initialStateService->provideInitialState('dashboard-widget-items', $items);
		}

		Util::addScript(Application::APP_ID, Application::APP_ID . '-hassWidget');
		Util::addStyle(Application::APP_ID, 'dashboard');
	}

	public function getItems(string $userId, ?string $since = null, int $limit = 7): array {
		return $this->gifService->getWidgetItems($userId);
	}
}
