import React, { useState } from "react";
import { Event } from "../types/Event";

interface OrderButtonProps {
  ticketType: string; // e.g., "General Admission"
  price: string; // e.g., "Free"
  onReserve: (quantity: number) => void;
}

const OrderButton: React.FC<OrderButtonProps> = ({
  ticketType,
  price,
  onReserve,
}) => {
  const [quantity, setQuantity] = useState(1);

  const incrementQuantity = () => setQuantity((prev) => Math.min(prev + 1, 5)); // Max 10 tickets
  const decrementQuantity = () => setQuantity((prev) => Math.max(prev - 1, 5)); // Min 1 ticket

  return (
    <div className="p-4 rounded-md min-w-2xl w-full ">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">{ticketType}</h3>
        <span className="text-green-500 font-medium">{price}</span>
      </div>

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

      <button
        onClick={() => onReserve(quantity)}
        className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none"
      >
        Reserve a spot
      </button>
    </div>
  );
};

export default OrderButton;
