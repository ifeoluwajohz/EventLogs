import React, { useState, useEffect } from "react";
import { useEvent } from "../context/EventContext";

const UpdateEventForm: React.FC<{ eventId: string }> = ({ eventId }) => {
  const { updateEvent, events, loading, error } = useEvent();
  const [formData, setFormData] = useState({
    title: "",
    shortDescription: "",
    longDescription: "",
    date: "",
    venue: "",
    eventType: "FREE",
    price: 0,
    capacity: 0,
    availableTickets: 0,
    adminId: "",
    pictureId: "",
    categories: "",
  });

  useEffect(() => {
    const event = events.find((e) => e.id === eventId);
    if (event) {
      setFormData({ ...event, categories: event.categories.join(",") });
    }
  }, [eventId, events]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateEvent(eventId, { ...formData, categories: formData.categories.split(",") });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-md"
    >
      <h2 className="text-3xl font-bold text-indigo-600 mb-6">Update Event</h2>

      {/* Add fields here similarly */}
      <div className="flex justify-between">
        <button
          type="submit"
          className="px-6 py-2 text-white bg-indigo-600 hover:bg-indigo-700 rounded-md"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Event"}
        </button>
        {error && <p className="text-red-600 text-sm">{error}</p>}
      </div>
    </form>
  );
};

export default UpdateEventForm;
