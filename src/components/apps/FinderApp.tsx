
import React from 'react';
import { Folder, FileText, Image, Music, Film, Download } from 'lucide-react';

const FinderApp = () => {
  return (
    <div className="h-full flex">
      <div className="w-48 bg-gray-100 border-r p-2">
        <div className="text-sm font-medium text-gray-500 mb-2 px-2">Favorites</div>
        <div className="space-y-1">
          {[
            { name: 'Applications', icon: <Folder className="h-4 w-4 text-blue-500" /> },
            { name: 'Documents', icon: <FileText className="h-4 w-4 text-blue-400" /> },
            { name: 'Pictures', icon: <Image className="h-4 w-4 text-purple-400" /> },
            { name: 'Music', icon: <Music className="h-4 w-4 text-pink-400" /> },
            { name: 'Movies', icon: <Film className="h-4 w-4 text-orange-400" /> },
            { name: 'Downloads', icon: <Download className="h-4 w-4 text-yellow-500" /> },
          ].map((item) => (
            <div 
              key={item.name}
              className="flex items-center space-x-2 px-2 py-1 rounded hover:bg-gray-200 cursor-pointer text-sm"
            >
              {item.icon}
              <span>{item.name}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex-1 bg-white p-4">
        <div className="grid grid-cols-4 gap-4">
          {['Documents', 'Pictures', 'Music', 'Movies', 'Downloads', 'Applications', 'Desktop', 'WebMac Projects'].map((folder) => (
            <div key={folder} className="flex flex-col items-center justify-center p-2 hover:bg-gray-100 rounded cursor-pointer">
              <Folder className="w-16 h-16 text-blue-500 mb-1" />
              <span className="text-xs text-center">{folder}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FinderApp;
