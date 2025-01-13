// import { useState } from "react"
import { Route, Routes } from "react-router-dom"
import { useAuth } from './context/AuthContext'
import { EventProvider } from './context/EventContext'
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
// import CreateEventForm from "./config/CreateEventForm"
import TicketPage from "./pages/TicketPage"
import TicketManagement from "./pages/TicketManagement"
// import UpdateEventForm from "./config/UpdateEventForm"

import EventDeatils from "./components/EventDetails"

const App = () => {
  const { user } = useAuth();
  // const [localUserProfile] = useState<UserProfile | null>(null);
  // https://theevent-i5i1.onrender.com
  // console.log(userProfile?.role)
  // https://theevent-i5i1.onrender.com

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
          {/* <Route path="/createEvent" element={ <CreateEventForm />} /> */}
          <Route path="/ticket/:id" element={ <TicketPage />} />
          <Route path="/tickets" element={<TicketManagement />} />

          {/* <Route path="/updateEvent" element={ <UpdateEventForm />} /> */}

        </Routes>
      </EventProvider>

      <Routes>
        <Route path="/event/:id" element={<EventDeatils />} />
      </Routes>

        <Routes>
          <Route path="/extra_info" element={<ExtraInfo />} />
          <Route path="/questions" element={<RoleSelectionPage />} />
          <Route path="/createEvent" element={<AdminQuestionsPage />} />
          <Route path="/attendee-questions" element={<AttendeeQuestionsPage />} />
          <Route path="/summary" element={<SummaryPage />} />
        </Routes>

    </>
  )
}

export default App