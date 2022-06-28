import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import "../Styles/devprofile.css";

const DevProfile = (props) => {
  const navigate = useNavigate();
  console.log(props);
  const [resJson, setresJson] = useState([]);
  const [empTask, setEmpTask] = useState([]);
  const [ID,setID]=useState()
  const [Data, setData] = useState("")
  const [cmntJson, setcmntJson] = useState([])
    const handleonchange = (e) => {
      setData({ ...Data, [e.target.name]: e.target.value });

    };
    const sendData = async (id) => {
      const cmnt_id = {
        id: ID,
        comment: Data.comment,
        commenter: props.User.resJson.name,
        date: new Date().toLocaleDateString(),
        status:Data.status,
      };
      const res = await fetch(
        `https://thinkbeatsolutions.com/react/api/add_comment.php`,
        {
          method: "POST",
          body: JSON.stringify(cmnt_id),
        }
      );
      const resJson = await res.json();
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
        navigate("../devprofile");
      }
    };
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
  useEffect(() => {
    if (!props.Toggle) {
      toast.error("You are not logged in ", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      navigate("../login");
    }
    fetchUser();

    const getTask = async () => {
      const res = await fetch(
        "https://thinkbeatsolutions.com/react/api/get_emp_tasks.php",
        {
          method: "POST",
          body: props.User.resJson.id,
        }
      );
      const empTasks = await res.json();
      console.log("Resjson is : ", resJson);
      setEmpTask(empTasks);
    };
    getTask();
  }, []);
  const fetchUser = async () => {
    const res = await fetch(
      "https://thinkbeatsolutions.com/react/api/get_employee.php",
      {
        method: "POST",
        body: props.User.resJson.id,
      }
    );
    const UserData = await res.json();
    console.log("Got the data : ", UserData);
    setresJson(UserData);
    console.log(resJson);
  };

  if (resJson.id) {
    return (
      <>
        <div className="container-md emp-profile">
          <form method="post">
            <div className="row d-flex justify-content-center align-items-center">
              <div className="col-md-4 ">
                <div className="profile-img">
                  <img
                    src={
                      "https://thinkbeatsolutions.com/react/images/" +
                      resJson.id +
                      ".jpg"
                    }
                    className="mb-4"
                    alt="Employee Image"
                    width="125"
                  />
                </div>
              </div>
            </div>
            <div className="row ">
              <div className="col-md-12 d-flex justify-content-center align-items-center">
                <div className="tab-content profile-tab" id="myTabContent">
                  <div
                    className="tab-pane fade show active"
                    id="home"
                    role="tabpanel"
                    aria-labelledby="home-tab"
                  >
                    <div className="row">
                      <div className="col-md-6">
                        <label>Name</label>
                      </div>
                      <div className="col-md-6">
                        <p>{resJson.name}</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <label>Email</label>
                      </div>
                      <div className="col-md-6">
                        <p>{resJson.email}</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <label>Phone</label>
                      </div>
                      <div className="col-md-6">
                        <p>{resJson.phone}</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <label>Designation</label>
                      </div>
                      <div className="col-md-6">
                        <p>{resJson.designation}</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <label>Facebook</label>
                      </div>
                      <div className="col-md-6">
                        <a href={resJson.facebook} target="_blank">
                          Facebook
                        </a>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <label>Instagram</label>
                      </div>
                      <div className="col-md-6">
                        <a href={resJson.instagram} target="_blank">
                          Instagram
                        </a>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <label>Github</label>
                      </div>
                      <div className="col-md-6">
                        <a href={resJson.github} target="_blank">
                          Github
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>


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
                  Review Task
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
          <h1 className="h1 text-center mt-4 text-uppercase mb-2">
            Your Tasks
          </h1>
          <table class="table border">
            <thead>
              <tr>
                <th scope="col">Sr No.</th>
                <th scope="col">Task Name</th>
                <th scope="col">Review</th>
              </tr>
            </thead>
            <tbody>
              {empTask.map((task, index) => {
                return (
                  <tr key={index}>
                    <td scope="row">{index + 1}</td>
                    <td>{task.task_title}</td>
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
                        Review
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </>
    );
  } else {
  }
};
export default DevProfile;
