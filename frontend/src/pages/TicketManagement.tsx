import React, { useState, useEffect } from "react";

// Import the components to display
import Events from "../pages/Events";
import AdminQuestionsPage from "../components/AdminQuestionPage";
import TicketPage from "../pages/TicketPage";

// Icons (Replace with your preferred icon library like Heroicons or FontAwesome)
const MenuIcon = () => <svg
xmlns="http://www.w3.org/2000/svg"
className="h-6 w-6"
fill="none"
viewBox="0 0 24 24"
stroke="currentColor"
>
<path
  strokeLinecap="round"
  strokeLinejoin="round"
  strokeWidth="1"
  d="M4 6h16M4 12h16m-7 6h7"
/>
</svg>;
const CloseIcon = () => <span>Close</span>;
const EventsIcon = () => <span>🎟️</span>;
const CreateEventIcon = () => <span>🛠️</span>;
const HelpIcon = () => <span>❓</span>;

const TicketManagement: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentView, setCurrentView] = useState<string>("events"); // Default view
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false); // Sidebar toggle for mobile/tablet
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(() => {
    const stored = localStorage.getItem("sidebarCollapsed");
    return stored ? JSON.parse(stored) : false;
  }); // Sidebar collapse for larger screens

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleSidebarCollapse = () => {
    const newState = !isSidebarCollapsed;
    setIsSidebarCollapsed(newState);
    localStorage.setItem("sidebarCollapsed", JSON.stringify(newState));
  };

  const renderView = () => {
    switch (currentView) {
      case "events":
        return <Events />;
      case "createEvent":
        return <AdminQuestionsPage />;
      case "Ticket":
        return <TicketPage />;
      default:
        return <Events />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-50">
      {/* Loading Screen */}
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
      </div>
      ) : (
        <>
          {/* Sidebar */}
          <nav
            className={`fixed top-0 left-0 h-full bg-white border-r shadow-lg transform z-50 transition-transform duration-300 ${
              isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            } lg:relative lg:translate-x-0 lg:w-64 ${
              isSidebarCollapsed ? "lg:w-20" : "lg:w-64"
            }`}
          >
            <div
              className="p-4 flex items-center justify-center text-center border-b cursor-pointer"
              onClick={handleSidebarCollapse}
            >
              <h1
                className={`text-2xl font-bold text-blue-600 transition-opacity ${
                  isSidebarCollapsed ? "opacity-0 lg:hidden" : "opacity-100"
                }`}
              >
                Ticket Management
              </h1>
              
            </div>
            <ul className="flex flex-col space-y-2 mt-4 px-4">
              <li className="group">
                <button
                  onClick={() => {
                    setCurrentView("events");
                    setIsSidebarOpen(false);
                  }}
                  className={`flex items-center w-full text-left p-3 rounded-lg ${
                    currentView === "events"
                      ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                      : "text-gray-700 hover:bg-blue-100 hover:text-blue-600"
                  }`}
                >
                  <EventsIcon />
                  {!isSidebarCollapsed && (
                    <span className="ml-3 group-hover:underline">
                      Ticket Booked
                    </span>
                  )}
                </button>
                {isSidebarCollapsed && (
                  <span className="absolute left-16 bg-gray-800 text-white text-sm px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    Ticket Booked
                  </span>
                )}
              </li>
              <li className="group">
                <button
                  onClick={() => {
                    setCurrentView("createEvent");
                    setIsSidebarOpen(false);
                  }}
                  className={`flex items-center w-full text-left p-3 rounded-lg ${
                    currentView === "createEvent"
                      ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                      : "text-gray-700 hover:bg-blue-100 hover:text-blue-600"
                  }`}
                >
                  <CreateEventIcon />
                  {!isSidebarCollapsed && (
                    <span className="ml-3 group-hover:underline">
                      Create Event
                    </span>
                  )}
                </button>
                {isSidebarCollapsed && (
                  <span className="absolute left-16 bg-gray-800 text-white text-sm px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    Create Event
                  </span>
                )}
              </li>
              <li className="group">
                <button
                  onClick={() => {
                    setCurrentView("Ticket");
                    setIsSidebarOpen(false);
                  }}
                  className={`flex items-center w-full text-left p-3 rounded-lg ${
                    currentView === "Ticket"
                      ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                      : "text-gray-700 hover:bg-blue-100 hover:text-blue-600"
                  }`}
                >
                  <HelpIcon />
                  {!isSidebarCollapsed && (
                    <span className="ml-3 group-hover:underline">Help</span>
                  )}
                </button>
                {isSidebarCollapsed && (
                  <span className="absolute left-16 bg-gray-800 text-white text-sm px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    Help
                  </span>
                )}
              </li>
            </ul>
            <button
                onClick={() => setIsSidebarOpen(false)}
                className="text-red-700 lg:hidden px-6 py-2 mt-10 rounded-md items-center text-center hover:underline bg-red-200"
                aria-label="Close Sidebar"
              >
                <CloseIcon />
              </button>
          </nav>

          {/* Mobile Overlay */}
          {isSidebarOpen && (
            <div
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            ></div>
          )}

          {/* Main Content Area */}
          <div className="flex-grow bg-gray-100">
            {/* Header */}
            <header className="flex items-center justify-between px-6 bg-white shadow-md lg:hidden">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="text-gray-700"
                aria-label="Toggle Sidebar"
              >
                <MenuIcon />
              </button>
              <h1 className="text-lg font-bold text-blue-600">
                Ticket Management
              </h1>
            </header>

            <div className="max-w-5xl mx-auto bg-white rounded-lg shadow p-4">
              {renderView()}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TicketManagement;
