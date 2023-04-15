<?php

namespace OCA\hassintegration\Controller;

use OC\User\NoUserException;
use OCA\hassintegration\Service\GifService;
use OCP\AppFramework\Http;
use OCP\AppFramework\Http\DataDownloadResponse;
use OCP\AppFramework\Services\IInitialState;
use OCP\Files\InvalidPathException;
use OCP\Files\NotFoundException;
use OCP\Files\NotPermittedException;
use OCP\Lock\LockedException;
use OCP\AppFramework\Controller;
use OCP\AppFramework\Http\DataResponse;
use OCP\IRequest;

class HassController extends Controller
{
	/**
	 * @var string|null
	 */
	private $userId;

	public function __construct(string        $appName,
								IRequest      $request,
								IInitialState $initialStateService,
								?string       $userId)
	{
		parent::__construct($appName, $request);
		$this->initialStateService = $initialStateService;
		$this->userId = $userId;
	}

	/**
	 * @NoAdminRequired
	 * @NoCSRFRequired
	 *
	 * @param int $fileId
	 * @return DataDownloadResponse|DataResponse
	 * @throws InvalidPathException
	 * @throws NoUserException
	 * @throws NotFoundException
	 * @throws NotPermittedException
	 * @throws LockedException
	 */
	public function getLoveLaceConfig() {

		return new DataResponse(['dokimi' => 'test'], Http::STATUS_OK);
	}
}
