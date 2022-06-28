import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const Task = (props) => {
  const navigate = useNavigate();
  const [Tasks, setTasks] = useState([]);
  const [ID, setID] = useState(NaN);
  const [Data, setData] = useState("");
  const [cmntJson, setcmntJson] = useState([]);
  const handleonchange = (e) => {
    setData({ ...Data, [e.target.name]: e.target.value });
  };
  const fetchApi = async () => {
    const url = `https://thinkbeatsolutions.com/react/api/get_tasks.php`;
    const res = await fetch(url);
    const resJson = await res.json();
    setTasks(resJson);
    // return resJson;
  };
  const sendData = async () => {
    const cmnt_id = {
      id: ID,
      comment: Data.comment,
      commenter: props.User.resJson.name,
      date: new Date().toLocaleDateString(),
      status:Data.status,
    };
    console.log("We are sending : ", JSON.stringify(cmnt_id));
    const res = await fetch(
      `https://thinkbeatsolutions.com/react/api/add_comment.php`,
      {
        method: "POST",
        body: JSON.stringify(cmnt_id),
      }
    );
    console.log(res);
    const resJson = await res.json();
    console.log(resJson);
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
  useEffect(() => {
    console.log("In useeffect");
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
    fetchApi();
  }, []);
  const getComment = async (id) => {
    const cmnt = await fetch(
      "https://thinkbeatsolutions.com/react/api/get_comment.php",
      {
        method: "POST",
        body: id,
      }
    );
    console.log("Response : ", cmnt);
    const _cmntJson = await cmnt.json();
    console.log("Response : ", _cmntJson);
    setcmntJson(_cmntJson);
    console.log("COmments are : ", cmntJson);
  };

  const deleteTask = async (id) => {
    const res = await fetch(
      "https://thinkbeatsolutions.com/react/api/delete_task.php",
      {
        method: "POST",
        body: id,
      }
    );
    const resJson = await res.json();
    if (resJson.success) {
      toast.success(resJson.success, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
      });
      fetchApi();
    } else {
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
  return (
    <>
      <div className="container-fluid mt-4">
        <NavLink
          className="btn btn-primary float-left mb-3 float-right mx-4"
          to="/addtask"
        >
          Add
        </NavLink>
        <NavLink
          className="btn btn-primary float-left mb-3 float-right"
          to="/admin"
        >
          Admin
        </NavLink>

        {/* BOOTSTRAP MODAL */}
        <div
          className="modal fade"
          id="exampleModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Add Comment
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="inputName">Comment</label>
                  <input
                    type="text"
                    id="inputName"
                    className="form-control"
                    name="comment"
                    onChange={handleonchange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="inputName">Status</label>
                <select
                id="inputStatus"
                className="form-control custom-select"
                onChange={handleonchange}
                name="status"
              >
                  <option key="Not Assigned" value="0">Not Assigned</option>
                  <option key="Assigned" value="1">Assigned</option>
                  <option key="In Progress" value="2">In Progress</option>
                  <option key="Finished" value="3">Finished</option>
                  <option key="Re-Open" value="4">Re-Open</option>
              </select>
              </div>
                <div className="scroll-table">
                  <table className="table">
                    <thead className="thead-dark ">
                      <tr>
                        <th scope="col">Comment ID</th>
                        <th scope="col">Comment</th>
                        <th scope="col">Commenter</th>
                        <th scope="col">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cmntJson.map((cmnt) => {
                        console.log("Comment in map : ", cmnt);
                        return (
                          <tr key={cmnt.tcm_id}>
                            <th scope="row">{cmnt.tcm_id}</th>
                            <td>{cmnt.task_comment}</td>
                            <td>{cmnt.Commenter}</td>
                            <td>{cmnt.Date}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={sendData}
                  data-dismiss="modal"
                  aria-label="Close"
                  id="closemodal"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>

        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th scope="col">Task ID</th>
              <th scope="col">Project ID</th>
              <th scope="col">Task Title</th>
              <th scope="col">Task Description</th>
              <th scope="col">Employee ID</th>
              <th scope="col">Hours</th>
              <th scope="col">Create Date</th>
              <th scope="col">Assign Date</th>
              <th scope="col">Delete Date</th>
              <th scope="col">Comment</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {Tasks.map((task) => {
              console.log("Task is :", task);
              return (
                <>
                  <tr>
                    <td scope="row">{task.task_id}</td>
                    <td scope="row">{task.project_id}</td>
                    <td scope="row">{task.task_title}</td>
                    <td scope="row">{task.task_description}</td>
                    <td scope="row">{task.emp_id}</td>
                    <td scope="row">{task.task_hours}</td>
                    <td scope="row">{task.task_create_date}</td>
                    <td scope="row">{task.task_assign_date}</td>
                    <td scope="row">{task.task_delete_date}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-primary"
                        data-toggle="modal"
                        data-target="#exampleModal"
                        onClick={() => {
                          setID(task.task_id);
                          getComment(task.task_id);
                        }}
                      >
                        Comment
                      </button>
                    </td>
                    <td>
                      <NavLink
                        className="btn btn-primary"
                        to={"/edittask?id=" + task.task_id}
                      >
                        Edit
                      </NavLink>
                    </td>
                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={() => deleteTask(task.task_id)}
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
export default Task;
