
import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, RefreshCw, Search, BookmarkIcon, Star } from 'lucide-react';

const SafariApp = () => {
  const [url, setUrl] = useState('https://lovable.dev');
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate loading
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };
  
  return (
    <div className="h-full flex flex-col">
      <div className="p-2 border-b bg-gray-50 flex items-center space-x-2">
        <button className="p-1 rounded hover:bg-gray-200">
          <ArrowLeft className="h-4 w-4 text-gray-600" />
        </button>
        <button className="p-1 rounded hover:bg-gray-200">
          <ArrowRight className="h-4 w-4 text-gray-600" />
        </button>
        <button className="p-1 rounded hover:bg-gray-200">
          <RefreshCw className={`h-4 w-4 text-gray-600 ${isLoading ? 'animate-spin' : ''}`} />
        </button>
        
        <form onSubmit={handleSubmit} className="flex-1 flex items-center">
          <div className="relative w-full">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-gray-400" />
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full pl-8 pr-2 py-1 bg-gray-200 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder="Search or enter website name"
            />
          </div>
        </form>
        
        <button className="p-1 rounded hover:bg-gray-200">
          <BookmarkIcon className="h-4 w-4 text-gray-600" />
        </button>
        <button className="p-1 rounded hover:bg-gray-200">
          <Star className="h-4 w-4 text-gray-600" />
        </button>
      </div>
      
      <div className="flex-1 bg-white">
        <iframe 
          src={url.startsWith('http') ? url : `https://${url}`}
          className="w-full h-full border-none"
          title="Safari Browser"
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default SafariApp;
