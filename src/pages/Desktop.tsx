import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useApp } from '@/context/AppContext';
import MenuBar from '@/components/desktop/MenuBar';
import Dock from '@/components/desktop/Dock';
import AppWindow from '@/components/desktop/AppWindow';

// App content components
import FinderApp from '@/components/apps/FinderApp';
import NotesApp from '@/components/apps/NotesApp';
import CalendarApp from '@/components/apps/CalendarApp';
import SafariApp from '@/components/apps/SafariApp';
import PhotosApp from '@/components/apps/PhotosApp';
import SettingsApp from '@/components/apps/SettingsApp';

const Desktop = () => {
  const { isAuthenticated } = useAuth();
  const { state } = useApp();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);
  
  const renderApps = () => {
    return (
      <>
        {state.openApps.includes('finder') && (
          <AppWindow
            appId="finder"
            title="Finder"
            width="w-[700px]"
            height="h-[450px]"
          >
            <FinderApp />
          </AppWindow>
        )}
        
        {state.openApps.includes('notes') && (
          <AppWindow
            appId="notes"
            title="Notes"
            width="w-[500px]"
            height="h-[400px]"
          >
            <NotesApp />
          </AppWindow>
        )}
        
        {state.openApps.includes('calendar') && (
          <AppWindow
            appId="calendar"
            title="Calendar"
            width="w-[800px]"
            height="h-[500px]"
          >
            <CalendarApp />
          </AppWindow>
        )}
        
        {state.openApps.includes('safari') && (
          <AppWindow
            appId="safari"
            title="Safari"
            width="w-[900px]"
            height="h-[600px]"
          >
            <SafariApp />
          </AppWindow>
        )}
        
        {state.openApps.includes('photos') && (
          <AppWindow
            appId="photos"
            title="Photos"
            width="w-[700px]"
            height="h-[500px]"
          >
            <PhotosApp />
          </AppWindow>
        )}
        
        {state.openApps.includes('settings') && (
          <AppWindow
            appId="settings"
            title="System Preferences"
            width="w-[650px]"
            height="h-[450px]"
          >
            <SettingsApp />
          </AppWindow>
        )}
        
        {/* Other app windows would be conditionally rendered here */}
      </>
    );
  };
  
  return (
    <div
      className="min-h-screen w-full overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: `url(${state.wallpaper})` }}
    >
      <MenuBar />
      
      <div className="pt-7 h-screen w-full relative">
        {renderApps()}
      </div>
      
      <Dock />
    </div>
  );
};

export default Desktop;
