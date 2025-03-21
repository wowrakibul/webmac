
import React, { useState, useEffect } from 'react';
import { 
  User, 
  Monitor, 
  Volume2, 
  Wifi, 
  Bluetooth, 
  CloudRain, 
  Globe, 
  Lock, 
  BellRing,
  CheckCircle
} from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { useApp } from '@/context/AppContext';
import { useAuth } from '@/context/AuthContext';

const backgroundOptions = [
  'https://images.unsplash.com/photo-1491002052546-bf38f186af56?q=80&w=2108&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2070&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1616567214738-22e5a34b7cb6?q=80&w=2070&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2070&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1451337516015-6b6e9a44a8a3?q=80&w=2074&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1620121692029-d088224ddc74?q=80&w=2832&auto=format&fit=crop',
];

type SettingCategory = {
  name: string;
  icon: React.ReactNode;
};

const categories: SettingCategory[] = [
  { name: 'Apple ID', icon: <User className="h-5 w-5" /> },
  { name: 'Display', icon: <Monitor className="h-5 w-5" /> },
  { name: 'Sound', icon: <Volume2 className="h-5 w-5" /> },
  { name: 'Wi-Fi', icon: <Wifi className="h-5 w-5" /> },
  { name: 'Bluetooth', icon: <Bluetooth className="h-5 w-5" /> },
  { name: 'Wallpaper', icon: <CloudRain className="h-5 w-5" /> },
  { name: 'General', icon: <Globe className="h-5 w-5" /> },
  { name: 'Security', icon: <Lock className="h-5 w-5" /> },
  { name: 'Notifications', icon: <BellRing className="h-5 w-5" /> },
];

