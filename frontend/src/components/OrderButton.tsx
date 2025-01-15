import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Use useNavigate instead of useHistory
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
  const navigate = useNavigate(); // Create navigate function

  const incrementQuantity = () => setQuantity((prev) => Math.min(prev + 1, 10)); // Max 10 tickets
  const decrementQuantity = () => setQuantity((prev) => Math.max(prev - 1, 1)); // Min 1 ticket
  console.log(event.id)

  const handleReserve = async () => {
    setLoading(true);
    setMessage(null);
    const jwt = localStorage.getItem("jwt")

    if(jwt){
      try {
      
        const response = await fetch(`https://theevent-i5i1.onrender.com/event/${event.id}/bookings`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")?.toString()}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: userProfile?.id,
            quantity,
          }),
        });
  
        // if (!response.ok) {
        //   throw new Error("Failed to reserve tickets");
        // }
  
        const data = await response.json();
        console.log(data);
        setMessage(`Successfully reserved ${quantity} tickets!`);
  
        // Redirect to the TicketPage with the booking ID
        navigate(`/ticket/${data.id}`); // Using navigate to redirect
      } catch (error) {
        console.log(error);
        setMessage(error instanceof Error ? error.message : "An error occurred.");
      } finally {
        setLoading(false);
      }
    }
    else{
      navigate("/login")
      console.log("jwt is not available")
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
          className="px-3 py-1 bg-gray-200 text-gray-700 rounded-l-md focus:outline-none hover:bg-gray-300"
          onClick={decrementQuantity}
        >
          -
        </button>
        <span className="px-4 py-1 border-t border-b">{quantity}</span>
        <button
          className="px-3 py-1 bg-gray-200 text-gray-700 rounded-r-md focus:outline-none hover:bg-gray-300"
          onClick={incrementQuantity}
        >
          +
        </button>
      </div>

      {/* Reserve Button */}
      <button
        onClick={handleReserve}
        disabled={loading}
        className={`w-full py-2 font-semibold rounded-md focus:outline-none ${
          loading
            ? "bg-gray-400 text-gray-200 cursor-not-allowed"
            : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
      >
        {loading ? "Processing..." : "Reserve a Spot"}
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
