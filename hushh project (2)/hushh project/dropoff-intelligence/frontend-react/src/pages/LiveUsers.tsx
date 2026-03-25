import React from 'react';
import { Eye, Clock, CornerUpLeft, Activity } from 'lucide-react';

const LiveUsers: React.FC = () => {
  return (
    <div className="space-y-6 pb-12">

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/20 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center">
            <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full mr-3 shadow-[0_0_12px_rgba(16,185,129,0.4)]"></span>
            Live Observation
          </h1>
          <p className="text-slate-500 text-sm mt-1 font-medium">Real-time trace of active user sessions and interaction events.</p>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-bold text-indigo-600 bg-indigo-500/10 px-3 py-1.5 rounded-full border border-indigo-500/20 uppercase tracking-widest">
          <Activity size={14} />
          <span>428 Active Sessions</span>
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
          <div className="stat-value">2m 45s</div>
          <div className="stat-label mt-1">Global Average Duration</div>

          <div className="mt-6 pt-6 border-t border-white/20">
            <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-tight">
              <span className="text-slate-400">Peak session today:</span>
              <span className="text-rose-600 font-bold px-2 py-0.5 bg-rose-50 rounded">14m 20s</span>
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
          <div className="stat-value">142</div>
          <div className="stat-label mt-1">Live Back-button Triggers</div>

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
            Behavioral Event Log
          </h3>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-100 px-3 py-1 rounded-full border border-slate-200">Real-time Feed</span>
        </div>
        <div className="space-y-3">
          {[
            { user: "usr_99x", action: "Triggered back button on Profile Form", time: "Just now", type: "Friction" },
            { user: "usr_42a", action: "Idled for >2mins on OTP screen", time: "1 min ago", type: "Idle" },
            { user: "usr_8bx", action: "Completed full session in 42s", time: "3 mins ago", type: "Success" },
            { user: "usr_15k", action: "Failed avatar upload twice", time: "5 mins ago", type: "Error" },
          ].map((log, i) => (
            <div key={i} className="flex justify-between items-center p-3.5 bg-white/40 rounded-xl text-sm border border-white/20 hover:border-indigo-100/50 hover:bg-white/60 transition-all duration-300 group">
              <div className="flex items-center gap-4">
                <span className="font-mono text-[10px] text-indigo-600 bg-indigo-50 px-2 py-1 rounded font-bold uppercase tracking-tighter">{log.user}</span>
                <span className="text-slate-700 font-bold">{log.action}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-full border ${log.type === 'Success' ? 'text-emerald-600 bg-emerald-50 border-emerald-100' :
                    log.type === 'Friction' ? 'text-rose-600 bg-rose-50 border-rose-100' :
                    log.type === 'Idle' ? 'text-amber-600 bg-amber-50 border-amber-100' :
                    'text-slate-500 bg-slate-50 border-slate-200'
                  }`}>{log.type}</span>
                <span className="text-slate-400 text-[10px] italic font-medium">{log.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default LiveUsers;
