import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the types for booking and context
interface BookingRequest {
  id: string; // Event ID
  userId: string;
  quantity: number;
  totalAmount?: number;
}

interface BookingResponse {
  id: string;
  eventId: string;
  userId: string;
  quantity: number;
  totalAmount?: number;
  createdAt: string;
}

interface EventBookingContextType {
  bookEvent: (bookingRequest: BookingRequest) => Promise<BookingResponse | null>;
  loading: boolean;
  error: string | null;
}

// Create the context
const EventBookingContext = createContext<EventBookingContextType | undefined>(
  undefined
);

// Provider component
export const EventBookingProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const bookEvent = async (
    bookingRequest: BookingRequest
  ): Promise<BookingResponse | null> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://your-api-url.com/event/${bookingRequest.id}/book`, // Adjust the URL
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: bookingRequest.userId,
            quantity: bookingRequest.quantity,
            totalAmount: bookingRequest.totalAmount,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to book event.");
      }

      const data: BookingResponse = await response.json();
      return data;
    } catch (err: unknown) {
      setError((err as Error).message || "An unexpected error occurred.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return (
    <EventBookingContext.Provider value={{ bookEvent, loading, error }}>
      {children}
    </EventBookingContext.Provider>
  );
};

// Custom hook to use the context
export const useEventBooking = (): EventBookingContextType => {
  const context = useContext(EventBookingContext);
  if (!context) {
    throw new Error(
      "useEventBooking must be used within an EventBookingProvider"
    );
  }
  return context;
};
