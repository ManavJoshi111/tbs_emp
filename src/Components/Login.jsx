import React, { useState } from "react";
import { useNavigate } from "react-router";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";

const Login = (props) => {
  const navigate = useNavigate();
  const initialata = {
    email: "",
    password: "",
  };
  const [data, setData] = useState(initialata);
  const handleonchange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    console.log("Data in handleonchange : ", data);
  };
  const sendData = async () => {
    console.log("Data in sendData : ", data);
    const { email, password } = data;
    console.log(email, password);
    if (email == "" || password == "") {
      toast.warn("Please Fill All The Fields", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    const res = await fetch(
      "https://thinkbeatsolutions.com/react/api/login.php",
      {
        method: "POST",
        body: JSON.stringify({ email, password }),
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
    if (resJson.admin === 1) {
      console.log("User is : ", props.User);
      props.setUser({ resJson });
      console.log(props.User);
      props.setToggle(true);
      navigate("../admin");
      return;
    }
    if (resJson.success) {
      props.setUser({ resJson });
      console.log("User is simple user  :", props.User);
      props.setToggle(true);
      toast.success(resJson.success, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
      });
      navigate("../devprofile");
      return;
    }
  };
  return (
    <>
      <div className="content mt-5">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <center>
                <img
                  src="https://preview.colorlib.com/theme/bootstrap/login-form-07/images/undraw_remotely_2j6y.svg"
                  alt="Image"
                  className="img-fluid cvimage mt-5"
                />
              </center>
            </div>
            <div className="col-md-6 contents mt-5">
              <div className="row justify-content-center">
                <div className="col-md-8">
                  <div className="mb-4">
                    <h3 id="color" className="fw-bold h1">
                      Log In
                    </h3>
                  </div>
                  <form>
                    <div className="form-group first">
                      <input
                        type="text"
                        className="form-control"
                        name="email"
                        placeholder="Email"
                        id="email"
                        onChange={handleonchange}
                      />
                    </div>
                    <div className="form-group first">
                      <input
                        type="text"
                        className="form-control mt-3"
                        name="password"
                        placeholder="Password"
                        id="pswd"
                        onChange={handleonchange}
                      />
                    </div>
                    <div className="d-flex mb-3 mt-1 align-items-center">
                      <span className="ml-auto">
                        <NavLink
                          to="/signup"
                          className="loginredirect text-decoration-none"
                        >
                          Don't Have Account ?
                        </NavLink>
                      </span>
                    </div>
                    <input
                      type="button"
                      value="Log In"
                      className="btn btn-primary"
                      id="lbtn"
                      onClick={sendData}
                    />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
