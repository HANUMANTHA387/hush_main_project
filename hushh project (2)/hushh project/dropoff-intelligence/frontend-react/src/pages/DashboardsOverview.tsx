import React, { useState, useEffect } from 'react';
import { 
  LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, 
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, 
  ComposedChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';

const DashboardsOverview: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8000/api/v1/analytics')
      .then(res => res.json())
      .then(json => {
        setData(json);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch analytics:", err);
        setLoading(false);
      });
  }, []);

  if (loading || !data) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="w-12 h-12 rounded-full border-2 border-indigo-500/20 border-t-indigo-500 animate-spin"></div>
      </div>
    );
  }

  const {
    sessionsTimeData, dropoffStepData, conversionData, otpFailuresData,
    serverLatencyData, timePerStageData, dauData, deviceData, regionData, profileCompletionDist
  } = data;

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/20 pb-6 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Pulse AI Terminal</h1>
          <p className="text-slate-500 text-sm mt-1 font-medium">Foundational metrics and telemetry derived from live application events.</p>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-bold text-indigo-600 bg-indigo-500/10 px-3 py-1.5 rounded-full border border-indigo-500/20 uppercase tracking-widest">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></span>
          Telemetry Active
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 1. Line Chart: Sessions Over Time */}
        <div className="card-base p-6">
          <h3 className="text-base font-semibold mb-6 flex items-center gap-2 text-slate-900">
            <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
            Total Sessions (24h)
          </h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sessionsTimeData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="time" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip content={<div className="custom-tooltip" />} />
                <Line type="monotone" dataKey="sessions" stroke="#6366F1" strokeWidth={3} dot={{ r: 4, fill: '#6366F1', strokeWidth: 0 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 2. Bar Chart: Drop-off by Onboarding Step */}
        <div className="card-base p-6">
          <h3 className="text-base font-semibold mb-6 text-slate-900">Abandonment Rates (%)</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dropoffStepData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="step" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false}/>
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false}/>
                <Tooltip content={<div className="custom-tooltip" />} cursor={{fill: 'rgba(0,0,0,0.02)'}} />
                <Bar dataKey="drop" fill="#f43f5e" radius={[4, 4, 0, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 3. Pie Chart: Conversion vs Drop-off */}
        <div className="card-base p-6">
          <h3 className="text-base font-semibold mb-6 text-slate-900">Conversion Summary</h3>
          <div className="h-72 w-full relative">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="text-2xl font-bold text-slate-900">65%</span>
            </div>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={conversionData} innerRadius={70} outerRadius={100} paddingAngle={5} dataKey="value" stroke="none">
                  {conversionData.map((entry: any, index: number) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                </Pie>
                <Tooltip content={<div className="custom-tooltip" />} />
                <Legend verticalAlign="bottom" height={36} iconType="circle" iconSize={8} wrapperStyle={{fontSize: '11px', color: '#64748b'}} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 4. Radar Chart: OTP Failure Reasons */}
        <div className="card-base p-6">
          <h3 className="text-base font-semibold mb-6 text-slate-900">OTP Breach Analysis</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={otpFailuresData}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="reason" stroke="#64748b" fontSize={10} />
                <PolarRadiusAxis angle={30} domain={[0, 150]} stroke="transparent" tick={false} />
                <Radar name="Failures" dataKey="count" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.3} />
                <Tooltip content={<div className="custom-tooltip" />} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 5. Area Chart: Server API Latency Trends (ms) */}
        <div className="card-base p-6 lg:col-span-2">
          <h3 className="text-base font-semibold mb-6 flex items-center gap-2 text-slate-900">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            Interface Latency (ms)
          </h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={serverLatencyData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorLatency" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="time" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip content={<div className="custom-tooltip" />} />
                <Area type="monotone" dataKey="latency" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorLatency)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 6. Stacked Bar Chart: DAU & New Users */}
        <div className="card-base p-6">
          <h3 className="text-base font-semibold mb-6 text-slate-900">Active vs New User Volume</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dauData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="day" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false}/>
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false}/>
                <Tooltip content={<div className="custom-tooltip" />} cursor={{fill: 'rgba(0,0,0,0.02)'}} />
                <Legend iconType="circle" iconSize={8} wrapperStyle={{fontSize: '11px', paddingTop: '10px'}} />
                <Bar dataKey="active" stackId="a" fill="#6366f1" radius={[0, 0, 4, 4]} barSize={25} />
                <Bar dataKey="new" stackId="a" fill="#10b981" radius={[4, 4, 0, 0]} barSize={25} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 7. Composed Chart: Time Spent per Stage */}
        <div className="card-base p-6">
          <h3 className="text-base font-semibold mb-6 text-slate-900">Median Time per Stage (s)</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={timePerStageData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="stage" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false}/>
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false}/>
                <Tooltip content={<div className="custom-tooltip" />} />
                <Legend iconType="circle" iconSize={8} wrapperStyle={{fontSize: '11px', paddingTop: '10px'}} />
                <Bar dataKey="time" name="Median" fill="#8b5cf6" radius={[4, 4, 0, 0]} barSize={32} />
                <Line type="monotone" dataKey="avg" name="Historical" stroke="#ec4899" strokeWidth={2} dot={{r:4, fill: '#ec4899'}} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 8. Donut Chart: Devices */}
        <div className="card-base p-6">
          <h3 className="text-base font-semibold mb-6 text-slate-900">Device Inventory</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={deviceData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={3} dataKey="value" stroke="none">
                  {deviceData.map((entry: any, index: number) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                </Pie>
                <Tooltip content={<div className="custom-tooltip" />} />
                <Legend verticalAlign="bottom" iconType="circle" iconSize={8} wrapperStyle={{fontSize: '11px'}} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 9. Horizontal Bar: Region Distribution */}
        <div className="card-base p-6">
          <h3 className="text-base font-semibold mb-6 text-slate-900">Geographic Distribution</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={regionData} margin={{top: 5, right: 30, left: 10, bottom: 5}}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                <XAxis type="number" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false}/>
                <YAxis dataKey="region" type="category" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} width={100}/>
                <Tooltip content={<div className="custom-tooltip" />} cursor={{fill: 'rgba(0,0,0,0.02)'}} />
                <Bar dataKey="users" fill="#a855f7" radius={[0, 4, 4, 0]} barSize={16} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 10. Histogram-Style Line/Bar: Profile Completion */}
        <div className="card-base p-6 lg:col-span-2">
          <h3 className="text-base font-semibold mb-6 text-slate-900">Profile Completion Histogram</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={profileCompletionDist} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorDist" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="bin" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false}/>
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false}/>
                <Tooltip content={<div className="custom-tooltip" />} />
                <Area type="step" dataKey="users" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorDist)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DashboardsOverview;
