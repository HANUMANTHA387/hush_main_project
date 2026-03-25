import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { CheckCircle, Clock, UserMinus, Layout as LayoutIcon } from 'lucide-react';

const ticketTrendData = [
  { day: 'Mon', raised: 45, solved: 38 },
  { day: 'Tue', raised: 52, solved: 45 },
  { day: 'Wed', raised: 48, solved: 50 },
  { day: 'Thu', raised: 61, solved: 55 },
  { day: 'Fri', raised: 55, solved: 58 },
  { day: 'Sat', raised: 32, solved: 35 },
  { day: 'Sun', raised: 28, solved: 30 },
];

const recentTickets = [
  { id: 'TKT-1024', issue: 'OTP Delay - User #882', status: 'Resolved', priority: 'High', time: '2h ago' },
  { id: 'TKT-1025', issue: 'Dashboard Loading Error', status: 'Pending', priority: 'Critical', time: '1h ago' },
  { id: 'TKT-1026', issue: 'Broken Profile Link', status: 'Escalated', priority: 'Medium', time: '45m ago' },
  { id: 'TKT-1027', issue: 'API Timeout in US-East', status: 'Resolved', priority: 'High', time: '30m ago' },
];

const RaisedTickets: React.FC = () => {
  return (
    <div className="space-y-6 pb-12">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/20 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Support Tickets</h1>
          <p className="text-slate-500 text-sm mt-1 font-medium">Real-time tracking of customer issues and resolution throughput.</p>
        </div>
        <button className="px-6 py-2.5 rounded-2xl bg-indigo-600 text-white font-extrabold text-sm hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-500/20 hover:shadow-indigo-500/40 hover:-translate-y-0.5 active:scale-95">
          + Raise Ticket
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Dropped Members', value: '1,240', icon: UserMinus, color: 'text-rose-600', bg: 'bg-rose-500/10' },
          { label: 'Total Dashboards', value: '94 Active', icon: LayoutIcon, color: 'text-indigo-600', bg: 'bg-indigo-500/10' },
          { label: 'Solved Today', value: '124', icon: CheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-500/10' },
          { label: 'Pending Issues', value: '18', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-500/10' },
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Ticket Trends Chart */}
        <div className="lg:col-span-2 card-base p-6">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-base font-extrabold text-slate-900 tracking-tight">Resolution Velocity</h3>
            <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest">
              <div className="flex items-center gap-1.5 text-indigo-600">
                <span className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.5)]" /> Raised
              </div>
              <div className="flex items-center gap-1.5 text-emerald-600">
                <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" /> Solved
              </div>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ticketTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="day" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} dy={10} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip content={<div className="custom-tooltip" />} cursor={{ fill: 'rgba(0,0,0,0.02)' }} />
                <Bar dataKey="raised" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={25} />
                <Bar dataKey="solved" fill="#10b981" radius={[4, 4, 0, 0]} barSize={25} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Ticket List / Issues Status */}
        <div className="card-base p-6">
          <h3 className="text-base font-extrabold mb-6 text-slate-900 tracking-tight">Recent Tickets</h3>
          <div className="space-y-3">
            {recentTickets.map((ticket, i) => (
              <div key={i} className="p-4 rounded-2xl bg-white/40 backdrop-blur-md border border-white/40 hover:border-indigo-100 transition-all duration-300 group hover:bg-white/60 shadow-sm hover:shadow-md">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold text-slate-400 tracking-widest opacity-60 group-hover:opacity-100 group-hover:text-indigo-600 transition-all uppercase">{ticket.id}</span>
                  <span className={`text-[9px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-tighter border ${ticket.status === 'Resolved' ? 'bg-emerald-50 border-emerald-100 text-emerald-600' :
                    ticket.status === 'Pending' ? 'bg-amber-50 border-amber-100 text-amber-600' :
                      'bg-rose-50 border-rose-100 text-rose-600'
                    }`}>
                    {ticket.status}
                  </span>
                </div>
                <div className="text-sm font-extrabold text-slate-900 mb-2 truncate group-hover:text-indigo-600 transition-colors">{ticket.issue}</div>
                <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-tight">
                  <span className={`${ticket.priority === 'Critical' ? 'text-rose-600' :
                    ticket.priority === 'High' ? 'text-orange-600' :
                      'text-slate-400'
                    }`}>Priority: {ticket.priority}</span>
                  <span className="text-slate-400 italic font-medium opacity-60">{ticket.time}</span>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-3 rounded-2xl bg-white/60 text-slate-500 text-[10px] font-bold hover:bg-white hover:text-indigo-600 transition-all border border-white/80 uppercase tracking-[0.2em] shadow-sm hover:shadow-md">
            View All Issues
          </button>
        </div>
      </div>
    </div>
  );
};

export default RaisedTickets;
