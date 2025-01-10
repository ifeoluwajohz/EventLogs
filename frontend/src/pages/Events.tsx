import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

interface Event {
  id: string;
  title: string;
  date: string;
  venue: string;
  description: string;
  imageUrl: string;
}

const Events: React.FC = () => {
  const { userProfile } = useAuth();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const fetchBookings = async () => {
    if (!userProfile?.id) return;

    try {
      const response = await fetch(
        `https://theevent-i5i1.onrender.com/event/${userProfile.id}/bookedAll`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch booking details");
      }

      const data = await response.json();
      setEvents(data.map((booking: any) => booking.event));
    } catch (error) {
      console.error(error);
      setError(error instanceof Error ? error.message : "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const deleteAllBookings = async () => {
    if (!userProfile?.id) return;

    const confirmed = window.confirm("Are you sure you want to delete all bookings?");
    if (!confirmed) return;

    try {
      const response = await fetch(
        `https://theevent-i5i1.onrender.com/event/${userProfile.id}/bookedDelete`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete bookings");
      }

      setEvents([]); // Clear the events after successful deletion
      alert("All bookings have been deleted.");
    } catch (error) {
      console.error(error);
      alert(error instanceof Error ? error.message : "An error occurred.");
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [userProfile]);

  if (loading) return <div className="text-center py-10">Loading events...</div>;
  if (error) return <div className="text-center text-red-500 py-10">{error}</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
        Your Booked Events
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div
            key={event.id}
            className="bg-white shadow-lg rounded-lg hover:shadow-xl transition duration-300 cursor-pointer"
            onClick={() => navigate(`/event/${event.id}`)}
          >
            <img
              src={event.imageUrl}
              alt={event.title}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {event.title}
              </h2>
              <p className="text-sm text-gray-600 mb-2">
                {new Date(event.date).toLocaleDateString()} at {event.venue}
              </p>
              <p className="text-sm text-gray-600 truncate">{event.description}</p>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={deleteAllBookings}
        className="bg-red-500 text-white px-4 py-2 rounded-md mt-10 block mx-auto hover:bg-red-600 transition duration-300"
      >
        Delete All Ticket ?
      </button>
    </div>
  );
};

export default Events;
