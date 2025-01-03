import React, { createContext, useContext, useState } from "react";

interface Event {
  id?: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  date: string;
  venue: string;
  eventType: "FREE" | "PAID";
  price?: number;
  availableTickets: number;
  capacity: number;
  admin: string;
  pictureId: string;
  categories: string[];
}

interface EventContextProps {
  events: Event[];
  loading: boolean;
  error: string | null;
  createEvent: (event: Event) => Promise<void>;
  updateEvent: (id: string, event: Event) => Promise<void>;
}

const EventContext = createContext<EventContextProps | undefined>(undefined);

export const EventProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const token = localStorage.getItem("jwt");


  // const API_URL = "https://theevent-i5i1.onrender.com";

  const createEvent = async (event: Event) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("https://theevent-i5i1.onrender.com/event/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(event),
      });
      const newEvent = await response.json();
      setEvents((prev) => [...prev, newEvent]);
    } catch (err: any) {
        console.log(err)
      setError("Error creating event");
    } finally {
      setLoading(false);
    }
  };

  const updateEvent = async (id: string, event: Event) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://theevent-i5i1.onrender.com/events/create_event/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(event),
      });
      const updatedEvent = await response.json();
      setEvents((prev) =>
        prev.map((e) => (e.id === id ? updatedEvent : e))
      );
    } catch (err: any) {
      setError("Error updating event");
    } finally {
      setLoading(false);
    }
  };

  return (
    <EventContext.Provider value={{ events, loading, error, createEvent, updateEvent }}>
      {children}
    </EventContext.Provider>
  );
};

export const useEvent = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error("useEvent must be used within an EventProvider");
  }
  return context;
};
