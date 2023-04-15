<?php

namespace OCA\HassIntegration\Service;

use OCP\Dashboard\Model\WidgetItem;

class HassIntegrationService {
	public function getWidgetItems(string $userId): array {
		return array_map(function ($item) {
			return new WidgetItem(
				$item['name'],
				$item['subtitle'],
			);
		}, [
			['name' => 'testname1', 'subtitle' => 'testsubtitle1'],
			['name' => 'testname2', 'subtitle' => 'testsubtitle2'],
		]);
	}
}
