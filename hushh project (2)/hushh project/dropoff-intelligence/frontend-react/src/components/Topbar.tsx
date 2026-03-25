import React from 'react';
import { Bell, Search } from 'lucide-react';

const Topbar: React.FC = () => {
  return (
    <header className="h-20 px-8 flex items-center justify-between border-b border-white/20 bg-white/40 backdrop-blur-xl sticky top-0 z-10">
      
      {/* Search Input */}
      <div className="flex items-center bg-white/50 backdrop-blur-md border border-white/40 rounded-full px-4 py-2 w-96 focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:border-indigo-500 transition-all shadow-sm">
        <Search size={18} className="text-slate-400" />
        <input 
          type="text" 
          placeholder="Search analytics, users, insights..." 
          className="bg-transparent border-none outline-none text-sm text-slate-800 ml-3 w-full placeholder:text-slate-400"
        />
      </div>

      {/* Right Side Tools */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 text-[10px] font-bold tracking-wider">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          LIVE TRACKING
        </div>
        
        <button className="text-slate-400 hover:text-indigo-600 transition-colors relative">
          <Bell size={20} />
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
        </button>

        <div className="h-8 w-px bg-slate-200/50"></div>
        
        <div className="flex items-center cursor-pointer group">
          <img 
            src="https://ui-avatars.com/api/?name=Admin&background=6366f1&color=fff&rounded=true" 
            alt="Admin Profile" 
            className="w-10 h-10 rounded-full border-2 border-transparent group-hover:border-indigo-500/20 shadow-lg shadow-indigo-500/10 transition-all p-0.5"
          />
        </div>
      </div>
      
    </header>
  );
};

export default Topbar;
