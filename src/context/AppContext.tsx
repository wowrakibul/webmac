
import React, { createContext, useContext, useState, useEffect } from 'react';

type AppState = {
  wallpaper: string;
  openApps: string[];
  activeApp: string | null;
  brightness: number;
  volume: number;
  dock: {
    position: 'bottom' | 'left' | 'right';
    magnification: boolean;
  };
};

type AppContextType = {
  state: AppState;
  openApp: (appId: string) => void;
  closeApp: (appId: string) => void;
  setActiveApp: (appId: string | null) => void;
  updateSettings: (settings: Partial<AppState>) => void;
  setWallpaper: (wallpaper: string) => void;
};

const defaultAppState: AppState = {
  wallpaper: 'https://images.unsplash.com/photo-1491002052546-bf38f186af56?q=80&w=2108&auto=format&fit=crop',
  openApps: [],
  activeApp: null,
  brightness: 80,
  volume: 50,
  dock: {
    position: 'bottom',
    magnification: true,
  },
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AppState>(() => {
    const savedState = localStorage.getItem('webmac_app_state');
    return savedState ? JSON.parse(savedState) : defaultAppState;
  });

  useEffect(() => {
    localStorage.setItem('webmac_app_state', JSON.stringify(state));
  }, [state]);

  const openApp = (appId: string) => {
    setState(prev => ({
      ...prev,
      openApps: prev.openApps.includes(appId) 
        ? prev.openApps 
        : [...prev.openApps, appId],
      activeApp: appId,
    }));
  };

  const closeApp = (appId: string) => {
    setState(prev => {
      const newOpenApps = prev.openApps.filter(id => id !== appId);
      return {
        ...prev,
        openApps: newOpenApps,
        activeApp: prev.activeApp === appId 
          ? (newOpenApps.length > 0 ? newOpenApps[newOpenApps.length - 1] : null) 
          : prev.activeApp,
      };
    });
  };

  const setActiveApp = (appId: string | null) => {
    setState(prev => ({
      ...prev,
      activeApp: appId,
    }));
  };

  const updateSettings = (settings: Partial<AppState>) => {
    setState(prev => ({
      ...prev,
      ...settings,
    }));
  };

  const setWallpaper = (wallpaper: string) => {
    setState(prev => ({
      ...prev,
      wallpaper,
    }));
  };

  return (
    <AppContext.Provider
      value={{
        state,
        openApp,
        closeApp,
        setActiveApp,
        updateSettings,
        setWallpaper,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
