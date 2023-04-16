<?php
/** @var $l \OCP\IL10N */
/** @var $_ array */

script('hassintegration', 'admin-settings');
style('hassintegration', 'admin-settings');
?>

<div id="hassintegration" class="section">
	<h2><?php p($l->t('Home assistant integration')); ?></h2>

	<div><?php p($l->t('Base url')); ?></div>
	<input id="base_url" value="<?php p($_['base_url']) ?>" placeholder="https://..., http://..."/>

	<div><?php p($l->t('Long-lived access token')); ?></div>
	<textarea id="long_lived_access_token"><?php p($_['long_lived_access_token']) ?></textarea>

	<div><?php p($l->t('Template dashboard widget')); ?></div>
	<textarea id="hass_template"><?php p($_['hass_template']) ?></textarea>
	<p>Templates are rendered using the Jinja2 template engine with some Home Assistant specific extensions.</p>
	<ul>
		<li><a href="https://jinja.palletsprojects.com/en/latest/templates/" target="_blank" rel="noreferrer">Jinja2 template documentation</a></li>
		<li><a target="_blank" rel="noreferrer" href="https://www.home-assistant.io/docs/configuration/templating/"> Home Assistant template extensions</a></li>
	</ul>
</div>
