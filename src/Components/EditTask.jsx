import React, { useState, useEffect } from "react";
import { NavLink, useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const EditTask = (props) => {
  const navigate_ = useNavigate();
  const [projects, setProjects] = useState([]);
  const [Employees, setEmployees] = useState([]);
  const [reqTask, setreqTask] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id");
  console.log("Id is : ", id);
  const [resJson, setresJson] = useState([]);
  const fetchEmployee = async () => {
    const res = await fetch(
      "https://thinkbeatsolutions.com/react/api/get_tasks.php",
      {
        method: "POST",
        body: id,
      }
    );
    console.log(res);
    const resJson = await res.json();
    console.log("Message is :", resJson);
    setreqTask(resJson);
  };
  const getProjects = async () => {
    console.log("In getprojects");
    const resprojects = await fetch(
      "https://thinkbeatsolutions.com/react/api/getprojects.php",
      {
        method: "GET",
      }
    );
    const projectsJson = await resprojects.json();
    console.log("projectsJson is :", projectsJson);
    setProjects(projectsJson);
  };
  const getEmployees = async () => {
    console.log("In getEmployees");
    const resemp = await fetch(
      "https://thinkbeatsolutions.com/react/api/get_employee.php",
      {
        method: "GET",
      }
    );
    const empJson = await resemp.json();
    console.log("projectsJson is :", empJson);
    setEmployees(empJson);
  };
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
    getProjects();
    getEmployees();
    fetchEmployee();
  }, []);

  const navigate = useNavigate();
  const handleonchange = (e) => {
    setreqTask({ ...reqTask, [e.target.name]: e.target.value });
  };
  const sendData = async (e) => {
    e.preventDefault();
    console.log("Sended Task is : ", reqTask);
    const res = await fetch(
      "https://thinkbeatsolutions.com/react/api/update_task.php",
      {
        method: "POST",
        body: JSON.stringify(reqTask),
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
      navigate("../task");
    }
  };
  return (
    <>
      <div className="container-fluid mt-3">
        <form>
          <div className="form-group ">
            <label htmlFor="inputName">Task Title</label>
            <input
              type="text"
              id="inputName"
              className="form-control"
              name="task_title"
              defaultValue={reqTask.task_title}
              onChange={handleonchange}
            />
          </div>
          <div className="form-group ">
            <label htmlFor="inputName">Description</label>
            <input
              type="text"
              id="inputName"
              className="form-control"
              name="task_description"
              onChange={handleonchange}
              defaultValue={reqTask.task_description}
            />
          </div>
          <div className="input-group d-flex justify-content-between">
            <div className="form-group ">
              <label htmlFor="inputName">Project Name</label>
              <select
                id="inputStatus"
                className="form-control custom-select"
                onChange={handleonchange}
                name="project_id"
                Value={reqTask.project_id}
              >
                {projects.map((project) => (
                  <option key={project.name} value={project.id}>
                    {project.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group ">
              <label htmlFor="inputName">Employee Name</label>
              <select
                id="inputStatus"
                className="form-control custom-select"
                onChange={handleonchange}
                name="emp_id"
                Value={reqTask.emp_id}
              >
                {Employees.map((employee) => {
                  if (employee.role != 1) {
                    return (  
                      <option key={employee.name} value={employee.id}>
                        {employee.name}
                      </option>
                    );
                  }
                })}
              </select>
            </div>
            <div className="form-group ">
              <label htmlFor="inputName">Hours</label>
              <input
                type="number"
                id="inputName"
                className="form-control"
                name="task_hours"
                onChange={handleonchange}
                defaultValue={reqTask.task_hours}
              />
            </div>
          </div>
          <div className="input-group d-flex justify-content-between">
            <div className="form-group ">
              <label htmlFor="inputName">Create Date</label>
              <input
                type="date"
                id="inputName"
                className="form-control"
                name="task_create_date"
                onChange={handleonchange}
                defaultValue={reqTask.task_create_date}
              />
            </div>
            <div className="form-group ">
              <label htmlFor="inputName">Assign Date</label>
              <input
                type="date"
                id="inputName"
                className="form-control"
                name="task_assign_date"
                onChange={handleonchange}
                defaultValue={reqTask.task_assign_date}
              />
            </div>
            <div className="form-group ">
              <label htmlFor="inputName">Delete Date</label>
              <input
                type="date"
                id="inputName"
                className="form-control"
                name="task_delete_date"
                onChange={handleonchange}
                defaultValue={reqTask.task_delete_date}
              />
            </div>
          </div>
        </form>
      </div>
      <div className="d-flex justify-content-center">
        <NavLink to="/task" className="btn btn-primary float-right mb-3">
          Go To Tasks
        </NavLink>
        <button
          className="btn btn-primary float-right mb-3 mx-5"
          type="submit"
          onClick={sendData}
        >
          Submit
        </button>
      </div>
    </>
  );
};

export default EditTask;
