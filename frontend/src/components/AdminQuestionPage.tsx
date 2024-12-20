import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserFlow } from "../context/UserFlowContext";

const AdminQuestionsPage: React.FC = () => {
  const navigate = useNavigate();
  const { state, setEvent } = useUserFlow();

  // Ensure answers are defined before destructuring
  const {
    title = "",
    shortDescription = "",
    longDescription = "",
    date = "",
    venue = "",
    eventType = "FREE",
    price = "",
    capacity = "",
    availableTickets = "",
    category = "",
    newCategory = "",
  } = state.event || {};

  const [formData, setFormData] = useState({
    title,
    shortDescription,
    longDescription,
    date,
    venue,
    eventType,
    price,
    capacity,
    availableTickets,
    category,
    newCategory,
  });

  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch("/api/categories");
        const data = await response.json();
        setCategories(data.categories || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }
    fetchCategories();
  }, []);

  // UseRef to keep track of previous formData values
  const prevFormData = React.useRef(formData);

  useEffect(() => {
    Object.entries(formData).forEach(([key, value]) => {
      if (key in prevFormData.current && prevFormData.current[key as keyof typeof prevFormData.current] !== value && key !== "newCategory") {
        setEvent(key, value);
      }
    });

    prevFormData.current = formData;
  }, [formData, setEvent]); // Only trigger when formData changes

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    navigate("/summary");
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleAddCategory = () => {
    if (formData.newCategory && !categories.includes(formData.newCategory)) {
      setCategories((prev) => [...prev, formData.newCategory]);
      setFormData((prev) => ({ ...prev, category: formData.newCategory, newCategory: "" }));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="p-8 bg-white shadow-lg rounded-md w-full max-w-5xl">
        <h1 className="text-3xl font-bold mb-8 text-gray-800 text-center">Event Details</h1>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label htmlFor="title" className="font-semibold mb-2">Event Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter event title"
              className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="shortDescription" className="font-semibold mb-2">Short Description</label>
            <input
              type="text"
              name="shortDescription"
              value={formData.shortDescription}
              onChange={handleChange}
              placeholder="Enter a brief description"
              className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col md:col-span-2">
            <label htmlFor="longDescription" className="font-semibold mb-2">Long Description</label>
            <textarea
              name="longDescription"
              value={formData.longDescription}
              onChange={handleChange}
              placeholder="Enter a detailed description"
              rows={4}
              className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="date" className="font-semibold mb-2">Event Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="venue" className="font-semibold mb-2">Venue</label>
            <input
              type="text"
              name="venue"
              value={formData.venue}
              onChange={handleChange}
              placeholder="Enter venue name"
              className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="capacity" className="font-semibold mb-2">Capacity</label>
            <input
              type="number"
              name="capacity"
              value={formData.capacity}
              onChange={handleChange}
              placeholder="Enter capacity"
              className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="availableTickets" className="font-semibold mb-2">Available Tickets</label>
            <input
              type="number"
              name="availableTickets"
              value={formData.availableTickets}
              onChange={handleChange}
              placeholder="Enter available tickets"
              className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="category" className="font-semibold mb-2">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            >
              {categories.map((cat, index) => (
                <option key={index} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="newCategory" className="font-semibold mb-2">Add New Category</label>
            <input
              type="text"
              name="newCategory"
              value={formData.newCategory}
              onChange={handleChange}
              placeholder="Enter new category"
              className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={handleAddCategory}
              className="mt-2 py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
            >
              Add Category
            </button>
          </div>
          {formData.eventType === "PAID" && (
            <div className="flex flex-col">
              <label htmlFor="price" className="font-semibold mb-2">Price</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Enter ticket price"
                className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}
        </form>
        <div className="flex mt-8 justify-between">
          <button
            onClick={handleGoBack}
            className="py-2 px-6 bg-gray-500 text-white rounded-md hover:bg-gray-700 transition"
          >
            Go Back
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="py-2 px-6 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminQuestionsPage;
