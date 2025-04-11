import { useState } from 'react'
import './App.css'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

//Pages
import Home from './components/Home';
import About from './components/About';
import Navbar from './components/Navbar';
import Alert from './components/Alert';
import SignUp from './components/SignUp';
import Login from './components/Login';


function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null)
    }, 1500);
  }

  return (
    <>
      <Router>
        <Navbar />
        <Alert alert={alert}/>
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/signup" element={<SignUp showAlert={showAlert}/>} />
            <Route path="/login" element={<Login showAlert={showAlert}/>} />
          </Routes>
        </div>
      </Router>
    </>
  )
}

export default App