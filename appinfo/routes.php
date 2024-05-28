<?php
declare(strict_types=1);
// SPDX-FileCopyrightText: Poulou <poulou.0@gmail.com>
// SPDX-License-Identifier: AGPL-3.0-or-later

/**
 * Create your routes in here. The name is the lowercase name of the controller
 * without the controller part, the stuff after the hash is the method.
 * e.g. page#index -> OCA\HassIntegration\Controller\PageController->index()
 *
 * The controller class has to be registered in the application.php file since
 * it's instantiated in there
 */
return [
	'routes' => [
		['name' => 'hassIntegration#templatePost', 'url' => '/template', 'verb' => 'POST'],
		['name' => 'hassIntegration#turnOnPost',   'url' => '/turn_on',  'verb' => 'POST'],
		['name' => 'hassIntegration#turnOffPost',  'url' => '/turn_off', 'verb' => 'POST'],
	],
];
