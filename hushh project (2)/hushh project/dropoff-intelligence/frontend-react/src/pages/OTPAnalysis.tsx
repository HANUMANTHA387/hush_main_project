import React from 'react';
import { AlertCircle, Clock, Server, WifiOff, MailWarning, ShieldCheck } from 'lucide-react';

const OTPAnalysis: React.FC = () => {
  const issues = [
    { title: "Verification Timeout", value: "24%", desc: "Input latency exceeding 60s threshold", icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
    { title: "Domain Validation", value: "18%", desc: "Syntactic errors in email formatting", icon: MailWarning, color: "text-rose-600", bg: "bg-rose-50" },
    { title: "Callback Failure", value: "32%", desc: "Upstream packet loss during handshake", icon: WifiOff, color: "text-indigo-600", bg: "bg-indigo-50" },
    { title: "Spam Filtration", value: "15%", desc: "Carrier-level SMS/Email blocking", icon: AlertCircle, color: "text-orange-600", bg: "bg-orange-50" },
    { title: "Gateway Latency", value: "11%", desc: "Backend API orchestration bottle-neck", icon: Server, color: "text-emerald-600", bg: "bg-emerald-50" },
  ];

  return (
    <div className="space-y-6 pb-12">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/20 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Verification Integrity</h1>
          <p className="text-slate-500 text-sm mt-1 font-medium">Root cause analysis of failed onboarding authentication attempts.</p>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-bold text-emerald-600 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20 uppercase tracking-widest">
          <ShieldCheck size={14} />
          <span>Gateway Secure</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {issues.map((issue, idx) => {
          const Icon = issue.icon;
          return (
            <div key={idx} className="card-base p-6 group hover:border-indigo-100/50">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2.5 rounded-xl ${issue.bg.replace('50', '500/10')} ${issue.color} transition-all duration-300 group-hover:scale-110 shadow-sm`}>
                  <Icon size={20} />
                </div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{issue.value}</div>
              </div>
              <div>
                <h3 className="text-base font-extrabold text-slate-900 tracking-tight">{issue.title}</h3>
                <p className="text-sm text-slate-500 mt-2 leading-relaxed font-bold opacity-80">{issue.desc}</p>
              </div>
            </div>
          )
        })}
      </div>
      
    </div>
  );
};

export default OTPAnalysis;
