import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // To get the booking ID from the URL

const TicketPage: React.FC = () => {
  const { bookingId } = useParams<{ bookingId: string }>(); // Extract the booking ID from URL
  const [bookingData, setBookingData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookingData = async () => {
      const id = bookingId;
  console.log(id)

      try {
        const response = await fetch(
          `http://localhost:5000/event/getBooking/id=${id}`, // Assuming the backend route to fetch booking details by ID
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwt")?.toString()}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch booking details");
        }

        const data = await response.json();
        setBookingData(data);
      } catch (error) {
        console.log(id)

        setError(error instanceof Error ? error.message : "An error occurred.");
      } finally {
        setLoading(false);
      }
    };

    if (bookingId) {
      fetchBookingData();
    }
  }, [bookingId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!bookingData) {
    return <div>No booking data found</div>;
  }

  return (
    <div className="p-4 rounded-md w-full bg-gray-50">
      <div className="p-4 mb-4 rounded-md bg-slate-200 shadow-md">
        <h3 className="text-lg font-semibold text-gray-800">
          Booking Confirmation
        </h3>
        <div className="text-gray-600">
          <p>Event: {bookingData.event.title}</p>
          <p>Date: {new Date(bookingData.event.date).toLocaleString()}</p>
          <p>Venue: {bookingData.event.venue}</p>
          <p>Price: {bookingData.event.price || "Free Entry"}</p>
        </div>
      </div>

      <div className="p-4 mb-4 rounded-md bg-slate-100">
        <h4 className="text-md font-semibold text-gray-700">Your Booking</h4>
        <p>Tickets Reserved: {bookingData.quantity}</p>
        <p>Total Amount: {bookingData.totalAmount}</p>
        <p>Customer: {bookingData.user.name}</p>
      </div>

      <div className="mt-4 p-2 text-center text-sm text-gray-600">
        <button
          onClick={() => window.location.href = '/events'}
          className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Go Back to Events
        </button>
      </div>
    </div>
  );
};

export default TicketPage;
