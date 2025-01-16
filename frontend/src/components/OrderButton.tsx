import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Event } from "../types/Event";
import { useAuth } from "../context/AuthContext";

interface OrderButtonProps {
  event: Event;
}

const OrderButton: React.FC<OrderButtonProps> = ({ event }) => {
  const { userProfile } = useAuth();
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_REACT_APP_API_KEY;

  const isEventStarted = new Date(event.date).getTime() < new Date().getTime();
  const isSoldOut = event.availableTickets <= 0;

  const incrementQuantity = () =>
    setQuantity((prev) => Math.min(prev + 1, event.availableTickets)); // Max is available tickets

  const decrementQuantity = () => setQuantity((prev) => Math.max(prev - 1, 1)); // Min is 1

  const handleReserve = async () => {
    if (isEventStarted || isSoldOut) return; // Prevent clicking when disabled
    setLoading(true);
    setMessage(null);
    const jwt = localStorage.getItem("jwt");

    if (jwt) {
      try {
        const response = await fetch(`${API_URL}/event/${event.id}/bookings`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${jwt}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: userProfile?.id, quantity }),
        });

        const data = await response.json();
        setMessage(`Successfully reserved ${quantity} ticket(s)!`);
        navigate(`/ticket/${data.id}`);
      } catch (error) {
        setMessage(error instanceof Error ? error.message : "An error occurred.");
      } finally {
        setLoading(false);
      }
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="p-4 rounded-md w-full bg-gray-50">
      <div className="p-4 mb-4 rounded-md bg-slate-200 shadow-md">
        <h3 className="text-lg font-semibold text-gray-800">{event.eventType}</h3>
        <span className="font-medium text-gray-600">Price: {event.price || "Free Entry"}</span>
      </div>

      {/* Quantity Selector */}
      <div className="flex items-center mb-4">
        <button
          className="px-3 py-1 bg-gray-200 text-gray-700 rounded-l-md focus:outline-none hover:bg-gray-300 disabled:opacity-50"
          onClick={decrementQuantity}
          disabled={quantity === 1}
        >
          -
        </button>
        <span className="px-4 py-1 border-t border-b">{quantity}</span>
        <button
          className="px-3 py-1 bg-gray-200 text-gray-700 rounded-r-md focus:outline-none hover:bg-gray-300 disabled:opacity-50"
          onClick={incrementQuantity}
          disabled={quantity >= event.availableTickets} // Disable if quantity reaches available tickets
        >
          +
        </button>
      </div>

      {/* Reserve Button */}
      <button
        onClick={handleReserve}
        disabled={loading || isEventStarted || isSoldOut}
        className={`w-full py-2 font-semibold rounded-md focus:outline-none ${
          loading || isEventStarted || isSoldOut
            ? "bg-gray-400 text-gray-200 cursor-not-allowed"
            : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
      >
        {isEventStarted ? "Event Started" : isSoldOut ? "Sold Out" : loading ? "Processing..." : "Reserve a Spot"}
      </button>

      {/* Status Message */}
      {message && (
        <div
          className={`mt-4 p-2 text-sm rounded-md ${
            message.startsWith("Successfully")
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {message}
        </div>
      )}
    </div>
  );
};

export default OrderButton;
