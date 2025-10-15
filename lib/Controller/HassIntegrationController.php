<?php

namespace OCA\HassIntegration\Controller;

use OCA\HassIntegration\Service\HassIntegrationService;
use OCA\HassIntegration\AppInfo\Application;
use OCP\AppFramework\Controller;
use OCP\AppFramework\Http\DataResponse;
use OCP\IRequest;
use OCP\IConfig;

class HassIntegrationController extends Controller
{
	private IConfig $config;
	private $hassIntegrationService;

	public function __construct(IConfig $config, string $appName, IRequest $request, HassIntegrationService $hassIntegrationService)
	{
		parent::__construct($appName, $request);
		$this->config = $config;
		$this->hassIntegrationService = $hassIntegrationService;
	}

	/**
	 * @NoAdminRequired
	 * @NoCSRFRequired
	 *
	 * @return DataResponse
	 */
	public function templatePost()
	{
		$template = $this->config->getAppValue(Application::APP_ID, 'template_widget', '');
		return new DataResponse($this->hassIntegrationService->post('/template', [
			"template" => $template
		]));
	}

	/**
	 * @NoAdminRequired
	 * @NoCSRFRequired
	 *
	 * @return DataResponse
	 */
	public function turnOnPost()
	{
		$entityId = $this->request->getParam("entity_id");
		$pathPart = str_contains($entityId, 'switch') ? 'switch' : 'light';
		return new DataResponse($this->hassIntegrationService->post("/services/{$pathPart}/turn_on", [
			"entity_id" => $entityId
		]));
	}

	/**
	 * @NoAdminRequired
	 * @NoCSRFRequired
	 *
	 * @return DataResponse
	 */
	public function turnOffPost()
	{
		$entityId = $this->request->getParam("entity_id");
		$pathPart = str_contains($entityId, 'switch') ? 'switch' : 'light';
		return new DataResponse($this->hassIntegrationService->post("/services/{$pathPart}/turn_off", [
			"entity_id" => $entityId
		]));
	}

	/**
	 * @NoAdminRequired
	 * @NoCSRFRequired
	 *
	 * @return DataResponse
	 */
	public function runScriptPost()
	{
		$entityId = $this->request->getParam("entity_id");
		$scriptName = str_replace("script.", "", $entityId);
		return new DataResponse($this->hassIntegrationService->post("/services/script/{$scriptName}", []));
	}
}
