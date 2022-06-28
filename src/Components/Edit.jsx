import React, { useState, useEffect } from "react";
import Login from "./Login";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

const Edit = (props) => {
  var navigate_ = useNavigate();
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
    fetchProject();
  }, []);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [resJson, setresJson] = useState([]);
  const fetchProject = async () => {
    const res = await fetch(
      "https://thinkbeatsolutions.com/react/api/getprojects.php",
      {
        method: "POST",
        body: id,
      }
    );
    console.log(res);
    const resJson = await res.json();
    console.log("Message is :", resJson);
    setresJson(resJson);
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
      toast.error(resJson.error, {
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

  console.log("resJson is : ", resJson);
  const handleonchange = (e) => {
    setresJson({ ...resJson, [e.target.name]: e.target.value });
  };

  const sendData = async () => {
    const res = await fetch(
      "https://thinkbeatsolutions.com/react/api/update_project.php",
      {
        method: "POST",
        body: JSON.stringify(resJson),
      }
    );
    const response = await res.json();
    console.log("Response from update is : ", response);
    if (response.error) {
      toast.error(response.error, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
      });
    }
    if (response.success) {
      toast.success(response.success, {
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
    resJson && (
      <>
        <div className="container-fluid mt-3">
          <form>
            <div className="form-group ">
              <label htmlFor="inputName">Project Name</label>
              <input
                type="text"
                id="inputName"
                className="form-control"
                defaultValue={resJson.name}
                onChange={handleonchange}
                name="name"
              />
            </div>
            <div className="form-group ">
              <label htmlFor="inputName">Framework</label>
              <input
                type="text"
                id="inputName"
                className="form-control"
                defaultValue={resJson.framework}
                onChange={handleonchange}
                name="framework"
              />
            </div>
            <div className="form-group">
              <label htmlFor="inputStatus">Status</label>
              <select
                id="inputStatus"
                className="form-control custom-select"
                defaultValue={resJson.status}
                onChange={handleonchange}
                name="status"
              >
                <option disabled>Select one</option>
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
                defaultValue={resJson.date}
                onChange={handleonchange}
                name="date"
              />
              <input
                type="hidden"
                id="inputClientCompany"
                className="form-control"
                defaultValue={resJson.id}
                name="id"
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
      </>
    )
  );
};

export default Edit;
