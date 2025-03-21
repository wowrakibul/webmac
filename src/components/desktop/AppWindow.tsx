
import React, { useState, useRef, useEffect } from 'react';
import { X, Minus, Square } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useApp } from '@/context/AppContext';

type AppWindowProps = {
  appId: string;
  title: string;
  children: React.ReactNode;
  width?: string;
  height?: string;
};

const AppWindow = ({ appId, title, children, width = "w-[800px]", height = "h-[500px]" }: AppWindowProps) => {
  const { closeApp, setActiveApp, state } = useApp();
  const [position, setPosition] = useState({ x: Math.random() * 100, y: Math.random() * 50 });
  const [isDragging, setIsDragging] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const draggableRef = useRef<HTMLDivElement>(null);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const isActive = state.activeApp === appId;
  
  useEffect(() => {
    if (isActive && draggableRef.current) {
      draggableRef.current.style.zIndex = '40';
    } else if (draggableRef.current) {
      draggableRef.current.style.zIndex = '30';
    }
  }, [isActive]);
  
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setActiveApp(appId);
    
    if (draggableRef.current) {
      const rect = draggableRef.current.getBoundingClientRect();
      dragStartPos.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    }
  };
  
  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging && !isFullscreen && draggableRef.current) {
      const newX = e.clientX - dragStartPos.current.x;
      const newY = e.clientY - dragStartPos.current.y;
      
      setPosition({ x: newX, y: newY });
    }
  };
  
  const handleMouseUp = () => {
    setIsDragging(false);
  };
  
  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);
  
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };
  
  return (
    <div
      ref={draggableRef}
      className={cn(
        "absolute glass overflow-hidden rounded-lg shadow-2xl transition-transform animate-scale-up",
        isFullscreen ? "w-full h-[calc(100vh-28px)] top-7 left-0" : cn(width, height),
        {
          "ring-2 ring-primary ring-opacity-20": isActive,
          "opacity-95": !isActive,
        }
      )}
      style={{
        top: isFullscreen ? '28px' : `${position.y}px`,
        left: isFullscreen ? '0' : `${position.x}px`,
      }}
      onClick={() => setActiveApp(appId)}
    >
      <div
        className="h-7 flex items-center px-3 bg-gray-100 border-b border-gray-200"
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center space-x-2 flex-1">
          <div className="flex items-center space-x-1.5">
            <button
              onClick={() => closeApp(appId)}
              className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center group"
            >
              <X className="w-2 h-2 text-red-800 opacity-0 group-hover:opacity-100" />
            </button>
            <button
              className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 flex items-center justify-center group"
            >
              <Minus className="w-2 h-2 text-yellow-800 opacity-0 group-hover:opacity-100" />
            </button>
            <button
              onClick={toggleFullscreen}
              className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center group"
            >
              <Square className="w-2 h-2 text-green-800 opacity-0 group-hover:opacity-100" />
            </button>
          </div>
          <div className="text-xs font-medium text-gray-600 text-center flex-1">
            {title}
          </div>
        </div>
      </div>
      <div className="overflow-auto h-[calc(100%-28px)]">
        {children}
      </div>
    </div>
  );
};

export default AppWindow;
