<?php

namespace OCA\HassIntegration\Controller;

use OCA\HassIntegration\Service\HassIntegrationService;
use OCP\AppFramework\Http;
use OCP\AppFramework\Controller;
use OCP\AppFramework\Http\DataResponse;
use OCP\IRequest;

class TemplateWidgetController extends Controller
{
	/**
	 * @var string|null
	 */
	private $userId;
	private $hassIntegrationService;

	public function __construct(string $appName, IRequest $request, HassIntegrationService $hassIntegrationService) {
		parent::__construct($appName, $request);
		$this->hassIntegrationService = $hassIntegrationService;
	}

	/**
	 * @NoAdminRequired
	 * @NoCSRFRequired
	 *
	 * @param int $fileId
	 * @return DataResponse
	 */
	public function get() {
		return new DataResponse($this->hassIntegrationService->getWidgetItems(), Http::STATUS_OK);
	}
}
