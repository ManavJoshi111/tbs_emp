import React, { useState, useEffect } from "react";
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
  console.log("Id is : ", id);
  const [resJson, setresJson] = useState([]);
  const fetchProject = async () => {
    const res = await fetch(
      "https://thinkbeatsolutions.com/react/api/get_employee.php",
      {
        method: "POST",
        body: id,
      }
    );
    console.log(res);
    const resJson = await res.json();
    console.log("Message is :", resJson);
    setresJson(resJson);
  };

  console.log("resJson is : ", resJson);
  const handleonchange = (e) => {
    setresJson({ ...resJson, [e.target.name]: e.target.value });
  };

  const sendData = async () => {
    const res = await fetch(
      "https://thinkbeatsolutions.com/react/api/update_employee.php",
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
      navigate("../employee");
    }
  };

  return (
    resJson && (
      <>
        <div className="container-fluid mt-3">
          <form>
            <div className="form-group ">
              <label htmlFor="inputName">Employee Name</label>
              <input
                type="text"
                id="inputName"
                className="form-control"
                defaultValue={resJson.name}
                onChange={handleonchange}
                name="name"
              />
            </div>
            <div className="input-group d-flex justify-content-between">
              <div className="form-group ">
                <label htmlFor="inputName">Designation</label>
                <input
                  type="text"
                  id="inputName"
                  className="form-control"
                  defaultValue={resJson.designation}
                  onChange={handleonchange}
                  name="designation"
                />
              </div>
              <div className="form-group ">
                <label htmlFor="inputName">Email</label>
                <input
                  type="text"
                  id="inputName"
                  className="form-control"
                  defaultValue={resJson.email}
                  onChange={handleonchange}
                  name="email"
                />
              </div>
              <div className="form-group ">
                <label htmlFor="inputName">Phone</label>
                <input
                  type="text"
                  id="inputName"
                  className="form-control"
                  defaultValue={resJson.phone}
                  onChange={handleonchange}
                  name="phone"
                />
              </div>
            </div>
            <div className="form-group ">
              <label htmlFor="inputName">Instagram</label>
              <input
                type="text"
                id="inputName"
                className="form-control"
                defaultValue={resJson.instagram}
                onChange={handleonchange}
                name="instagram"
              />
            </div>
            <div className="form-group ">
              <label htmlFor="inputName">Facebook</label>
              <input
                type="text"
                id="inputName"
                className="form-control"
                defaultValue={resJson.facebook}
                onChange={handleonchange}
                name="facebook"
              />
            </div>
            <div className="form-group ">
              <label htmlFor="inputName">Github</label>
              <input
                type="text"
                id="inputName"
                className="form-control"
                defaultValue={resJson.github}
                onChange={handleonchange}
                name="github"
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
