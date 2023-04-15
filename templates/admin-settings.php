<?php
/** @var $l \OCP\IL10N */
/** @var $_ array */

script('hassintegration', 'admin-settings');
style('hassintegration', 'admin-settings');
?>

<div id="hassintegration" class="section">
	<h2><?php p($l->t('Home assistant integration')); ?></h2>
	<div>
		<div class="inlineblock"><?php p($l->t('Base url')); ?></div>
		<div id="base_url_msg" class="msg inlineblock"></div>
	</div>
	<input id="base_url" value="<?php p($_['base_url']) ?>" placeholder="https://..., http://..."/>

	<div>
		<div class="inlineblock"><?php p($l->t('Long-lived access token')); ?></div>
		<div id="long_lived_access_token_msg" class="msg inlineblock"></div>
	</div>
	<textarea id="long_lived_access_token"><?php p($_['long_lived_access_token']) ?></textarea>
	<p>
		<button class="primary"><?php p($l->t('Save')); ?></button>
	</p>
</div>
