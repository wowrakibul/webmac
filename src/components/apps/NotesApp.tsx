
import React, { useState, useEffect } from 'react';
import { Plus, Trash } from 'lucide-react';

type Note = {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
};

const NotesApp = () => {
  const [notes, setNotes] = useState<Note[]>(() => {
    const savedNotes = localStorage.getItem('webmac_notes');
    return savedNotes ? JSON.parse(savedNotes) : [
      {
        id: '1',
        title: 'Welcome to Notes',
        content: 'Start writing your first note!',
        createdAt: new Date(),
      },
    ];
  });
  
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(notes[0]?.id || null);
  const [editingContent, setEditingContent] = useState('');
  
  useEffect(() => {
    localStorage.setItem('webmac_notes', JSON.stringify(notes));
  }, [notes]);
  
  useEffect(() => {
    if (selectedNoteId) {
      const note = notes.find((n) => n.id === selectedNoteId);
      if (note) {
        setEditingContent(note.content);
      }
    }
  }, [selectedNoteId, notes]);
  
  const createNewNote = () => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: 'New Note',
      content: '',
      createdAt: new Date(),
    };
    
    setNotes([newNote, ...notes]);
    setSelectedNoteId(newNote.id);
  };
  
  const deleteNote = (id: string) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
    
    if (selectedNoteId === id) {
      setSelectedNoteId(updatedNotes[0]?.id || null);
    }
  };
  
  const updateNoteContent = (content: string) => {
    setEditingContent(content);
    
    if (selectedNoteId) {
      setNotes(
        notes.map((note) =>
          note.id === selectedNoteId
            ? {
                ...note,
                content,
                title: content.split('\n')[0]?.substring(0, 20) || 'Untitled',
              }
            : note
        )
      );
    }
  };
  
  const selectedNote = notes.find((note) => note.id === selectedNoteId);
  
  return (
    <div className="h-full flex">
      <div className="w-48 bg-gray-100 border-r">
        <div className="p-2 border-b flex justify-between items-center">
          <span className="text-sm font-medium">Notes</span>
          <button
            onClick={createNewNote}
            className="text-blue-500 hover:text-blue-700"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
        <div className="overflow-y-auto h-[calc(100%-34px)]">
          {notes.map((note) => (
            <div
              key={note.id}
              className={`p-2 border-b cursor-pointer ${
                selectedNoteId === note.id ? 'bg-blue-50' : 'hover:bg-gray-50'
              }`}
              onClick={() => setSelectedNoteId(note.id)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-sm font-medium truncate">{note.title}</h3>
                  <p className="text-xs text-gray-500 truncate">{note.content.substring(0, 30)}</p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteNote(note.id);
                  }}
                  className="text-gray-400 hover:text-red-500"
                >
                  <Trash className="h-3 w-3" />
                </button>
              </div>
              <p className="text-xs text-gray-400 mt-1">
                {new Date(note.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex-1 bg-white">
        {selectedNote ? (
          <textarea
            value={editingContent}
            onChange={(e) => updateNoteContent(e.target.value)}
            className="w-full h-full p-4 focus:outline-none resize-none"
            placeholder="Start typing..."
          />
        ) : (
          <div className="h-full flex items-center justify-center text-gray-400">
            <p>Select a note or create a new one</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotesApp;
