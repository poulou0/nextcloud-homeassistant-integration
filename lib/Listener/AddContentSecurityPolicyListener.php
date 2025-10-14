<?php

namespace OCA\HassIntegration\Listener;

use OCA\HassIntegration\AppInfo\Application;
use OCP\AppFramework\Http\ContentSecurityPolicy;
use OCP\EventDispatcher\Event;
use OCP\EventDispatcher\IEventListener;
use OCP\Security\CSP\AddContentSecurityPolicyEvent;
use OCP\IConfig;

class AddContentSecurityPolicyListener implements IEventListener
{

    /** @var IConfig */
    private IConfig $config;

    /**
     * @param IConfig $config
     */
    public function __construct(IConfig $config)
    {
        $this->config = $config;
    }

    /**
     * Add domains for websocket connections based on the base_url setting.
     *
     * @param Event $event
     */
    public function handle(Event $event): void
    {
        if (!($event instanceof AddContentSecurityPolicyEvent)) {
            return;
        }

        $baseURL = $this->config->getAppValue(Application::APP_ID, 'base_url', '');
        $url = parse_url($baseURL);

        if ($url && isset($url['host'])) {
            $hostWithPort = $url['host'] . (isset($url['port']) ? ':' . $url['port'] : '');

            // Create a new policy instance
            $csp = new ContentSecurityPolicy();

            // Add allowed WebSocket domains to the new policy
            $csp->addAllowedFrameDomain('\'self\'');
            $csp->addAllowedFrameAncestorDomain('\'self\'');
            $csp->addAllowedConnectDomain('ws://' . $hostWithPort);
            $csp->addAllowedConnectDomain('wss://' . $hostWithPort);

            // Add the new policy to the event
            $event->addPolicy($csp);
        }
    }
}
