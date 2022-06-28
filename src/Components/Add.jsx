import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import Projects from "./Projects";

const Add = (props) => {
  const navigate_ = useNavigate();
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
      navigate_("../login");
      return;
    }
  }, []);
  const navigate = useNavigate();
  const initialValue = {
    project_name: "",
    project_framework: "",
    project_create_date: "",
    project_status: "",
  };
  const [Project, setProject] = useState(initialValue);
  const handleonchange = (e) => {
    console.log("e.target.name is :", e.target.name);
    console.log("e.target.value is :", e.target.value);
    setProject({ ...Project, [e.target.name]: e.target.value });
    console.log("Project :", Project);
  };
  const sendData = async (e) => {
    const {
      project_name,
      project_framework,
      project_create_date,
      project_status,
    } = Project;
    e.preventDefault();
    console.log("Sended Project is : ", Project);
    const res = await fetch(
      "https://thinkbeatsolutions.com/react/api/insert_project.php",
      {
        method: "POST",
        body: JSON.stringify({
          project_name,
          project_framework,
          project_create_date,
          project_status,
        }),
      }
    );
    const resJson = await res.json();
    console.log("Message is :", resJson);
    if (resJson.error) {
      toast.error(resJson.error, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
      });
    }
    if (resJson.success) {
      toast.success(resJson.success, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
      });
      navigate("../projects");
    }
  };
  return (
    <>
      <div className="container-fluid mt-3">
        <form>
          <div className="form-group ">
            <label htmlFor="inputName">Project Name</label>
            <input
              type="text"
              id="inputName"
              className="form-control"
              name="project_name"
              onChange={handleonchange}
            />
          </div>
          <div className="form-group ">
            <label htmlFor="inputName">Framework</label>
            <input
              type="text"
              id="inputName"
              className="form-control"
              name="project_framework"
              onChange={handleonchange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="inputStatus">Status</label>
            <select
              id="inputStatus"
              className="form-control custom-select"
              onChange={handleonchange}
              name="project_status"
            >
              <option selected disabled>
                Select one
              </option>
              <option>In Progress</option>
              <option>Canceled</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="inputClientCompany">Date</label>
            <input
              type="date"
              id="inputClientCompany"
              className="form-control"
              name="project_create_date"
              onChange={handleonchange}
            />
          </div>
        </form>
      </div>
      <button
        className="btn btn-primary float-right mb-3 mx-5"
        type="submit"
        onClick={sendData}
      >
        Submit
      </button>
      <NavLink to="/projects" className="btn btn-primary float-right">
        Go To Projects
      </NavLink>
    </>
  );
};

export default Add;
