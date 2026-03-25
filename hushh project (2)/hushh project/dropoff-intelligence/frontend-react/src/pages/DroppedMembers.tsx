import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import { UserMinus, AlertCircle, ArrowDownRight, Layout as LayoutIcon, Users } from 'lucide-react';

const dropoffStepData = [
  { step: 'Signup', drop: 120, total: 1000, percentage: '12.0%' },
  { step: 'Email Verify', drop: 250, total: 880, percentage: '28.4%' },
  { step: 'Profile Info', drop: 180, total: 630, percentage: '28.5%' },
  { step: 'Avatar Upload', drop: 90, total: 450, percentage: '20.0%' },
  { step: 'Finalize', drop: 40, total: 360, percentage: '11.1%' },
];

const dropoffReasons = [
  { name: 'OTP Latency', value: 35, color: '#6366f1' },
  { name: 'UI Complexity', value: 25, color: '#10b981' },
  { name: 'App Crash', value: 15, color: '#f43f5e' },
  { name: 'Decision Change', value: 25, color: '#f59e0b' },
];

const DroppedMembers: React.FC = () => {
  return (
    <div className="space-y-6 pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/20 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dropped Members</h1>
          <p className="text-slate-500 text-sm mt-1 font-medium">Lifecycle abandonment points and behavioral analysis.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-1.5 bg-rose-500/10 border border-rose-500/20 rounded-full text-rose-600 text-[10px] font-bold uppercase tracking-widest">
          <UserMinus size={14} />
          <span>1,240 Abandoned</span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Highest Loss Step', value: 'Email Verify', icon: AlertCircle, color: 'text-rose-600', bg: 'bg-rose-500/10' },
          { label: 'Active Users', value: '94 Active', icon: LayoutIcon, color: 'text-indigo-600', bg: 'bg-indigo-500/10' },
          { label: 'Overall Drop Rate', value: '34.2%', icon: ArrowDownRight, color: 'text-amber-600', bg: 'bg-amber-500/10' },
          { label: 'Total Lost Users', value: '1,240', icon: UserMinus, color: 'text-rose-600', bg: 'bg-rose-500/10' },
        ].map((stat, i) => (
          <div key={i} className="card-base p-5 flex flex-col justify-between group hover:border-indigo-100/50">
            <div className="flex items-center justify-between mb-3">
              <span className="stat-label">{stat.label}</span>
              <div className={`p-1.5 rounded-xl ${stat.bg} ${stat.color} transition-all duration-300 group-hover:scale-110 shadow-sm`}>
                <stat.icon size={16} />
              </div>
            </div>
            <div className="stat-value text-slate-900 text-2xl font-extrabold tracking-tight">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Step-by-Step Loss Chart */}
        <div className="card-base p-6">
          <h3 className="text-base font-bold mb-8 flex items-center gap-2 text-slate-900">
            <Users size={18} className="text-indigo-600" />
            Abandonment per Step
          </h3>
          <div className="h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dropoffStepData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="step" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip content={<div className="custom-tooltip" />} cursor={{ fill: 'rgba(0,0,0,0.02)' }} />
                <Bar dataKey="drop" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Reason Distribution */}
        <div className="card-base p-6">
          <h3 className="text-base font-bold mb-8 text-slate-900">Abandonment Root Cause</h3>
          <div className="h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={dropoffReasons}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={110}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {dropoffReasons.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<div className="custom-tooltip" />} />
                <Legend verticalAlign="bottom" align="center" iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '11px', paddingTop: '10px', color: '#64748b' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DroppedMembers;
