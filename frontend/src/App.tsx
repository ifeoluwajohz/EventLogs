import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { useAuth } from './context/AuthContext'


import Home from "./pages/Home"
import Navbar from "./components/Navbar"


import AccountPage from './utils/AccountPage'
import AccountConfig from './utils/AccountConfig'



const App = () => {
  const {user} = useAuth();

  return (
    <>
      <Router>
      <Navbar />

        <Routes>
          <Route path="/" element={<Home />}/>
        </Routes>

        <Routes>
          <Route path='/login' element={!user ? <AccountConfig /> : <Home/>} />
          <Route path='/accountconfig' element={ <AccountPage /> } />
        </Routes>

      </Router>
    </>
  )
}

export default App