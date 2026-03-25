import React from 'react';
import { Target, Lightbulb, Clock, CheckCircle2 } from 'lucide-react';

const ProfileAnalytics: React.FC = () => {
  return (
    <div className="space-y-6 pb-12">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/20 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Profile Architecture</h1>
          <p className="text-slate-500 text-sm mt-1 font-medium">Schema completeness and temporal interaction metrics.</p>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-bold text-amber-600 bg-amber-500/10 px-3 py-1.5 rounded-full border border-amber-500/20 uppercase tracking-widest">
          <Lightbulb size={14} />
          <span>Friction Detected</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Completion Rate */}
        <div className="card-base p-6">
          <h3 className="text-base font-bold flex items-center gap-2 mb-8 text-slate-900">
            <Target size={18} className="text-indigo-600" />
            Global Completion
          </h3>
          <div className="flex flex-col items-center justify-center py-6">
            <div className="relative w-44 h-44 flex items-center justify-center rounded-full border-[12px] border-white/20 shadow-inner">
              <div 
                className="absolute inset-0 rounded-full border-[12px] border-indigo-500 shadow-lg shadow-indigo-500/20" 
                style={{ clipPath: 'conic-gradient(white 84%, transparent 84%)', transform: 'rotate(-90deg)' }}
              ></div>
              <div className="flex flex-col items-center">
                <span className="text-5xl font-extrabold text-slate-900 tracking-tighter">84%</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Health Score</span>
              </div>
            </div>
            <p className="text-xs text-slate-400 mt-8 text-center leading-relaxed font-bold opacity-80 uppercase tracking-tight">Average field population across the total active customer base.</p>
          </div>
        </div>

        {/* Time Spent for Steps */}
        <div className="card-base p-6 lg:col-span-2">
          <h3 className="text-base font-bold flex items-center gap-2 mb-8 text-slate-900">
            <Clock size={18} className="text-emerald-600" />
            Stage Residence
          </h3>
          <div className="space-y-8">
            {[
              { step: "Avatar Upload", time: "1m 45s", pct: 75, color: "bg-rose-500", status: "Critical" },
              { step: "Bio Description", time: "0m 50s", pct: 40, color: "bg-indigo-500", status: "Optimal" },
              { step: "Social Linking", time: "0m 15s", pct: 15, color: "bg-emerald-500", status: "Optimal" },
            ].map((s, i) => (
              <div key={i}>
                <div className="flex justify-between items-end mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-slate-900 font-bold">{s.step}</span>
                    <span className={`text-[9px] font-bold uppercase px-3 py-1 rounded-full border ${
                      s.status === 'Critical' ? 'bg-rose-50 border-rose-100 text-rose-600' : 'bg-emerald-50 border-emerald-100 text-emerald-600'
                    }`}>{s.status}</span>
                  </div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{s.time}</span>
                </div>
                <div className="h-3 w-full bg-white/40 rounded-full overflow-hidden border border-white/20">
                  <div className={`h-full ${s.color} rounded-full transition-all duration-1000 shadow-[0_0_12px_rgba(0,0,0,0.1)]`} style={{width: `${s.pct}%`}}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Recommendations */}
        <div className="card-base p-6 lg:col-span-3 border-l-4 border-l-amber-500 bg-amber-500/[0.03]">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle2 size={18} className="text-amber-600" />
            <h3 className="text-base font-extrabold text-slate-900 uppercase tracking-tight">Strategic Intervention Required</h3>
          </div>
          <div className="text-slate-600 text-sm leading-relaxed space-y-4">
            <p className="font-bold opacity-80">
              Telemetry confirms <span className="text-indigo-600 font-extrabold uppercase text-[12px] tracking-tight bg-indigo-50 px-2 py-0.5 rounded">Avatar Uploading</span> as the primary friction node in the profile schema, consumed <span className="text-rose-600 font-extrabold">1m 45s</span> on average — significantly higher than industry benchmarks.
            </p>
            <p className="text-slate-500 bg-white/60 backdrop-blur-xl p-4 rounded-2xl border border-white/40 italic shadow-sm font-bold opacity-70">
              "Transitioning to automated OIDC identity pulls (Google/Gravatar) could de-risk this step by 40%, potentially increasing global completion rates by an estimated 14.2%."
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProfileAnalytics;
