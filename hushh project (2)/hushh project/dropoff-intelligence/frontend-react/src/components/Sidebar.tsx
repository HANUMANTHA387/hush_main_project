import { 
  Activity, LayoutDashboard, Server, UserCircle, Users, Settings, Zap,
  UserMinus, Ticket
} from 'lucide-react';
import SidebarItem from './SidebarItem';
import { cn } from './SidebarItem';

const mainNavigation = [
  { label: 'Live Users', to: '/live-users', icon: Activity },
  { label: 'Dashboards', to: '/dashboards', icon: LayoutDashboard },
  { label: 'OTP & Server Issues', to: '/otp-analysis', icon: Server },
  { label: 'Profiles', to: '/profile', icon: UserCircle },
  { label: 'Customers Engage', to: '/', icon: Users },
  { label: 'Dropped-Members', to: '/dropped-members', icon: UserMinus },
  { label: 'Raised-Tickets', to: '/raised-tickets', icon: Ticket },
];

const Sidebar: React.FC = () => {
  return (
    <aside 
      className={cn(
        'h-screen flex flex-col bg-white/40 backdrop-blur-xl border-r border-white/20 transition-all duration-300 relative',
        'w-[260px]'
      )}
    >
      {/* Target Logo Area */}
      <div className="flex items-center h-16 px-6 mb-2 border-b border-white/10">
        <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center flex-shrink-0 shadow-xl shadow-indigo-500/20">
          <Zap size={18} fill="currentColor" />
        </div>
        <span className="ml-3 font-bold text-lg text-slate-900 tracking-tight truncate">Pulse AI</span>
      </div>

      {/* Scroller Area */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden p-3 scrollbar-hide">
        
        <div className="mb-6">
          <div className="px-3 mb-3 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] opacity-60">Navigation</div>
          <nav className="space-y-1">
            {mainNavigation.map(item => <SidebarItem key={item.to} {...item} />)}
          </nav>
        </div>
      </div>

      {/* Footer Area */}
      <div className="p-4 border-t border-white/10">
        <SidebarItem to="/settings" icon={Settings} label="Settings" />
      </div>
    </aside>
  );
};

export default Sidebar;
