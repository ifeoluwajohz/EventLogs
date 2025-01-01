import React, { useState } from "react";
import { useEvent } from "../context/EventContext";

const CreateEventForm: React.FC = () => {
  const { createEvent, loading, error } = useEvent();
  const [formData, setFormData] = useState({
    title: "",
    shortDescription: "",
    longDescription: "",
    date: "",
    venue: "",
    eventType: "FREE",
    price: 0,
    availableTickets: 0,
    admin: "",
    pictureId: "",
    categories: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createEvent({
      ...formData,
      price: formData.eventType === "PAID" ? formData.price : 0,
      categories: formData.categories.split(","),
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-md space-y-6"
    >
      <h2 className="text-3xl font-bold text-indigo-600 mb-6">Create Event</h2>

      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Short Description</label>
        <textarea
          name="shortDescription"
          value={formData.shortDescription}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Long Description</label>
        <textarea
          name="longDescription"
          value={formData.longDescription}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Date</label>
        <input
          type="datetime-local"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Venue</label>
        <input
          type="text"
          name="venue"
          value={formData.venue}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Event Type</label>
        <select
          name="eventType"
          value={formData.eventType}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="FREE">Free</option>
          <option value="PAID">Paid</option>
        </select>
      </div>

      {formData.eventType === "PAID" && (
        <div>
          <label className="block text-sm font-medium text-gray-700">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      )}


      <div>
        <label className="block text-sm font-medium text-gray-700">Available Tickets</label>
        <input
          type="number"
          name="availableTickets"
          value={formData.availableTickets}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Admin ID</label>
        <input
          type="text"
          name="adminId"
          value={formData.admin}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Picture ID</label>
        <input
          type="text"
          name="pictureId"
          value={formData.pictureId}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Categories</label>
        <input
          type="text"
          name="categories"
          value={formData.categories}
          onChange={handleChange}
          placeholder="Separate categories with commas"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="flex justify-between items-center">
        <button
          type="submit"
          className="px-6 py-2 text-white bg-indigo-600 hover:bg-indigo-700 rounded-md"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Event"}
        </button>
        {error && <p className="text-red-600 text-sm">{error}</p>}
      </div>
    </form>
  );
};

export default CreateEventForm;
