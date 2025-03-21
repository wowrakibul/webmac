
import React, { useState } from 'react';
import { Grid, Columns, List, Image as ImageIcon, Upload } from 'lucide-react';

const defaultPhotos = [
  { id: 1, url: 'https://images.unsplash.com/photo-1682695797873-aa4a8bc1a4c9?q=80&w=2670&auto=format&fit=crop', title: 'Beach Sunset' },
  { id: 2, url: 'https://images.unsplash.com/photo-1682687220199-d0125d18e631?q=80&w=2670&auto=format&fit=crop', title: 'Mountain View' },
  { id: 3, url: 'https://images.unsplash.com/photo-1682687220067-dced9a881b56?q=80&w=2670&auto=format&fit=crop', title: 'City Skyline' },
  { id: 4, url: 'https://images.unsplash.com/photo-1693084187129-5c5d9e0667f7?q=80&w=2574&auto=format&fit=crop', title: 'Forest Trail' },
  { id: 5, url: 'https://images.unsplash.com/photo-1693035647268-52e5ec37078c?q=80&w=2670&auto=format&fit=crop', title: 'Lake Reflection' },
  { id: 6, url: 'https://images.unsplash.com/photo-1693160032330-2d02fbddd469?q=80&w=2670&auto=format&fit=crop', title: 'Desert Oasis' },
];

type Photo = {
  id: number;
  url: string;
  title: string;
};

type ViewMode = 'grid' | 'columns' | 'list';

const PhotosApp = () => {
  const [photos, setPhotos] = useState<Photo[]>(defaultPhotos);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    
    // For each file, create a new photo object
    Array.from(files).forEach((file) => {
      const fileUrl = URL.createObjectURL(file);
      const newPhoto: Photo = {
        id: Date.now() + Math.random(),
        url: fileUrl,
        title: file.name,
      };
      
      setPhotos((prev) => [newPhoto, ...prev]);
    });
  };
  
  return (
    <div className="h-full flex flex-col">
      <div className="p-2 border-b bg-gray-50 flex items-center justify-between">
        <div className="flex items-center space-x-1">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-1 rounded ${viewMode === 'grid' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
          >
            <Grid className="h-4 w-4" />
          </button>
          <button
            onClick={() => setViewMode('columns')}
            className={`p-1 rounded ${viewMode === 'columns' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
          >
            <Columns className="h-4 w-4" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-1 rounded ${viewMode === 'list' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
          >
            <List className="h-4 w-4" />
          </button>
        </div>
        
        <div>
          <input
            type="file"
            id="photo-upload"
            multiple
            accept="image/*"
            className="hidden"
            onChange={handleFileUpload}
          />
          <label
            htmlFor="photo-upload"
            className="flex items-center text-sm text-primary hover:text-primary/80 cursor-pointer"
          >
            <Upload className="h-4 w-4 mr-1" />
            Upload Photos
          </label>
        </div>
      </div>
      
      {selectedPhoto ? (
        <div className="flex-1 flex flex-col">
          <div className="p-2 bg-black flex justify-between">
            <button
              onClick={() => setSelectedPhoto(null)}
              className="text-white text-sm"
            >
              Back to Gallery
            </button>
            <div className="text-white text-sm">{selectedPhoto.title}</div>
          </div>
          <div 
            className="flex-1 bg-black flex items-center justify-center"
            onClick={() => setSelectedPhoto(null)}
          >
            <img
              src={selectedPhoto.url}
              alt={selectedPhoto.title}
              className="max-h-full max-w-full object-contain"
            />
          </div>
        </div>
      ) : (
        <div className="flex-1 p-4 overflow-auto">
          {photos.length > 0 ? (
            <div className={`
              ${viewMode === 'grid' ? 'grid grid-cols-3 gap-4' : ''}
              ${viewMode === 'columns' ? 'columns-3 gap-4' : ''}
              ${viewMode === 'list' ? 'flex flex-col space-y-4' : ''}
            `}>
              {photos.map((photo) => (
                <div
                  key={photo.id}
                  className={`
                    group relative overflow-hidden rounded-md cursor-pointer
                    ${viewMode === 'list' ? 'flex items-center space-x-3 p-2 hover:bg-gray-50' : ''}
                  `}
                  onClick={() => setSelectedPhoto(photo)}
                >
                  <img
                    src={photo.url}
                    alt={photo.title}
                    className={`
                      ${viewMode === 'grid' || viewMode === 'columns' ? 'w-full h-auto object-cover aspect-square' : 'w-16 h-16 object-cover'}
                      rounded-md transition-transform group-hover:scale-105
                    `}
                  />
                  {viewMode === 'list' && (
                    <div>
                      <h3 className="font-medium">{photo.title}</h3>
                    </div>
                  )}
                  {(viewMode === 'grid' || viewMode === 'columns') && (
                    <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="text-white text-xs truncate">{photo.title}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-gray-400">
              <ImageIcon className="h-12 w-12 mb-2 opacity-20" />
              <p>No photos in your library</p>
              <label
                htmlFor="photo-upload"
                className="mt-2 text-sm text-primary hover:underline cursor-pointer"
              >
                Upload your first photo
              </label>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PhotosApp;
