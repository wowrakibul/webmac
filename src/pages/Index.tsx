
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Monitor, Lock, Cloud, SparkleIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/desktop');
    }
  }, [isAuthenticated, navigate]);
  
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-white to-gray-100">
      <header className="container mx-auto pt-10 px-4">
        <nav className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Monitor className="h-6 w-6 text-primary" />
            <span className="font-medium text-xl">WebMac</span>
          </div>
          <div className="space-x-4">
            <Button
              variant="ghost"
              className="text-gray-700 hover:text-primary"
              onClick={() => navigate('/login')}
            >
              Log In
            </Button>
            <Button
              onClick={() => navigate('/login')}
            >
              Get Started
            </Button>
          </div>
        </nav>
      </header>
      
  
      <main className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block mb-4 px-4 py-1 bg-primary/10 rounded-full">
            <span className="text-primary font-medium text-sm">Your Virtual Mac, Anywhere, Anytime</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Experience macOS in your Browser
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            WebMac combines the familiarity of macOS with modern web technologies to create a personalized, secure digital workspace you can access from any device.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
            <Button
              size="lg"
              className="text-base"
              onClick={() => navigate('/login')}
            >
              Try WebMac Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-base"
            >
              Learn More
            </Button>
          </div>
          
          <div className="relative bg-white shadow-xl rounded-2xl p-2 mb-20 overflow-hidden animate-fade-in">
            <div className="absolute top-0 left-0 right-0 h-7 bg-gray-100 flex items-center px-3">
              <div className="flex items-center space-x-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
            </div>
            <div className="pt-7">
              <img 
                src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=2OOO&auto=format&fit=crop"
                alt="WebMac Desktop" 
                className="w-full h-auto rounded-lg shadow-inner"
              />
            </div>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <Lock className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-medium mb-2">Secure Workspace</h3>
            <p className="text-gray-600">
              Access your files and applications securely from any device, with end-to-end encryption.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <Cloud className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-medium mb-2">Cloud Synced</h3>
            <p className="text-gray-600">
              All your data is automatically synced across devices, so you can pick up where you left off.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <SparkleIcon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-medium mb-2">Familiar Interface</h3>
            <p className="text-gray-600">
              Enjoy the intuitive macOS experience with a dock, finder, and all your favorite apps.
            </p>
          </div>
        </div>
      </main>
      
      <footer className="bg-gray-50 py-10 mt-20">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} WebMac. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
