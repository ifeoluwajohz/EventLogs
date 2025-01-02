import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

interface Event {
    id: string;
    title: string;
    shortDescription: string;
    date: string;
    venue: string;
}

const EventSearchByLocation: React.FC = () => {
    const { userProfile } = useAuth();
    const [location, setLocation] = useState<string>(userProfile?.location || "");
    const [events, setEvents] = useState<Event[] | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchEvents = async (searchLocation: string) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(
                `http://localhost:5000/search/byLocation/?location=${encodeURIComponent(searchLocation)}`
            );
            if (!response.ok) {
                throw new Error("Failed to fetch events");
            }
            const data: Event[] = await response.json();
            setEvents(data);
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Fetch events using the default location on component mount
        if (userProfile?.location) {
            fetchEvents(userProfile.location);
        }
    }, [userProfile]);

    const handleSearch = () => {
        if (location.trim()) {
            fetchEvents(location);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-blue-50 flex flex-col items-center justify-center px-4 py-8">
            <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6 sm:p-10">
                <h1 className="text-4xl font-bold text-blue-900 mb-4 text-center">
                    Events Near You
                </h1>
                <p className="text-gray-700 text-center mb-6">
                    These are the events happening near{" "}
                    <span className="font-semibold text-blue-700">
                        {userProfile?.location || "your chosen location"}
                    </span>
                    . You can also search for events in other locations.
                </p>

                {/* Location Search */}
                <div className="flex flex-col sm:flex-row gap-4 items-center">
                    <input
                        type="text"
                        placeholder="Enter location..."
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full sm:flex-1 px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-400 focus:outline-none"
                    />
                    <button
                        onClick={handleSearch}
                        className="w-full sm:w-auto px-6 py-3 bg-gray-500 font-semibold rounded-lg text-white"
                    >
                        <p className="">Search</p>
                    </button>
                </div>

                {/* Loading State */}
                {loading && <p className="text-blue-600 mt-6 text-center">Loading events...</p>}

                {/* Error State */}
                {error && <p className="text-red-500 mt-6 text-center">{error}</p>}

                {/* Events */}
                {events && events.length > 0 && (
                    <div className="mt-8">
                        <h2 className="text-2xl font-semibold text-blue-900 mb-4 text-center">
                            Events Near {location}
                        </h2>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {events.map((event) => (
                                <li
                                    key={event.id}
                                    className="p-5 bg-gradient-to-r from-indigo-50 to-blue-50 border-l-4 border-blue-500 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                                >
                                    <h3 className="text-lg font-bold text-blue-800">{event.title}</h3>
                                    <p className="text-gray-600 mt-2">{event.shortDescription}</p>
                                    <p className="text-sm text-gray-500 mt-4">
                                        {new Date(event.date).toLocaleDateString()} | {event.venue}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* No Events */}
                {events && events.length === 0 && (
                    <p className="mt-6 text-gray-600 text-center">
                        No events found for{" "}
                        <span className="font-semibold text-blue-700">{location}</span>.
                    </p>
                )}
            </div>
        </div>
    );
};

export default EventSearchByLocation;
