import "./App.css";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "../src/page/home";
import Navbar from "../src/component/common/Navbar";
import Login from "../src/page/Login";
import SignUp from "../src/page/Signup";
import Dashboard from "../src/page/Dashboard";
import EventDashboard from "./component/Dashboard/EventDashboard";
import AdminDashboard from "./component/Dashboard/AdminDashboard";
import  EventTask from "./component/Dashboard/EventTask";
import Emailverify from "../src/page/Emailverify";
import PrivateRoute from "./component/Auth/PrivateRoute";  // for redirecting

// ProtectedRoute component to protect dashboard routes
//heelo

function App() {
    return (
        <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter overflow-x-hidden">
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/verify-email" element={<Emailverify />} />
                {/* Protected Routes */}
                <Route path="/dashboard" element={ <Dashboard />} >
                <Route path="/dashboard/attendees" element={<EventDashboard/>} />
                <Route path="/dashboard/tasks" element={<EventTask/>} />
                <Route path="/dashboard/admin" element={<AdminDashboard />} />
               </Route>
                
  
            </Routes>
        </div>
    );
}

export default App;
