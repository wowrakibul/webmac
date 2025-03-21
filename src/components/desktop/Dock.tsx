
import React from 'react';
import { 
  FolderHeart, 
  Globe, 
  FileText, 
  Calendar, 
  SquareUser, 
  Music, 
  Image, 
  Settings, 
  Mail, 
  Store 
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

type AppInfo = {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
};

const apps: AppInfo[] = [
  {
    id: 'finder',
    name: 'Finder',
    icon: <FolderHeart size={28} />,
    color: 'bg-blue-400'
  },
  {
    id: 'safari',
    name: 'Safari',
    icon: <Globe size={28} />,
    color: 'bg-blue-500'
  },
  {
    id: 'notes',
    name: 'Notes',
    icon: <FileText size={28} />,
    color: 'bg-yellow-400'
  },
  {
    id: 'calendar',
    name: 'Calendar',
    icon: <Calendar size={28} />,
    color: 'bg-red-400'
  },
  {
    id: 'photos',
    name: 'Photos',
    icon: <Image size={28} />,
    color: 'bg-purple-400'
  },
  {
    id: 'contacts',
    name: 'Contacts',
    icon: <SquareUser size={28} />,
    color: 'bg-green-400'
  },
  {
    id: 'music',
    name: 'Music',
    icon: <Music size={28} />,
    color: 'bg-pink-400'
  },
  {
    id: 'mail',
    name: 'Mail',
    icon: <Mail size={28} />,
    color: 'bg-blue-300'
  },
  {
    id: 'store',
    name: 'App Store',
    icon: <Store size={28} />,
    color: 'bg-blue-600'
  },
  {
    id: 'settings',
    name: 'System Preferences',
    icon: <Settings size={28} />,
    color: 'bg-gray-400'
  }
];

const Dock = () => {
  const { openApp, state } = useApp();
  
  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-40">
      <div className="dock-glass px-2 py-1 rounded-2xl flex items-end space-x-1">
        <TooltipProvider delayDuration={300}>
          {apps.map((app) => {
            const isActive = state.openApps.includes(app.id);
            
            return (
              <Tooltip key={app.id}>
                <TooltipTrigger asChild>
                  <button
                    className={cn(
                      "relative flex items-center justify-center rounded-xl p-2 transition-all duration-300 hover:scale-110 focus:outline-none",
                      {
                        "scale-105": isActive
                      }
                    )}
                    onClick={() => openApp(app.id)}
                  >
                    <div className={cn("rounded-xl p-2", app.color)}>
                      {app.icon}
                    </div>
                    {isActive && (
                      <div className="absolute -bottom-1 w-1 h-1 bg-white rounded-full" />
                    )}
                  </button>
                </TooltipTrigger>
                <TooltipContent side="top" className="mb-2">
                  {app.name}
                </TooltipContent>
              </Tooltip>
            );
          })}
        </TooltipProvider>
      </div>
    </div>
  );
};

export default Dock;
