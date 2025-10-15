<?php
/** @var $l \OCP\IL10N */
/** @var $_ array */

use OCA\HassIntegration\AppInfo\Application;

script(Application::APP_ID, 'admin-settings');
style(Application::APP_ID, 'admin-settings');
?>

<div id="integration_homeassistant" class="section">
	<h2><?php p($l->t('Home assistant integration')); ?></h2>
	<div><a href="https://apps.nextcloud.com/apps/integration_homeassistant" target="_blank"
			rel="noreferrer">Documentation and tutorials</a>
	</div>
	<div class="section">
		<div><?php p($l->t('Base url')); ?></div>
		<input id="base_url" value="<?php p($_['base_url']) ?>" placeholder="https://..., http://..." />
		<div>
			<?php p($l->t('Long-lived access token')); ?>
			<a target="_blank" rel="noreferrer"
				href="https://developers.home-assistant.io/docs/auth_api/#long-lived-access-token">
				<svg class="icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
					<path fill="currentColor"
						d="m15.07 11.25l-.9.92C13.45 12.89 13 13.5 13 15h-2v-.5c0-1.11.45-2.11 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41a2 2 0 0 0-2-2a2 2 0 0 0-2 2H8a4 4 0 0 1 4-4a4 4 0 0 1 4 4a3.2 3.2 0 0 1-.93 2.25M13 19h-2v-2h2M12 2A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10c0-5.53-4.5-10-10-10Z" />
				</svg>
			</a>
		</div>
		<textarea id="long_lived_access_token"><?php p($_['long_lived_access_token']) ?></textarea>
	</div>
	<div class="section widget-section">
		<div class="tab">
			<button class="tablinks active"
				data-target="jinja2_widget_tab"><?php p($l->t('Template widget')); ?></button>
			<button class="tablinks" data-target="yaml_widget_tab"><?php p($l->t('YAML widget (beta)')); ?></button>
		</div>
		<div id="jinja2_widget_tab" class="tabcontent">
			<label for="template_widget_title"><?php p($l->t('Template widget title')); ?>:</label>
			<input id="template_widget_title" value="<?php p($_['template_widget_title']) ?>"
				placeholder="Template widget" />
			<label
				for="template_widget_refresh_interval"><?php p($l->t('Template widget refresh interval (in seconds)')); ?>:</label>
			<input id="template_widget_refresh_interval" value="<?php p($_['template_widget_refresh_interval']) ?>"
				placeholder="0" type="number" min="0" step="1" />
			<label for="template_widget">Template widget body:</label>
			<textarea id="template_widget" placeholder="Add your Jinja2 template here.."
				spellcheck="false"><?php p($_['template_widget']) ?></textarea>
			<p>Templates are rendered using the Jinja2 template engine with some Home Assistant specific extensions.</p>
			<ul>
				<li><a target="_blank" rel="noreferrer"
						href="https://jinja.palletsprojects.com/en/latest/templates/">Jinja2 template documentation</a>
				</li>
				<li>Home Assistant <a target="_blank" rel="noreferrer"
						href="https://www.home-assistant.io/docs/configuration/templating/">Templating</a></li>
				<li>More documentation and tutorials on the <a
						href="https://apps.nextcloud.com/apps/integration_homeassistant" target="_blank"
						rel="noreferrer">app's page</a></li>
			</ul>
		</div>
		<div id="yaml_widget_tab" class="tabcontent">
			<label for="yaml_widget_title"><?php p($l->t('YAML widget title')); ?>:</label>
			<input id="yaml_widget_title" value="<?php p($_['yaml_widget_title']) ?>"
				placeholder="YAML widget (beta)" />
			<div>
				<label class="inline"
					for="yaml_widget_websockets_enabled"><?php p($l->t('YAML widget WebSockets enabled')); ?>:</label>
				<input type="checkbox" id="yaml_widget_websockets_enabled" <?php p($_['yaml_widget_websockets_enabled'] === "true" ? "checked" : "") ?> />
			</div>
			<label for="template_widget">Template widget body:</label>
			<textarea id="yaml_widget" placeholder="Add your entites widget YAML here.."
				spellcheck="false"><?php p($_['yaml_widget']) ?></textarea>
			<ul>
				<li>Home Assistant <a target="_blank" rel="noreferrer"
						href="https://www.home-assistant.io/dashboards/entities/">Entities card</a> very basic card
					layout for now
					<ol>
						<li>Entities like "light", "switch" and "media" tested and should work</li>
						<li>Every entity row has to have the key "entity" explicitly set</li>
						<li>Only the "entities" variable is read for now ("title", "header", "footer" etc have no
							impact)</li>
						<li>From <a target="_blank" rel="noreferrer"
								href="https://www.home-assistant.io/dashboards/entities/#other-special-rows">special
								rows</a> only "divider", "section" and "weblink" work for now</li>
						<li>More documentation and tutorials on the <a
								href="https://apps.nextcloud.com/apps/integration_homeassistant" target="_blank"
								rel="noreferrer">app's page</a></li>
					</ol>
				</li>
			</ul>
		</div>
	</div>
</div>