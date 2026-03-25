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
            await fetch(BACKEND_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
        } catch (err) {
            console.error('Pulse Telemetry Error:', err);
        }
    };

    // Track page views
    trackEvent('Page View', { title: document.title });

    // Track clicks
    document.addEventListener('click', (e) => {
        const target = e.target;
        const clickData = {
            tag: target.tagName,
            id: target.id || null,
            class: target.className || null,
            text: target.innerText?.substring(0, 50) || null,
            x: e.clientX,
            y: e.clientY
        };
        trackEvent(`Clicked ${target.tagName}`, clickData);
    });

    // Track back button / navigation
    window.addEventListener('popstate', () => {
        trackEvent('Navigation: Back/Forward', { url: window.location.href });
    });

    // Pulse specific: Capture 'Connections' or 'Persona' context if available
    window.addEventListener('load', () => {
        // Example: logic to detect Synapse-specific elements if they exist
        const connectionsEl = document.querySelector('.connections-count');
        if (connectionsEl) {
            trackEvent('Context Update', { connections: connectionsEl.innerText });
        }
    });

    console.log('Pulse AI Telemetry initialized. Session:', sessionId);
})();
