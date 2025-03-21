
import React, { useState, useEffect } from 'react';
import { 
  Apple, 
  Wifi, 
  Volume2, 
  Battery, 
  Search, 
  BellRing, 
  ChevronDown 
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const MenuBar = () => {
  const { user, logout } = useAuth();
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      setCurrentDate(now.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' }));
    };
    
    updateTime();
    const interval = setInterval(updateTime, 60000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="menu-glass py-1 px-4 flex items-center justify-between w-full h-7 fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center space-x-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="focus:outline-none">
              <Apple className="h-4 w-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            <DropdownMenuLabel>WebMac</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>About WebMac</DropdownMenuItem>
            <DropdownMenuItem>System Preferences</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>App Store</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Recent Items</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Force Quit</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Sleep</DropdownMenuItem>
            <DropdownMenuItem>Restart</DropdownMenuItem>
            <DropdownMenuItem onClick={logout}>Shut Down</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout}>Log Out {user?.name}</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <span className="text-xs font-semibold">Finder</span>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="text-xs hover:bg-black/5 rounded px-2 py-0.5 focus:outline-none">
              File
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            <DropdownMenuItem>New Folder</DropdownMenuItem>
            <DropdownMenuItem>New Finder Window</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Close Window</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="text-xs hover:bg-black/5 rounded px-2 py-0.5 focus:outline-none">
              Edit
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            <DropdownMenuItem>Undo</DropdownMenuItem>
            <DropdownMenuItem>Redo</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Cut</DropdownMenuItem>
            <DropdownMenuItem>Copy</DropdownMenuItem>
            <DropdownMenuItem>Paste</DropdownMenuItem>
            <DropdownMenuItem>Select All</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="text-xs hover:bg-black/5 rounded px-2 py-0.5 focus:outline-none">
              View
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            <DropdownMenuItem>as Icons</DropdownMenuItem>
            <DropdownMenuItem>as List</DropdownMenuItem>
            <DropdownMenuItem>as Columns</DropdownMenuItem>
            <DropdownMenuItem>as Gallery</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-1">
          <Wifi className="h-4 w-4" />
          <Battery className="h-4 w-4" />
          <Volume2 className="h-4 w-4" />
          <Search className="h-4 w-4" />
          <BellRing className="h-4 w-4" />
        </div>
        
        <div className="flex items-center">
          <div className="text-xs text-gray-800">{currentDate} {currentTime}</div>
        </div>
      </div>
    </div>
  );
};

export default MenuBar;
