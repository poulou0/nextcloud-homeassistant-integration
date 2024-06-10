<?php

namespace OCA\HassIntegration\Dashboard;

use OCA\HassIntegration\Service\HassIntegrationService;
use OCP\AppFramework\Http\EmptyContentSecurityPolicy;
use OCP\AppFramework\Services\IInitialState;
use OCP\Dashboard\IAPIWidget;
use OCP\IL10N;
use OCA\HassIntegration\AppInfo\Application;
use OCP\IConfig;
use OCP\Util;

class YamlWidget implements IAPIWidget
{
	private $l10n;
	private $hassIntegrationService;
	private IConfig $config;
	private $initialStateService;

	public function __construct(
		IL10N $l10n,
		HassIntegrationService $hassIntegrationService,
		IConfig $config,
		IInitialState $initialStateService
	) {
		$this->l10n = $l10n;
		$this->hassIntegrationService = $hassIntegrationService;
		$this->config = $config;
		$this->initialStateService = $initialStateService;
	}

	public function getId(): string
	{
		return 'hass-yaml-widget';
	}
	public function getTitle(): string
	{
		return $this->l10n->t('YAML widget (beta)');
	}
	public function getOrder(): int
	{
		return 11;
	}
	public function getIconClass(): string
	{
		return 'icon-hasswidget';
	}
	public function getUrl(): ?string
	{
		return null;
	}

	public function load(): void
	{
		$baseURL = $this->config->getAppValue(Application::APP_ID, 'base_url', '');
		$policy = new EmptyContentSecurityPolicy();
		$url = parse_url($baseURL);
		$policy->addAllowedConnectDomain('ws://' . $url['host'] . (isset($url['port']) ? ":$url[port]" : ''));
		$policy->addAllowedConnectDomain('wss://' . $url['host'] . (isset($url['port']) ? ":$url[port]" : ''));
		$manager = \OC::$server->getContentSecurityPolicyManager();
		$manager->addDefaultPolicy($policy);

		Util::addScript(Application::APP_ID, Application::APP_ID . '-yamlWidget');
		Util::addStyle(Application::APP_ID, 'dashboard');

		$this->initialStateService->provideInitialState('dashboard-yaml-widget', $this->getItems()[0]);
	}

	public function getItems(string $userId = null, ?string $since = null, int $limit = 7): array
	{
		return $this->hassIntegrationService->getYamlWidget();
	}
}
