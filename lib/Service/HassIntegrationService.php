<?php

namespace OCA\HassIntegration\Service;

use OCA\HassIntegration\AppInfo\Application;
use OCP\Dashboard\Model\WidgetItem;
use OCP\Http\Client\IClientService;
use OCP\IConfig;


class HassIntegrationService {
	private IConfig $config;
	private IClientService $clientService;

	public function __construct(IConfig $config, IClientService $clientService) {
		$this->config = $config;
		$this->clientService = $clientService;
	}

	public function getWidgetItems(string $userId): array {
		$baseURL = $this->config->getAppValue(Application::APP_ID, 'base_url', '');
		if(substr($baseURL, -1) == '/') {
			$baseURL = substr($baseURL, 0, -1);
		}
		$longLivedAccessToken = $this->config->getAppValue(Application::APP_ID, 'long_lived_access_token', '');
		$template = $this->config->getAppValue(Application::APP_ID, 'hass_template', '');

		$client = $this->clientService->newClient();
		$response = $client->post($baseURL . '/api/template', [
			'headers' => [
				'Authorization' => 'Bearer ' . $longLivedAccessToken,
				'Content-Type' => 'application/json',
			],
			'body' => json_encode(["template" => $template]),
		]);
		return [$response->getBody()];
	}
}
