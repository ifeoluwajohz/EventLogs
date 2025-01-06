import React, { createContext, useContext, useState, useEffect } from "react";

// Event Interface
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

// Context Props
interface EventContextProps {
  events: Event[] | null;
  loading: boolean;
  error: string | null;
  location: string;
  setLocation: (location: string) => void;
  createEvent: (event: Event) => Promise<void>;
  updateEvent: (id: string, event: Event) => Promise<void>;
  fetchEventsByLocation: (searchLocation: string) => Promise<void>;
  fetchCurrentLocation: () => Promise<void>;
}

// Create Context
const EventContext = createContext<EventContextProps | undefined>(undefined);

// EventProvider Component
export const EventProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<Event[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [location, setLocation] = useState<string>("");

  const token = localStorage.getItem("jwt");

  // API Base URL
  const API_URL = "http://localhost:5000";

  // Fetch Events by Location
  const fetchEventsByLocation = async (searchLocation: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/search/byLocation/?location=${searchLocation}`);
      const data: Event[] = await response.json();
      setEvents(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch Current Location
  const fetchCurrentLocation = async () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await fetch(
            `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=ca38854e4bde4792bca2d07f11fdfbb2`
          );
          const data = await response.json();
          if (data.results && data.results.length > 0) {
            const locationName = data.results[0].formatted;
            setLocation(locationName);
            fetchEventsByLocation(locationName);
          } else {
            setError("Could not determine your location name.");
          }
        } catch (err) {
          setError("Error fetching location details.");
        }
      },
      () => {
        setError("Unable to retrieve location. Please try again.");
      }
    );
  };

  // Create Event
  const createEvent = async (event: Event) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/event/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(event),
      });
      const newEvent = await response.json();
      setEvents((prev) => (prev ? [...prev, newEvent] : [newEvent]));
    } catch (err: any) {
      setError("Error creating event");
    } finally {
      setLoading(false);
    }
  };

  // Update Event
  const updateEvent = async (id: string, event: Event) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/events/create_event/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(event),
      });
      const updatedEvent = await response.json();
      setEvents((prev) =>
        prev ? prev.map((e) => (e.id === id ? updatedEvent : e)) : [updatedEvent]
      );
    } catch (err: any) {
      setError("Error updating event");
    } finally {
      setLoading(false);
    }
  };

  return (
    <EventContext.Provider
      value={{
        events,
        loading,
        error,
        location,
        setLocation,
        createEvent,
        updateEvent,
        fetchEventsByLocation,
        fetchCurrentLocation,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

// Custom Hook
export const useEvent = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error("useEvent must be used within an EventProvider");
  }
  return context;
};
