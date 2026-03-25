import React from 'react';
import { 
  Users, Activity, UserCheck, RefreshCcw, ArrowUpRight, UserMinus, Clock
} from 'lucide-react';

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/20 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Customer Engagement</h1>
          <p className="text-slate-500 text-sm mt-1 font-medium">Lifecycle metrics and conversion health monitoring.</p>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-bold text-emerald-600 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20 uppercase tracking-widest">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          System Healthy
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { label: 'Total Users', value: '45,210', icon: Users, color: 'text-indigo-600', bg: 'bg-indigo-50', trend: '+12%' },
          { label: 'Conversion Rate', value: '65.8%', icon: Activity, color: 'text-emerald-600', bg: 'bg-emerald-50', trend: '+2.4%' },
          { label: 'Drop-off Rate', value: '34.2%', icon: UserMinus, color: 'text-rose-600', bg: 'bg-rose-50', trend: '-1.1%' },
          { label: 'Avg Onboard Time', value: '4m 12s', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50', trend: '-15s' },
          { label: 'New Users (30d)', value: '12,450', icon: UserCheck, color: 'text-indigo-600', bg: 'bg-indigo-50', trend: '+8%' },
          { label: 'Return Users', value: '8,321', icon: RefreshCcw, color: 'text-purple-600', bg: 'bg-purple-50', trend: '+5%' },
        ].map((stat, i) => (
          <div key={i} className="card-base p-5 flex flex-col justify-between group">
            <div className="flex items-center justify-between mb-3">
              <span className="stat-label">{stat.label}</span>
              <div className={`p-1.5 rounded-lg ${stat.bg} ${stat.color} transition-transform group-hover:scale-110`}>
                <stat.icon size={16} />
              </div>
            </div>
            <div className="flex items-end justify-between">
              <div className="stat-value text-slate-900">{stat.value}</div>
              <div className="flex items-center gap-0.5 text-xs font-bold text-emerald-600 mb-1">
                <ArrowUpRight size={10} />
                {stat.trend}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
