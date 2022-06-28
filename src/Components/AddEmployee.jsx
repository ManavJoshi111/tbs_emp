import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import Employee from "./Employee";

const AddEmployee = (props) => {
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
    name: "",
    designation: "",
    email: "",
    phone: "",
    instagram: "",
    facebook: "",
    github: "",
  };
  const [Employee, setEmployee] = useState(initialValue);
  const handleonchange = (e) => {
    console.log("e.target.name is :", e.target.name);
    console.log("e.target.value is :", e.target.value);
    setEmployee({ ...Employee, [e.target.name]: e.target.value });
    console.log("Employee :", Employee);
  };
  const sendData = async (e) => {
    e.preventDefault();
    console.log("Sended Employee is : ", Employee);
    const res = await fetch(
      "https://thinkbeatsolutions.com/react/api/insert_employee.php",
      {
        method: "POST",
        body: JSON.stringify(Employee),
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
      navigate("../employee");
    }
  };
  return (
    <>
      <div className="container-fluid mt-3">
        <form>
          <div className="form-group ">
            <label htmlFor="inputName">Employee Name</label>
            <input
              type="text"
              id="inputName"
              className="form-control"
              name="name"
              onChange={handleonchange}
            />
          </div>
          <div className="input-group d-flex justify-content-between">
            <div className="form-group ">
              <label htmlFor="inputName">Designation</label>
              <input
                type="text"
                id="inputName"
                className="form-control"
                name="designation"
                onChange={handleonchange}
              />
            </div>
            <div className="form-group ">
              <label htmlFor="inputName">Email</label>
              <input
                type="text"
                id="inputName"
                className="form-control"
                name="email"
                onChange={handleonchange}
              />
            </div>
            <div className="form-group ">
              <label htmlFor="inputName">Phone</label>
              <input
                type="text"
                id="inputName"
                className="form-control"
                name="phone"
                onChange={handleonchange}
              />
            </div>
          </div>
          <div className="form-group ">
            <label htmlFor="inputName">Instagram</label>
            <input
              type="text"
              id="inputName"
              className="form-control"
              name="instagram"
              onChange={handleonchange}
            />
          </div>
          <div className="form-group ">
            <label htmlFor="inputName">Facebook</label>
            <input
              type="text"
              id="inputName"
              className="form-control"
              name="facebook"
              onChange={handleonchange}
            />
          </div>
          <div className="form-group ">
            <label htmlFor="inputName">Github</label>
            <input
              type="text"
              id="inputName"
              className="form-control"
              name="github"
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
      <NavLink to="/Employee" className="btn btn-primary float-right">
        Go To Employee
      </NavLink>
    </>
  );
};

export default AddEmployee;
