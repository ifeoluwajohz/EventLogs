import { Route, Routes } from "react-router-dom"
import { useAuth } from './context/AuthContext'
import { UserFlowProvider } from "./context/UserFlowContext"


import Home from "./pages/Home"
import Navbar from "./components/Navbar"


import AccountPage from './utils/AccountPage'
import AccountConfig from './utils/AccountConfig'

import ExtraInfo from "./components/ExtraInfo"
import RoleSelectionPage from "./components/RoleSelectionPage";
import AdminQuestionsPage from "./components/AdminQuestionPage";
import AttendeeQuestionsPage from "./components/AttendeeQuestionsPage";
import SummaryPage from "./components/SummaryPage";

const App = () => {
  const {user} = useAuth();

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