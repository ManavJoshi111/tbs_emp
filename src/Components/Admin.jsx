import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const Admin = (props) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (
      props.User.resJson === undefined ||
      props.User.resJson.email !== "chetan92infotech@gmail.com"
    ) {
      toast.error(
        "Please Login or You are not authorised to access this page",
        {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
        }
      );
      navigate("../login");
      return;
    }
  }, []);
  return (
    <>
      <div
        className="d-flex justify-content-center align-items-center flex-column"
        style={{ height: "80vh" }}
      >
        <h1 className="display-4">Welcome To Employee Management System</h1>
        <div className="d-flex justify-content-center align-items-center flex-row">
          <NavLink to="/projects" className="btn btn-primary mx-2">
            Projects
          </NavLink>
          <NavLink to="/employee" className="btn btn-primary mx-2">
            Employee
          </NavLink>
          <NavLink to="/task" className="btn btn-primary">
            Task
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default Admin;
