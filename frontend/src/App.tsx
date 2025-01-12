// import { useState } from "react"
import { Route, Routes } from "react-router-dom"
import { useAuth } from './context/AuthContext'
import { EventProvider } from './context/EventContext'
import { UserFlowProvider } from "./context/UserFlowContext"
// import { UserProfile } from "../types/userTypes";



import Home from "./pages/Home"
import Navbar from "./components/Navbar"


import AccountPage from './utils/AccountPage'
import AccountConfig from './utils/AccountConfig'

import ExtraInfo from "./components/ExtraInfo"
import RoleSelectionPage from "./components/RoleSelectionPage";
import AdminQuestionsPage from "./components/AdminQuestionPage";
import AttendeeQuestionsPage from "./components/AttendeeQuestionsPage";
import SummaryPage from "./components/SummaryPage";

import Events from "./pages/Events"
import CreateEventForm from "./config/CreateEventForm"
import TicketPage from "./pages/TicketPage"
// import UpdateEventForm from "./config/UpdateEventForm"

import EventDeatils from "./components/EventDetails"

const App = () => {
  const { user } = useAuth();
  // const [localUserProfile] = useState<UserProfile | null>(null);
  // http://localhost:5000
  // console.log(userProfile?.role)
  // http://localhost:5000

  return (
    <>
      <Navbar />

        <Routes>
          <Route path="/" element={<Home />}/>
        </Routes>

        <Routes>
          <Route path='/login' element={!user ? <AccountConfig /> : <Home/>} />
          <Route path='/accountconfig' element={ <AccountPage /> } />
        </Routes>
        
      <EventProvider>
        <Routes>
          <Route path="/events" element={ <Events />} />
          <Route path="/createEvent" element={ <CreateEventForm />} />
          <Route path="/ticket/:id" element={ <TicketPage />} />

          {/* <Route path="/updateEvent" element={ <UpdateEventForm />} /> */}

        </Routes>
      </EventProvider>

      <Routes>
        <Route path="/event/:id" element={<EventDeatils />} />
      </Routes>

      <UserFlowProvider>
        <Routes>
          <Route path="/extra_info" element={<ExtraInfo />} />
          <Route path="/questions" element={<RoleSelectionPage />} />
          <Route path="/admin-questions" element={<AdminQuestionsPage />} />
          <Route path="/attendee-questions" element={<AttendeeQuestionsPage />} />
          <Route path="/summary" element={<SummaryPage />} />
        </Routes>
      </UserFlowProvider>

    </>
  )
}

export default App