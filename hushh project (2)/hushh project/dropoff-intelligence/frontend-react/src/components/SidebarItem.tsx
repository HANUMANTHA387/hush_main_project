import React from 'react';
import { NavLink } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useUIStore } from '../store/useUIStore';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  to: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon: Icon, label, to }) => {
  const isCollapsed = useUIStore((state) => state.isSidebarCollapsed);

  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          'group relative flex items-center rounded-xl px-3 py-2.5 my-1 font-medium transition-all duration-200',
          'hover:bg-slate-100 hover:text-indigo-600',
          isActive
            ? 'bg-indigo-50 text-indigo-600 border border-indigo-100 shadow-sm'
            : 'text-slate-500 border border-transparent'
        )
      }
    >
      <Icon className={cn('flex-shrink-0', isCollapsed ? 'mx-auto w-6 h-6' : 'mr-3 w-5 h-5')} />
      
      {!isCollapsed && <span className="truncate">{label}</span>}
      
      {/* Tooltip for collapsed state */}
      {isCollapsed && (
        <div className="absolute left-full ml-4 px-3 py-1.5 bg-slate-900 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none shadow-xl">
          {label}
        </div>
      )}
    </NavLink>
  );
};

export default SidebarItem;
