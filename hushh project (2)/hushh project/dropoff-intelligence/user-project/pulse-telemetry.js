/**
 * Pulse AI Telemetry Script
 * Embed this in any site to track user actions in real-time.
 */
(function() {
    const BACKEND_URL = 'http://localhost:8000/api/v1/events';
    
    // Generate or retrieve session ID
    let sessionId = localStorage.getItem('pulse_session_id');
    if (!sessionId) {
        sessionId = 'sess_' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem('pulse_session_id', sessionId);
    }

    const trackEvent = async (stepName, metadata = {}) => {
        const payload = {
            session_id: sessionId,
            step_name: stepName,
            device_type: /Mobi|Android/i.test(navigator.userAgent) ? 'Mobile' : 'Desktop',
            event_metadata: {
                url: window.location.href,
                timestamp: new Date().toISOString(),
                ...metadata
            }
        };

        try {
            const resp = await fetch(BACKEND_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            if (resp.ok) console.log('Pulse: Sync Success', stepName);
        } catch (err) {
            console.error('Pulse: Sync Error', err);
        }
    };

    // Track initial page view
    trackEvent('Page View: ' + (document.title || 'Home'));

    // Track clicks on buttons and links
    document.addEventListener('click', (e) => {
        const target = e.target.closest('button, a, .nav-links a, .btn-primary, .btn-outline');
        if (target) {
            const clickData = {
                tag: target.tagName,
                id: target.id || null,
                class: target.className || null,
                text: target.innerText?.trim().substring(0, 50) || null,
                x: e.clientX,
                y: e.clientY
            };
            trackEvent(`Action: ${clickData.text || clickData.tag}`, clickData);
        }
    });

    // Track navigation fatigue (Back button)
    window.addEventListener('popstate', () => {
        trackEvent('Navigation: Back Triggered', { url: window.location.href });
    });

    // Monitor URL changes (for SPA-like behavior in main.html)
    let lastUrl = location.href;
    new MutationObserver(() => {
        if (location.href !== lastUrl) {
            lastUrl = location.href;
            trackEvent('Page Change: ' + lastUrl);
        }
    }).observe(document, {subtree: true, childList: true});

    console.log('Pulse AI Telemetry initialized. Session:', sessionId);
})();
