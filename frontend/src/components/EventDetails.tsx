import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import OrderButton from "./OrderButton";
import { Event } from "../types/Event";

const EventDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`http://localhost:5000/event/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch event details");
        }
        const data: Event = await response.json();
        setEvent(data);
      } catch (err) {
        console.log(err)
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
      </div>
    );
  if (error) return <p className="text-red-500 text-center">{error}</p>;
  if (!event) return <p className="text-center">Event not found</p>;

  return (
    <div className="p-6 md:p-10  bg-white shadow-lg rounded-sm">
      {/* Event Image */}
      <div className="w-full h-64 md:h-96 bg-cover bg-center rounded-md mb-6" style={{ backgroundImage: `url(${event.image})` }}></div>

      {/* Event Details */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">{event.title}</h1>
        <p className="text-sm text-gray-500 my-3">Price: {event.price || "Free Entry"}</p>

        {/* Event Meta */}
        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
          <div className="flex items-center space-x-2">
            <img className="w-5 h-5" src="https://img.icons8.com/ios/50/calendar--v1.png" alt="calendar icon" />
            <p>{new Date(event.date).toDateString()}</p>
          </div>
          <div className="flex items-center space-x-2">
            <img className="w-5 h-5" src="https://img.icons8.com/carbon-copy/100/ticket.png" alt="ticket icon" />
            <p>Available Tickets: {event.availableTickets}</p>
          </div>
        </div>

        {/* Event Description */}
        <div className="mb-6">
          <p className="text-lg font-semibold text-gray-800 mb-2">Description:</p>
          <p className="text-gray-700 mb-2">{event.shortDescription}</p>
          <p className="text-gray-700">{event.longDescription}</p>
        </div>

        {/* Organizer Info */}
        <div className="mb-6">
          <Link to={`/user/userInfo/${event.adminId}`} className="text-blue-500 underline">
            About The Organizer
          </Link>
        </div>
      </div>

      {/* Order Button */}
      <OrderButton event={event} />
    </div>
  );
};

export default EventDetails;
