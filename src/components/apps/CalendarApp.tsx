
import React, { useState } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';

type Event = {
  id: string;
  title: string;
  date: Date;
  time?: string;
  description?: string;
};

const CalendarApp = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [events, setEvents] = useState<Event[]>([
    {
      id: '1',
      title: 'Team Meeting',
      date: new Date(),
      time: '10:00 AM',
      description: 'Weekly team meeting to discuss project progress.'
    },
    {
      id: '2',
      title: 'Coffee with Sam',
      date: new Date(new Date().setDate(new Date().getDate() + 2)),
      time: '3:30 PM',
      description: 'Catch up at Starbucks'
    }
  ]);
  
  const todayEvents = events.filter(
    (event) => event.date.toDateString() === date.toDateString()
  );

  return (
    <div className="h-full flex">
      <div className="w-80 border-r p-4 bg-white">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold flex items-center">
            <CalendarIcon className="h-5 w-5 mr-2" />
            Calendar
          </h2>
          <div className="flex">
            <button className="p-1 rounded-full hover:bg-gray-100">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button className="p-1 rounded-full hover:bg-gray-100">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        <Calendar
          mode="single"
          selected={date}
          onSelect={(date) => date && setDate(date)}
          className="rounded-md border shadow"
        />
        
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Upcoming Events</h3>
          <div className="space-y-2">
            {events.slice(0, 3).map((event) => (
              <div key={event.id} className="p-2 bg-gray-50 rounded-md text-xs">
                <div className="font-medium">{event.title}</div>
                <div className="text-gray-500">
                  {event.date.toLocaleDateString()} {event.time}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="flex-1 p-4 bg-white">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-medium">
            {date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </h2>
          <button className="flex items-center text-sm text-primary hover:text-primary/80">
            <Plus className="h-4 w-4 mr-1" />
            Add Event
          </button>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4 h-[calc(100%-60px)] overflow-y-auto">
          {todayEvents.length > 0 ? (
            <div className="space-y-3">
              {todayEvents.map((event) => (
                <div key={event.id} className="p-3 bg-white rounded-md shadow-sm">
                  <div className="flex justify-between">
                    <h3 className="font-medium">{event.title}</h3>
                    <span className="text-sm text-primary">{event.time}</span>
                  </div>
                  {event.description && (
                    <p className="text-sm text-gray-500 mt-1">{event.description}</p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-gray-400">
              <CalendarIcon className="h-12 w-12 mb-2 opacity-20" />
              <p>No events scheduled for today</p>
              <button className="mt-2 text-sm text-primary hover:underline">
                Add your first event
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CalendarApp;
