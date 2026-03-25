/**
 * App Logic & Data Generator
 * Simulates real-time telemetry from frontend clients navigating the signup flow.
 */

document.addEventListener("DOMContentLoaded", () => {
    // Initialize Lucide Icons
    lucide.createIcons();

    // -- System Simulation State --
    const state = {
        totalVisitors: 2419,
        dropoffRate: 34.2,
        conversionRate: 65.8,
        funnelSteps: [
            { id: 'landing', label: 'Landing Page', users: 2419, dropoff: 120, timeAvg: 45 },
            { id: 'signup', label: 'Signup Modal', users: 2299, dropoff: 340, timeAvg: 112 },
            { id: 'otp', label: 'OTP Verification', users: 1959, dropoff: 410, timeAvg: 65 },
            { id: 'profile', label: 'Profile Setup', users: 1549, dropoff: 120, timeAvg: 240 },
            { id: 'completion', label: 'Completion', users: 1429, dropoff: 0, timeAvg: 15 }
        ],
        aiInsights: [
            { type: 'critical', text: '410 users dropped at OTP Verification. SMS gateway latency detected in EU region.', action: 'Switch Provider' },
            { type: 'warning', text: 'Profile Setup takes avg 4 mins. "Avatar Upload" is causing 68% of friction.', action: 'Make Optional' },
            { type: 'info', text: 'Mobile conversion on Safari is down 4% compared to Chrome Android.', action: 'Investigate CSS' }
        ],
        deviceStats: [
            { device: 'Desktop', users: 1045, conversion: 72.1 },
            { device: 'Mobile OS', users: 1102, conversion: 58.4 },
            { device: 'Tablet', users: 272, conversion: 61.2 }
        ],
        activeRiskySessions: [
            { id: 'usr_892nf2', step: 'OTP Verification', time: '4m 12s', risk: 92, status: 'Stalled' },
            { id: 'usr_334mk0', step: 'Profile Setup', time: '8m 45s', risk: 85, status: 'Confused' },
            { id: 'usr_109xz3', step: 'Signup Modal', time: '2m 01s', risk: 78, status: 'Idle' },
            { id: 'usr_9bc4df', step: 'OTP Verification', time: '3m 22s', risk: 71, status: 'Stalled' },
            { id: 'usr_7xx1ma', step: 'Profile Setup', time: '1m 15s', risk: 32, status: 'Active' },
            { id: 'usr_2bb9zz', step: 'Signup Modal', time: '0m 45s', risk: 12, status: 'Active' }
        ],
        clusters: [
            { name: 'Drop-Prone', size: 124, avgTime: 240, friction: 88 },
            { name: 'Confused', size: 450, avgTime: 180, friction: 65 },
            { name: 'Fast Users', size: 1845, avgTime: 45, friction: 12 }
        ],
        mlTick: 0,
        otpAlertTriggered: false,
        delayAlertTriggered: false,
        reengagementLogs: [],
        abTest: {
            started_a: 5400,
            converted_a: 1620,
            started_b: 5400,
            converted_b: 2268
        }
    };

    // --- Real-time Alerts (Toast System) ---
    function showToast(title, message, type = 'critical') {
        const container = document.getElementById('toast-container');
        if(!container) return;
        
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        
        const iconName = type === 'critical' ? 'alert-triangle' : 'alert-circle';
        
        toast.innerHTML = `
            <div class="toast-icon">
                <i data-lucide="${iconName}"></i>
            </div>
            <div class="toast-content">
                <div class="toast-title">${title}</div>
                <div class="toast-desc">${message}</div>
            </div>
            <button class="toast-close"><i data-lucide="x" style="width:16px;height:16px;"></i></button>
        `;
        
        container.appendChild(toast);
        lucide.createIcons();
        
        // Setup Close Button
        const closeBtn = toast.querySelector('.toast-close');
        closeBtn.onclick = () => {
            toast.classList.add('toast-hiding');
            setTimeout(() => toast.remove(), 300);
        };
        
        // Auto-dismiss after 6 seconds
        setTimeout(() => {
            if(container.contains(toast)) {
                toast.classList.add('toast-hiding');
                setTimeout(() => {
                    if(container.contains(toast)) toast.remove();
                }, 300);
            }
        }, 6000);
    }

    // --- Render Functions ---

    function renderMetrics() {
        document.getElementById('val-active-users').textContent = state.totalVisitors.toLocaleString();
        document.getElementById('val-dropoff').textContent = state.dropoffRate.toFixed(1) + '%';
        document.getElementById('val-conversion').textContent = state.conversionRate.toFixed(1) + '%';
    }

    function renderFunnel() {
        const container = document.getElementById('funnel-container');
        container.innerHTML = '';
        const maxUsers = state.funnelSteps[0].users;

        state.funnelSteps.forEach((step, index) => {
            const pctVal = (step.users / maxUsers) * 100;
            const dropPct = index > 0 ? ((state.funnelSteps[index-1].users - step.users) / state.funnelSteps[index-1].users * 100).toFixed(1) : 0;
            
            const dropHTML = step.dropoff > 0 ? `<div class="stat-dropoff"><i data-lucide="arrow-down-right" style="width:12px;height:12px;"></i> ${step.dropoff} drop (-${dropPct}%)</div>` : `<div class="stat-dropoff" style="color:var(--accent-emerald);">Optimal</div>`;

            container.innerHTML += `
                <div class="funnel-step">
                    <div class="funnel-label">${step.label}</div>
                    <div class="funnel-bar-container">
                        <div class="funnel-bar" style="width: ${pctVal}%"></div>
                    </div>
                    <div class="funnel-stats">
                        <div class="stat-val">${step.users.toLocaleString()} usrs</div>
                        ${dropHTML}
                    </div>
                </div>
            `;
        });
        // Re-init newly injected icons
        lucide.createIcons();
    }

    function renderClusters() {
        const container = document.getElementById('cluster-container');
        if(!container) return;
        container.innerHTML = '';
        state.clusters.forEach(cluster => {
            const badgeClass = cluster.name === 'Drop-Prone' ? 'badge-danger' : 
                               cluster.name === 'Confused' ? 'badge-warning' : 'badge-success';
            container.innerHTML += `
                <div style="flex:1; background: var(--bg-surface-hover); padding: 16px; border-radius: var(--radius-md); border: 1px solid var(--border-color);">
                    <div style="display:flex; justify-content:space-between; margin-bottom: 12px; align-items:center;">
                        <span style="font-weight:600; font-size:0.875rem;">${cluster.name}</span>
                        <span class="badge ${badgeClass}">${cluster.size} users</span>
                    </div>
                    <div style="font-size:0.75rem; color: var(--text-secondary); line-height: 1.6;">
                        <strong>Centroid Data:</strong><br/>
                        Avg Step Time: ${cluster.avgTime.toFixed(1)}s <br/>
                        Friction Score: ${cluster.friction.toFixed(1)} 
                    </div>
                </div>
            `;
        });
    }

    function renderInsights() {
        const insightContainer = document.getElementById('ai-insights-list');
        const actionContainer = document.getElementById('recommendations-list');
        if(!insightContainer || !actionContainer) return;
        
        insightContainer.innerHTML = '';
        actionContainer.innerHTML = '';
        
        state.aiInsights.forEach(insight => {
            // Render Insight (Root Cause)
            insightContainer.innerHTML += `
                <div class="insight-card insight-${insight.type}">
                    <p style="margin-bottom:0;">${insight.text}</p>
                </div>
            `;
            // Render Action (Recommendation)
            actionContainer.innerHTML += `
                <div class="insight-card insight-${insight.type}">
                    <div class="insight-action" style="font-size: 0.85rem; padding: 8px 12px; width: 100%;">
                        <i data-lucide="${insight.type === 'critical' ? 'zap' : 'wrench' }" style="width:16px;height:16px;"></i> 
                        ${insight.action}
                    </div>
                </div>
            `;
        });
        lucide.createIcons();
    }

    function renderTimeStats() {
        const container = document.getElementById('time-chart-container');
        container.innerHTML = '';
        const maxTime = Math.max(...state.funnelSteps.map(s => s.timeAvg));
        
        state.funnelSteps.forEach(step => {
            const pct = (step.timeAvg / maxTime) * 100;
            let bgColor = 'var(--accent-cyan)';
            if (pct > 80) bgColor = 'var(--accent-rose)'; // highlight slow steps
            else if (pct > 50) bgColor = 'var(--accent-amber)';

            container.innerHTML += `
                <div class="bar-chart-row">
                    <div class="bar-chart-label">
                        <span>${step.label}</span>
                        <span class="val">${step.timeAvg}s ${pct > 80 ? '⚠️' : ''}</span>
                    </div>
                    <div class="bar-chart-bg">
                        <div class="bar-chart-fill" style="width: ${pct}%; background: ${bgColor};"></div>
                    </div>
                </div>
            `;
        });
    }

    function renderDeviceStats() {
        const container = document.getElementById('device-stats-container');
        container.innerHTML = '';
        const maxUsers = Math.max(...state.deviceStats.map(d => d.users));

        state.deviceStats.forEach(stat => {
            const pct = (stat.users / maxUsers) * 100;
            container.innerHTML += `
                <div class="bar-chart-row">
                    <div class="bar-chart-label">
                        <span>${stat.device}</span>
                        <span class="val">${stat.conversion}% cvr (${stat.users})</span>
                    </div>
                    <div class="bar-chart-bg">
                        <div class="bar-chart-fill" style="width: ${pct}%; background: var(--accent-primary);"></div>
                    </div>
                </div>
            `;
        });
    }

    function renderSessions() {
        const tbody = document.getElementById('sessions-table-body');
        tbody.innerHTML = '';
        
        state.activeRiskySessions.forEach(session => {
            const tr = document.createElement('tr');
            
            let riskBadge = 'badge-warning';
            if (session.risk > 90) riskBadge = 'badge-danger';
            else if (session.risk < 80) riskBadge = 'badge-info';

            tr.innerHTML = `
                <td><strong>${session.id}</strong></td>
                <td>${session.step}</td>
                <td>${session.time}</td>
                <td style="width: 35%;">
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <div style="flex: 1; height: 6px; background: rgba(255,255,255,0.1); border-radius: 3px; overflow:hidden;">
                            <div style="width: ${session.risk}%; height: 100%; background: ${riskBadge === 'badge-danger' ? 'var(--accent-rose)' : 'var(--accent-amber)'}; transition: width 0.5s;"></div>
                        </div>
                        <span style="font-size: 0.85rem; font-weight: 700;" class="${riskBadge === 'badge-danger' ? 'text-rose' : ''}">${session.risk}%</span>
                    </div>
                </td>
            `;
            tbody.appendChild(tr);
        });
    }

    function triggerReengagement(stepLabel) {
        const userId = "usr_" + Math.random().toString(36).substr(2, 6);
        const isEmail = Math.random() > 0.5;
        const channel = isEmail ? "Mock Email Dispatch" : "In-App Push Modal";
        const icon = isEmail ? "mail" : "smartphone";
        
        let message = "Complete your signup in just 10 seconds!";
        if (stepLabel === "Profile Setup") message = "Skip avatar upload and start exploring now!";
        else if (stepLabel === "OTP Verification") message = "Didn't get the code? Click here to verify via Email instead.";
        
        state.reengagementLogs.unshift({
            id: userId,
            channel: channel,
            icon: icon,
            message: message
        });
        
        if (state.reengagementLogs.length > 4) state.reengagementLogs.pop();
    }

    function renderReengagement() {
        const container = document.getElementById('engagement-list');
        if(!container) return;
        
        if (state.reengagementLogs.length === 0) return; // Keep placeholder
        
        container.innerHTML = '';
        state.reengagementLogs.forEach(log => {
            container.innerHTML += `
                <div class="engagement-item">
                    <div class="engagement-user">${log.id}</div>
                    <div class="engagement-channel"><i data-lucide="${log.icon}" style="width:16px;height:16px;"></i> ${log.channel}</div>
                    <div class="engagement-message">"${log.message}"</div>
                    <div><span class="badge badge-success" style="font-size:0.65rem;">TRIGGERED</span></div>
                </div>
            `;
        });
        lucide.createIcons();
    }

    function renderABTest() {
        if(!document.getElementById('ab-con-a')) return;
        
        const rateA = ((state.abTest.converted_a / state.abTest.started_a) * 100).toFixed(1);
        const rateB = ((state.abTest.converted_b / state.abTest.started_b) * 100).toFixed(1);
        const imp = (Math.abs(rateB - rateA)).toFixed(1); // Absolute improvement percentage points

        document.getElementById('ab-con-a').innerText = `${rateA}%`;
        document.getElementById('ab-con-b').innerText = `${rateB}%`;
        document.getElementById('ab-improvement').innerText = `+${imp}%`;
    }

    // --- Simulator Loop (Real-Time Mock Data Generator) ---
    function simulateTraffic() {
        // Randomly add users to top of funnel and move them down, with random dropoffs
        const newVisitors = Math.floor(Math.random() * 5);
        state.totalVisitors += newVisitors;
        state.funnelSteps[0].users += newVisitors;
        
        // Propagate users through funnel
        for (let i = 0; i < state.funnelSteps.length - 1; i++) {
            const transitionChance = Math.random();
            const flowRate = i === 1 ? 0.3 : 0.6; // High friction at step 1 (Signup Modal)
            
            if (transitionChance > flowRate && state.funnelSteps[i].users > state.funnelSteps[i + 1].users) {
                const movingUsers = Math.floor(Math.random() * 3);
                
                // Some drop off completely
                if (Math.random() > 0.8) {
                    state.funnelSteps[i].dropoff += movingUsers;
                    state.funnelSteps[i].users -= movingUsers;
                    
                    // Trigger Re-engagement Module
                    if (movingUsers > 0) {
                        triggerReengagement(state.funnelSteps[i].label);
                    }
                } else {
                    // Move to next step
                    state.funnelSteps[i].users -= movingUsers;
                    state.funnelSteps[i+1].users += movingUsers;
                }
            }
        }

        // Recalculate metrics
        const totalDropoffs = state.funnelSteps.reduce((acc, curr) => acc + curr.dropoff, 0);
        state.dropoffRate = (totalDropoffs / state.totalVisitors) * 100;
        state.conversionRate = (state.funnelSteps[state.funnelSteps.length-1].users / state.totalVisitors) * 100;

        // Occasional noise injection for realism
        if(Math.random() > 0.7) {
            const idx = Math.floor(Math.random() * state.activeRiskySessions.length);
            const r = state.activeRiskySessions[idx];
            let parts = r.time.split(/[m s]/).filter(Boolean);
            let secs = parseInt(parts[0]) * 60 + (parseInt(parts[1]) || 0) + 15;
            r.time = `${Math.floor(secs/60)}m ${secs%60}s`;
        }

        // 1.5 AB Testing Data Progression
        state.abTest.started_a += Math.floor(Math.random() * 5);
        state.abTest.started_b += Math.floor(Math.random() * 5);
        // B historically converts better due to optimization
        state.abTest.converted_a += Math.floor(Math.random() * 2);
        state.abTest.converted_b += Math.floor(Math.random() * 3);

        // --- ML ENGINE PIPELINE ---
        state.mlTick++;
        
        // 1. Drop-off Prediction (Logistic Regression) applied to all active sessions
        // Using predefined trained weights for real-time inference speed
        const lrWeights = [0.02, 1.2, 0.5]; // [Time (sec), Step Depth, Noise]
        const lrBias = -4.5;

        state.activeRiskySessions.forEach(s => {
            const timeParts = s.time.split(/[m s]/).filter(Boolean);
            const timeSecs = parseInt(timeParts[0]) * 60 + (parseInt(timeParts[1]) || 0);
            const stepIdx = Math.max(0, state.funnelSteps.findIndex(x => x.label === s.step));
            
            // Generate feature vector: X = [elapsed_time, funnel_depth, interaction_errors]
            const features = [timeSecs, stepIdx, Math.random() * 3];
            
            // Predict exact probability of churn natively in JS
            const churnProbability = MLEngine.logisticPredict(features, lrWeights, lrBias);
            
            // Map [0,1] probability to risk score
            s.risk = Math.min(99, Math.max(2, Math.floor(churnProbability * 100)));
            
            // Re-classify status based on ML Output
            if (s.risk > 85) s.status = 'High Churn Risk';
            else if (s.risk > 60) s.status = 'Stalled';
            else s.status = 'Active';
        });

        // 2. Behavioral Clustering (K-Means) & Inference (Every 3 ticks to save CPU)
        if (state.mlTick % 3 === 0) {
            
            // Extract feature matrix from sessions
            const X = state.activeRiskySessions.map(s => {
                const parts = s.time.split(/[m s]/).filter(Boolean);
                const secs = parseInt(parts[0]) * 60 + (parseInt(parts[1]) || 0);
                return [secs, s.risk]; 
            });

            // Train K-Means (K=3)
            if (X.length >= 3) {
                const kResult = MLEngine.kMeans(X, 3, 20);
                
                // Map computed centroids back to semantic groups
                let cList = kResult.centroids.map((c, i) => {
                    const count = kResult.assignments.filter(a => a === i).length;
                    return { id: i, time: c[0] || 0, risk: c[1] || 0, size: count * 150 }; // Scale count for visual realism
                });
                
                // Sort by friction/risk to label cohorts reliably
                cList.sort((a,b) => b.risk - a.risk);
                
                state.clusters = [
                    { name: 'Drop-Prone (Critical)', size: cList[0].size || 54, avgTime: cList[0].time, friction: cList[0].risk },
                    { name: 'Confused (Warning)', size: cList[1].size || 102, avgTime: cList[1].time, friction: cList[1].risk },
                    { name: 'Fast Users (Optimal)', size: cList[2].size || 420, avgTime: cList[2].time, friction: cList[2].risk }
                ];
            }

            // 3. Root Cause Engine
            // Use ML Engine's inference block passing the current funnel state
            const generatedInsights = MLEngine.analyzePatterns(lrWeights, lrBias, state.funnelSteps);
            if (generatedInsights && generatedInsights.length > 0) {
                state.aiInsights = generatedInsights;
            }
        }

        // 4. Alerting Thresholds Monitoring
        // Force specific spikes for demonstration purposes
        if (state.mlTick === 3 && !state.otpAlertTriggered) {
            state.otpAlertTriggered = true;
            // Massive Drop-off Spike at OTP
            state.funnelSteps[2].dropoff += Math.floor(state.totalVisitors * 0.25);
            state.funnelSteps[2].users -= Math.floor(state.totalVisitors * 0.25);
            showToast("Drop-off Spike Detected", "Drop-off at OTP step increased by 25% in last 5 minutes.", "critical");
        }

        if (state.mlTick === 6 && !state.delayAlertTriggered) {
            state.delayAlertTriggered = true;
            // Massive Latency Spike at Profile Setup
            state.funnelSteps[3].timeAvg += 180; 
            showToast("High Latency Warning", "Profile Setup duration increased by 180 seconds. Possible API timeout.", "warning");
        }

        // Re-render
        renderMetrics();
        renderFunnel();
        renderInsights();
        renderClusters();
        renderSessions();
        renderReengagement();
        renderABTest();
    }

    // Initial Render
    renderMetrics();
    renderFunnel();
    renderInsights();
    renderClusters();
    renderTimeStats();
    renderDeviceStats();
    renderSessions();
    renderReengagement();
    renderABTest();
    
    // Start simulation loop (every 2.5 seconds)
    setInterval(simulateTraffic, 2500);

    // --- Interactive SPA View Routing ---
    const routeViews = {
        'dashboard': 'ALL', // Special case to show all
        'live-funnel': ['.metric-card', '.funnel-widget', '.time-widget', '.device-widget', '.ab-test-widget'],
        'dropoff-flow': ['.metric-card', '.funnel-widget', '.ai-widget', '.engagement-widget'],
        'sessions': ['.metric-card', '.table-widget', '.cluster-widget'],
        'high-risk': ['.metric-card', '.table-widget', '.ai-widget', '.engagement-widget']
    };

    document.querySelectorAll('.nav-item').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Highlight active tab
            document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
            const targetLink = e.currentTarget;
            targetLink.classList.add('active');
            
            // Update Header
            const title = targetLink.innerText.trim();
            document.getElementById('header-title').innerText = title;
            
            const targetView = targetLink.getAttribute('data-target');
            
            // Grid Reflow Logic
            const allWidgets = document.querySelectorAll('.widget, .metric-card');
            
            if (targetView === 'dashboard' || routeViews[targetView] === 'ALL') {
                allWidgets.forEach(w => {
                    w.style.display = '';
                    w.style.opacity = '0';
                    setTimeout(() => w.style.opacity = '1', 50);
                });
            } else {
                allWidgets.forEach(w => w.style.display = 'none');
                
                const selectors = routeViews[targetView] || [];
                selectors.forEach(selector => {
                    document.querySelectorAll(selector).forEach(w => {
                        w.style.display = '';
                        w.style.opacity = '0';
                        w.style.transition = 'opacity 0.3s ease';
                        setTimeout(() => w.style.opacity = '1', 50);
                    });
                });
            }
        });
    });
});
