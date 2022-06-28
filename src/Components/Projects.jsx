import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { NavLink, useNavigate } from "react-router-dom";
import Admin from "./Admin";

const Projects = (props) => {
  const [Data, setProjects] = useState([]);
  const fetchData = async () => {
    const res = await fetch(
      "https://thinkbeatsolutions.com/react/api/getprojects.php",
      {
        method: "GET",
      }
    );
    const resJson = await res.json();
    setProjects(resJson);
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
  };
  const navigate = useNavigate();
  console.log("User in admin ", props.User);
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
    fetchData();
  }, []);

  const deleteProject = async (id) => {
    console.log("id is :", id);
    const res = await fetch(
      "https://thinkbeatsolutions.com/react/api/delete_project.php",
      {
        method: "POST",
        body: id,
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
      toast.error(resJson.success, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
      });
      fetchData();
    }
  };
  return (
    <>
      <div className="container mt-4">
        <NavLink
          className="btn btn-primary float-left mb-3 float-right mx-5"
          to="/add"
        >
          Add
        </NavLink>
        <NavLink
          className="btn btn-primary float-left mb-3 float-right"
          to="/admin"
        >
          Admin
        </NavLink>
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th scope="col">Project Id</th>
              <th scope="col">Project Name</th>
              <th scope="col">Framework</th>
              <th scope="col">Date</th>
              <th scope="col">Status</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {Data.map((project) => {
              console.log("Projects are :", project.name);
              return (
                <>
                  <tr>
                    <th scope="row">{project.id}</th>
                    <td>{project.name}</td>
                    <td>{project.framework}</td>
                    <td>{project.date}</td>
                    <td>{project.status ? "In Progress" : "Cancelled"}</td>
                    <td>
                      <NavLink
                        className="btn btn-primary"
                        to={"/edit?id=" + project.id}
                      >
                        Edit
                      </NavLink>
                    </td>
                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={() => deleteProject(project.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Projects;
