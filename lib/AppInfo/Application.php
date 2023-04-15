<?php
declare(strict_types=1);
// SPDX-FileCopyrightText: Poulou <pouloutidis.d@gmail.com>
// SPDX-License-Identifier: AGPL-3.0-or-later

namespace OCA\HassIntegration\AppInfo;

use OCA\HassIntegration\Dashboard\HassWidget;
use OCP\AppFramework\App;
use OCP\AppFramework\Bootstrap\IRegistrationContext;
use OCP\AppFramework\Bootstrap\IBootContext;
use OCP\AppFramework\Bootstrap\IBootstrap;

class Application extends App implements IBootstrap {
	public const APP_ID = 'hassintegration';

	public function __construct(array $urlParams = []) {
		parent::__construct(self::APP_ID, $urlParams);
	}

	public function register(IRegistrationContext $context): void {
		$context->registerDashboardWidget(HassWidget::class);
	}

	public function boot(IBootContext $context): void {
	}
}