const SettingsApp = () => {
  const { state, updateSettings, setWallpaper } = useApp();
  const { user } = useAuth();
  const [activeCategory, setActiveCategory] = useState('Wallpaper');
  const [brightness, setBrightness] = useState(state.brightness);
  const [volume, setVolume] = useState(state.volume);
  const [notifications, setNotifications] = useState(true);
  const [magnification, setMagnification] = useState(state.dock.magnification);
  
  useEffect(() => {
    updateSettings({ 
      brightness, 
      volume,
      dock: { 
        ...state.dock, 
        magnification 
      } 
    });
  }, [brightness, volume, magnification]);
  
  const renderCategoryContent = () => {
    switch (activeCategory) {
      case 'Apple ID':
        return (
          <div>
            <div className="mb-6 flex items-center space-x-4">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-medium">
                {user?.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 className="text-lg font-medium">{user?.name}</h3>
                <p className="text-sm text-gray-500">{user?.email}</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="text-sm font-medium mb-2">Account Security</h4>
                <p className="text-xs text-gray-500 mb-4">Manage your passwords and security settings.</p>
                <button className="text-sm text-primary hover:underline">
                  Change Password
                </button>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="text-sm font-medium mb-2">Personal Information</h4>
                <p className="text-xs text-gray-500 mb-4">Update your name, email and other personal details.</p>
                <button className="text-sm text-primary hover:underline">
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
        );
        
      case 'Display':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium mb-2">Brightness</h3>
              <div className="flex items-center space-x-4">
                <Monitor className="h-4 w-4 text-gray-400" />
                <Slider
                  value={[brightness]}
                  min={0}
                  max={100}
                  step={1}
                  onValueChange={(value) => setBrightness(value[0])}
                  className="flex-1"
                />
                <Monitor className="h-5 w-5" />
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Appearance</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-white border rounded-lg flex items-center justify-center flex-col">
                  <div className="w-12 h-12 bg-white border rounded-md mb-2 flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-xs">Light</span>
                </div>
                
                <div className="p-4 bg-gray-900 border border-gray-700 rounded-lg flex items-center justify-center flex-col">
                  <div className="w-12 h-12 bg-gray-800 border border-gray-700 rounded-md mb-2"></div>
                  <span className="text-xs text-white">Dark</span>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'Sound':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium mb-2">Volume</h3>
              <div className="flex items-center space-x-4">
                <Volume2 className="h-4 w-4 text-gray-400" />
                <Slider
                  value={[volume]}
                  min={0}
                  max={100}
                  step={1}
                  onValueChange={(value) => setVolume(value[0])}
                  className="flex-1"
                />
                <Volume2 className="h-5 w-5" />
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Sound Effects</h3>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm">Play sound on startup</label>
                  <Switch />
                </div>
                
                <div className="flex items-center justify-between">
                  <label className="text-sm">Play sound effects</label>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <label className="text-sm">Play feedback when volume changes</label>
                  <Switch />
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'Wallpaper':
        return (
          <div>
            <h3 className="text-sm font-medium mb-4">Choose Wallpaper</h3>
            
            <div className="grid grid-cols-3 gap-4">
              {backgroundOptions.map((bg, index) => (
                <button
                  key={index}
                  className={`relative aspect-video overflow-hidden rounded-md hover:ring-2 hover:ring-primary transition-shadow ${
                    state.wallpaper === bg ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => setWallpaper(bg)}
                >
                  <img 
                    src={bg} 
                    alt={`Wallpaper ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  {state.wallpaper === bg && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                      <CheckCircle className="h-6 w-6 text-white" />
                    </div>
                  )}
                </button>
              ))}
            </div>
            
            <div className="mt-6">
              <h3 className="text-sm font-medium mb-4">Dock Settings</h3>
              
              <div className="flex items-center justify-between">
                <label className="text-sm">Enable magnification</label>
                <Switch 
                  checked={magnification}
                  onCheckedChange={setMagnification}
                />
              </div>
            </div>
          </div>
        );
        
      case 'Notifications':
        return (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-medium">Notifications</h3>
              <Switch 
                checked={notifications}
                onCheckedChange={setNotifications}
              />
            </div>
            
            <div className="space-y-4">
              {['Calendar', 'Mail', 'Notes', 'Safari', 'Photos'].map((app) => (
                <div key={app} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm">{app}</div>
                  <Switch defaultChecked={app !== 'Safari'} />
                </div>
              ))}
            </div>
            
            <div className="mt-6">
              <h4 className="text-sm font-medium mb-2">Notification Style</h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-gray-50 rounded-lg flex flex-col items-center">
                  <div className="w-full h-12 bg-white rounded-md mb-2 border flex items-center justify-center">
                    <span className="text-xs">Banner</span>
                  </div>
                  <CheckCircle className="h-4 w-4 text-primary" />
                </div>
                <div className="p-3 bg-gray-50 rounded-lg flex flex-col items-center">
                  <div className="w-full h-12 bg-white rounded-md mb-2 border flex items-center justify-center">
                    <span className="text-xs">Alert</span>
                  </div>
                  <div className="h-4 w-4"></div>
                </div>
              </div>
            </div>
          </div>
        );
        
      default:
        return (
          <div className="h-full flex flex-col items-center justify-center text-gray-400">
            <p>Select a category from the sidebar</p>
          </div>
        );
    }
  };

  return (
    <div className="h-full flex">
      <div className="w-48 bg-gray-100 border-r p-2 overflow-y-auto">
        <div className="space-y-1">
          {categories.map((category) => (
            <button
              key={category.name}
              className={`w-full flex items-center space-x-2 px-3 py-2 rounded-md text-sm text-left ${
                activeCategory === category.name
                  ? 'bg-primary text-white'
                  : 'hover:bg-gray-200'
              }`}
              onClick={() => setActiveCategory(category.name)}
            >
              {category.icon}
              <span>{category.name}</span>
            </button>
          ))}
        </div>
      </div>
      
      <div className="flex-1 p-4 overflow-y-auto">
        <h2 className="text-xl font-medium mb-4">{activeCategory}</h2>
        {renderCategoryContent()}
      </div>
    </div>
  );
};

export default SettingsApp;
