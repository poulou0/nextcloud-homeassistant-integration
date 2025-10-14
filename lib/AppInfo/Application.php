<?php
declare(strict_types=1);
// SPDX-FileCopyrightText: Poulou <poulou.0@gmail.com>
// SPDX-License-Identifier: AGPL-3.0-or-later

namespace OCA\HassIntegration\AppInfo;

use OCA\HassIntegration\Listener\AddContentSecurityPolicyListener;
use OCA\HassIntegration\Dashboard\TemplateWidget;
use OCA\HassIntegration\Dashboard\YamlWidget;
use OCP\AppFramework\App;
use OCP\AppFramework\Bootstrap\IRegistrationContext;
use OCP\AppFramework\Bootstrap\IBootContext;
use OCP\AppFramework\Bootstrap\IBootstrap;
use OCP\Security\CSP\AddContentSecurityPolicyEvent;

class Application extends App implements IBootstrap
{
	public const APP_ID = 'integration_homeassistant';

	public function __construct(array $urlParams = [])
	{
		parent::__construct(self::APP_ID, $urlParams);
	}

	public function register(IRegistrationContext $context): void
	{
		$context->registerDashboardWidget(TemplateWidget::class);
		$context->registerDashboardWidget(YamlWidget::class);

		$context->registerEventListener(AddContentSecurityPolicyEvent::class, AddContentSecurityPolicyListener::class);
	}

	public function boot(IBootContext $context): void
	{
	}
}
