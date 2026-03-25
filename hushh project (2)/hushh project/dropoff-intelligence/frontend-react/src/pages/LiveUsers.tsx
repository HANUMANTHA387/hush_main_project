import React, { useEffect, useState } from 'react';
import { Eye, Clock, CornerUpLeft, Activity, ShieldCheck, ShieldAlert, Link as LinkIcon } from 'lucide-react';

interface LiveUser {
  id: string;
  persona_type: string;
  connections: number;
  last_sync: string;
  guardian_mode: boolean;
  status: string;
  action: string;
  time: string;
}

interface LiveUsersData {
  active_sessions: number;
  global_avg_duration: string;
  total_back_triggers: number;
  users: LiveUser[];
}

const LiveUsers: React.FC = () => {
  const [data, setData] = useState<LiveUsersData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLiveUsers = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/v1/live-users');
        if (!response.ok) throw new Error('Backend unreachable');
        const result = await response.json();
        // Only update if data has actually changed (to prevent flickering)
        setData(prev => JSON.stringify(prev) === JSON.stringify(result) ? prev : result);
      } catch (error) {
        console.error('Error fetching live users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLiveUsers();
    const interval = setInterval(fetchLiveUsers, 2000); // Poll every 2 seconds for more "live" feel
    return () => clearInterval(interval);
  }, []);

  if (loading && !data) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12">

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/20 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center">
            <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full mr-3 shadow-[0_0_12px_rgba(16,185,129,0.4)]"></span>
            Live User's Behavioural Tracking...
          </h1>
          <p className="text-slate-500 text-sm mt-1 font-medium">Real-time trace of active user sessions and interaction events.</p>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-bold text-indigo-600 bg-indigo-500/10 px-3 py-1.5 rounded-full border border-indigo-500/20 uppercase tracking-widest">
          <Activity size={14} />
          <span>{data?.active_sessions || 0} Active Sessions</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div className="card-base p-6">
          <div className="flex items-center gap-3 mb-6 text-indigo-600">
            <div className="p-2 rounded-xl bg-indigo-500/10">
              <Clock size={18} />
            </div>
            <h3 className="font-bold text-slate-900">Session Residence</h3>
          </div>
          <div className="stat-value">{data?.global_avg_duration || "0m 0s"}</div>
          <div className="stat-label mt-1">Global Average Duration</div>

          <div className="mt-6 pt-6 border-t border-white/20">
            <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-tight">
              <span className="text-slate-400">Peak session today:</span>
              <span className="text-rose-600 font-bold px-2 py-0.5 bg-rose-50 rounded">1m 20s</span>
            </div>
          </div>
        </div>

        <div className="card-base p-6">
          <div className="flex items-center gap-3 mb-6 text-emerald-600">
            <div className="p-2 rounded-xl bg-emerald-500/10">
              <CornerUpLeft size={18} />
            </div>
            <h3 className="font-bold text-slate-900">Navigation Fatigue</h3>
          </div>
          <div className="stat-value">{data?.total_back_triggers || 10}</div>
          <div className="stat-label mt-1">Live Back-button Triggers Actions</div>

          <div className="mt-6 pt-6 border-t border-white/20">
            <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-tight">
              <span className="text-slate-400">Major friction stage:</span>
              <span className="text-amber-600 font-bold px-2 py-0.5 bg-amber-50 rounded tracking-wider">Profile Setup</span>
            </div>
          </div>
        </div>

      </div>

      <div className="card-base p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-base font-bold flex items-center gap-2 text-slate-900">
            <Eye size={18} className="text-indigo-600" />
            User's Behavioral Actions
          </h3>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-100 px-3 py-1 rounded-full border border-slate-200">Real-time Feed</span>
        </div>
        <div className="space-y-3">
          {data?.users.map((log, i) => (
            <div key={i} className="flex flex-col gap-3 p-4 bg-white/40 rounded-xl text-sm border border-white/20 hover:border-indigo-100/50 hover:bg-white/60 transition-all duration-300 group">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <span className="font-mono text-[10px] text-indigo-600 bg-indigo-50 px-2 py-1 rounded font-bold uppercase tracking-tighter">{log.id}</span>
                  <span className="text-slate-700 font-bold">{log.action}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-full border ${log.status === 'Success' ? 'text-emerald-600 bg-emerald-50 border-emerald-100' :
                    log.status === 'Friction' ? 'text-rose-600 bg-rose-50 border-rose-100' :
                      log.status === 'Idle' ? 'text-amber-600 bg-amber-50 border-amber-100' :
                        'text-slate-500 bg-slate-50 border-slate-200'
                    }`}>{log.status}</span>
                  <span className="text-slate-400 text-[10px] italic font-medium">{log.time}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-1 pt-3 border-t border-slate-100/50">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">Persona:</span>
                  <span className="text-[11px] text-slate-600 font-medium">{log.persona_type}</span>
                </div>
                <div className="flex items-center gap-2">
                  <LinkIcon size={12} className="text-indigo-400" />
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">Connections:</span>
                  <span className="text-[11px] text-slate-600 font-bold">{log.connections}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={12} className="text-indigo-400" />
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">Last Sync:</span>
                  <span className="text-[11px] text-slate-600 font-medium">{log.last_sync}</span>
                </div>
                <div className="flex items-center gap-2">
                  {log.guardian_mode ? (
                    <div className="flex items-center gap-1 text-emerald-600">
                      <ShieldCheck size={12} />
                      <span className="text-[10px] font-bold uppercase tracking-tight">Guardian Active</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 text-slate-400">
                      <ShieldAlert size={12} />
                      <span className="text-[10px] font-bold uppercase tracking-tight">Guardian Off</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default LiveUsers;
