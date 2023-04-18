<?php
/** @var $l \OCP\IL10N */
/** @var $_ array */

use OCA\HassIntegration\AppInfo\Application;

script(Application::APP_ID, 'admin-settings');
style(Application::APP_ID, 'admin-settings');
?>

<div id="integration_homeassistant" class="section">
	<h2><?php p($l->t('Home assistant integration')); ?></h2>

	<div><?php p($l->t('Base url')); ?></div>
	<input id="base_url" value="<?php p($_['base_url']) ?>" placeholder="https://..., http://..."/>

	<div>
		<?php p($l->t('Long-lived access token')); ?>
		<a target="_blank" rel="noreferrer" href="https://developers.home-assistant.io/docs/auth_api/#long-lived-access-token">
			<svg class="icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="m15.07 11.25l-.9.92C13.45 12.89 13 13.5 13 15h-2v-.5c0-1.11.45-2.11 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41a2 2 0 0 0-2-2a2 2 0 0 0-2 2H8a4 4 0 0 1 4-4a4 4 0 0 1 4 4a3.2 3.2 0 0 1-.93 2.25M13 19h-2v-2h2M12 2A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10c0-5.53-4.5-10-10-10Z"/></svg>
		</a>
	</div>
	<textarea id="long_lived_access_token"><?php p($_['long_lived_access_token']) ?></textarea>

	<div><?php p($l->t('Widget refresh interval (in seconds)')); ?></div>
	<input id="hass_template_refresh_interval" value="<?php p($_['hass_template_refresh_interval']) ?>" placeholder="0" type="number" min="0" step="1" />

	<div><?php p($l->t('Template dashboard widget')); ?></div>
	<textarea id="hass_template"><?php p($_['hass_template']) ?></textarea>
	<p>Templates are rendered using the Jinja2 template engine with some Home Assistant specific extensions.</p>
	<ul>
		<li><a target="_blank" rel="noreferrer" href="https://jinja.palletsprojects.com/en/latest/templates/">Jinja2 template documentation</a></li>
		<li><a target="_blank" rel="noreferrer" href="https://www.home-assistant.io/docs/configuration/templating/"> Home Assistant template extensions</a></li>
	</ul>
</div>
