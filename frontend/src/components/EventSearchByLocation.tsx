import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

interface Event {
    id: string;
    title: string;
    shortDescription: string;
    date: string;
    venue: string;
    availableTickets: number;
    eventType: string;
}
const API_URL = import.meta.env.VITE_REACT_APP_API_KEY;

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
                `${API_URL}/search/byLocation/?location=${searchLocation}`
            );
            const data: Event[] = await response.json();
            setEvents(data);
            console.log(data);
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (userProfile?.location) {
            fetchEvents(userProfile.location);
        } else {
            fetchEvents(location);
        }
    }, [userProfile, location]);

    const handleSearch = () => {
        if (location.trim()) {
            fetchEvents(location);
        }
    };

    const fetchCurrentLocation = async () => {
        if (!navigator.geolocation) {
            setError("Geolocation is not supported by your browser.");
            return;
        }
    
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
    
                try {
                    // Reverse Geocoding API call
                    const response = await fetch(
                        `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=ca38854e4bde4792bca2d07f11fdfbb2`
                    );
                    const data = await response.json();
    
                    if (data.results && data.results.length > 0) {
                        console.log(data)
                        const locationName = data.results[0].formatted; // Extract meaningful location name
                        setLocation(locationName);
                        fetchEvents(locationName); // Trigger event search with location name
                    } else {
                        setError("Could not determine your location name. Please try again.");
                    }
                } catch (err) {
                    setError("Error fetching location name. Please check your connection.");
                    console.error(err);
                }
            },
            (err) => {
                setError("Unable to retrieve location. Please try again.");
                console.error(err);
            }
        );
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
                    </span>.
                </p>

                {/* Location Search */}
                <form className="flex flex-col sm:flex-row gap-4 items-center">
                    <input
                        type="text"
                        placeholder="Enter location..."
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full sm:flex-1 px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-400 focus:outline-none"
                    />
                    <button
                        onClick={handleSearch}
                        type="button"
                        className="w-full sm:w-auto px-6 py-3 bg-blue-500 font-semibold rounded-lg text-white"
                    >
                        Search
                    </button>
                </form>

                {/* Live Location Button */}
                <button
                    onClick={fetchCurrentLocation}
                    className="w-full sm:w-auto mt-4 px-6 py-3 font-medium text-base underline rounded-lg text-black"
                >
                    Or Use Current Location
                </button>

                {/* Loading State */}
                {loading && (
                    <div className="flex justify-center items-center h-screen">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
                    </div>
                )}

                {/* Error State */}
                {error && <p className="text-red-500 mt-6 text-center">{error}</p>}

                {/* Events */}
                {events && events.length > 0 && (
                    <div className="mt-8">
                        <h2 className="text-2xl font-semibold text-blue-900 mb-10 text-center">
                            Events Near {location}
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {events.map((event) => (
                                <Link
                                    to={`/event/${event.id}`}
                                    key={event.id}
                                    className="search-event bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out text-left"
                                >
                                    <h3 className="text-base font-bold text-black">
                                        {event.title.toUpperCase()}
                                    </h3>
                                    <p className="text-xs text-gray-600">
                                        {new Date(event.date).toDateString()}
                                    </p>
                                    <p className="text-gray-600">{event.eventType}</p>
                                    <p className="text-semibold text-xs">{event.venue}</p>
                                </Link>
                            ))}
                        </div>
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
