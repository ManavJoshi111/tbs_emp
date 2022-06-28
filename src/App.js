import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";
import Navbar from "./Components/Navbar";
import Profile from "./Components/Profile";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Logout from "./Components/Logout";
import Dashboard from "./Components/Dashboard";
import Admin from "./Components/Admin";
import Add from "./Components/Add";
import Edit from "./Components/Edit";
import Projects from "./Components/Projects";
import Employee from "./Components/Employee";
import AddEmployee from "./Components/AddEmployee";
import EditEmployee from "./Components/EditEmployee";
import Task from "./Components/Task";
import AddTask from "./Components/AddTask";
import EditTask from "./Components/EditTask";
import DevProfile from "./Components/DevProfile";

function App() {
  const initialUser = {
    id: "",
    name: "",
    email: "",
    designation: "",
    password: "",
    facebook: "",
    github: "",
    instagram: "",
    phone: "",
    photo: "",
  };
  const [Toggle, setToggle] = useState(false);
  const [User, setUser] = useState(initialUser);
  return (
    <>
      <div className="App"></div>
      <Router>
        <Navbar Toggle={Toggle} />
        <Routes>
          <Route exact path="/" element={<Profile></Profile>}></Route>
          <Route
            exact
            path="/login"
            element={
              <Login
                setToggle={setToggle}
                setUser={setUser}
                User={User}
              ></Login>
            }
          ></Route>
          <Route
            exact
            path="/signup"
            element={<Signup setToggle={setToggle}></Signup>}
          ></Route>
          <Route
            exact
            path="/logout"
            element={<Logout setToggle={setToggle} setUser={setUser}></Logout>}
          ></Route>
          <Route
            exact
            path="/dashboard"
            element={<Dashboard setToggle={setToggle}></Dashboard>}
          ></Route>
          <Route
            exact
            path="/admin"
            element={<Admin User={User}></Admin>}
          ></Route>
          <Route
            exact
            path="/add"
            element={<Add User={User} setUser={setUser}></Add>}
          ></Route>
          <Route
            exact
            path="/edit"
            element={<Edit User={User} setUser={setUser}></Edit>}
          ></Route>
          <Route
            exact
            path="/projects"
            element={<Projects User={User}></Projects>}
          ></Route>
          <Route
            exact
            path="/employee"
            element={<Employee User={User}></Employee>}
          ></Route>
          <Route
            exact
            path="/addemployee"
            element={<AddEmployee User={User}></AddEmployee>}
          ></Route>
          <Route
            exact
            path="/editemployee"
            element={<EditEmployee User={User}></EditEmployee>}
          ></Route>
          <Route exact path="/task" element={<Task User={User}></Task>}></Route>
          <Route
            exact
            path="/addtask"
            element={<AddTask User={User}></AddTask>}
          ></Route>
          <Route
            exact
            path="/edittask"
            element={<EditTask User={User}></EditTask>}
          ></Route>
          <Route
            exact
            path="/devprofile"
            element={<DevProfile User={User} Toggle={Toggle}></DevProfile>}
          ></Route>
        </Routes>
      </Router>
      <ToastContainer style={{ width: "400px" }} />
    </>
  );
}

export default App;
