<?php

namespace OCA\HassIntegration\Service;

use OCA\HassIntegration\AppInfo\Application;
use OCP\Http\Client\IClientService;
use OCP\IConfig;


class HassIntegrationService
{
	private IConfig $config;
	private IClientService $clientService;

	public function __construct(IConfig $config, IClientService $clientService)
	{
		$this->config = $config;
		$this->clientService = $clientService;
	}

	public function post(string $path, array $payload)
	{
		$baseURL = $this->config->getAppValue(Application::APP_ID, 'base_url', '');
		if (substr($baseURL, -1) == '/') {
			$baseURL = substr($baseURL, 0, -1);
		}
		$longLivedAccessToken = $this->config->getAppValue(Application::APP_ID, 'long_lived_access_token', '');
		$longLivedAccessToken = trim($longLivedAccessToken);

		if (!$baseURL || !$longLivedAccessToken)
			return [];

		$client = $this->clientService->newClient();
		$response = $client->post($baseURL . '/api' . $path, [
			'headers' => [
				'Authorization' => 'Bearer ' . $longLivedAccessToken,
				'Content-Type' => 'application/json',
			],
			'body' => json_encode($payload),
		]);
		return [$response->getBody()];
	}

	public function getYamlWidget(): array
	{
		return [$this->config->getAppValue(Application::APP_ID, 'yaml_widget', '')];
	}
}
