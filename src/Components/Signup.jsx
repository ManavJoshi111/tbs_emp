import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";

const Signup = () => {
  const initialvalue = {
    name: "",
    designation: "",
    email: "",
    contact: "",
    password: "",
    instagram: "",
    facebook: "",
    github: "",
  };
  const [Data, setData] = useState(initialvalue);
  const handleonchange = (e) => {
    setData({ ...Data, [e.target.name]: e.target.value });
    console.log("Data in handleonchange : ", Data);
  };

  const sendData = async (e) => {
    e.preventDefault();
    const {
      name,
      designation,
      email,
      contact,
      password,
      instagram,
      facebook,
      github,
    } = Data;
    const stringdata = JSON.stringify({
      name,
      designation,
      email,
      contact,
      password,
      instagram,
      facebook,
      github,
    });

    console.log(stringdata);
    const res = await fetch(
      "https://thinkbeatsolutions.com/react/api/insert_data.php",
      {
        method: "POST",
        body: stringdata,
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
      toast.success("Account Created", {
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
      <div className="content mt-4">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <center>
                <img
                  src="https://preview.colorlib.com/theme/bootstrap/login-form-07/images/undraw_remotely_2j6y.svg"
                  alt="Image"
                  className="img-fluid cvimage mt-5 pt-5"
                />
              </center>
            </div>
            <div className="col-md-6 contents mt-5">
              <div className="row justify-content-center">
                <div className="col-md-8">
                  <div className="mb-4">
                    <h3 id="color" className="fw-bold h1">
                      Sign Up
                    </h3>
                  </div>
                  <form method="post">
                    <div className="form-group first">
                      <input
                        type="text"
                        className="form-control mt-4"
                        placeholder="Name"
                        id="name"
                        name="name"
                        onChange={handleonchange}
                        required={true}
                      />
                    </div>
                    <div className="form-group first">
                      <input
                        type="text"
                        className="form-control mt-4"
                        placeholder="Designation"
                        id="desg"
                        name="designation"
                        onChange={handleonchange}
                        required={true}
                      />
                    </div>
                    <div className="form-group first">
                      <input
                        type="text"
                        className="form-control mt-3"
                        placeholder="Email"
                        id="email"
                        name="email"
                        onChange={handleonchange}
                        required={true}
                      />
                    </div>
                    <div className="form-group first">
                      <input
                        type="text"
                        className="form-control mt-3"
                        placeholder="Contact Number"
                        id="con"
                        name="contact"
                        onChange={handleonchange}
                        required={true}
                      />
                    </div>
                    <div className="form-group first">
                      <input
                        type="password"
                        className="form-control mt-3"
                        placeholder="Password"
                        id="pswd"
                        name="password"
                        onChange={handleonchange}
                        required={true}
                      />
                    </div>
                    <div className="form-group first">
                      <input
                        type="text"
                        className="form-control mt-3"
                        placeholder="Instagram"
                        id="insta"
                        name="instagram"
                        onChange={handleonchange}
                      />
                    </div>
                    <div className="form-group first">
                      <input
                        type="text"
                        className="form-control mt-3"
                        placeholder="Facebook"
                        id="fb"
                        name="facebook"
                        onChange={handleonchange}
                      />
                    </div>
                    <div className="form-group first">
                      <input
                        type="text"
                        className="form-control mt-3"
                        placeholder="Github"
                        id="github"
                        name="github"
                        onChange={handleonchange}
                      />
                    </div>

                    <div className="d-flex mb-3 mt-1 align-items-center">
                      <span className="ml-auto">
                        <NavLink
                          to="/login"
                          className="loginredirect text-decoration-none"
                        >
                          Already Have Account ?
                        </NavLink>
                      </span>
                    </div>
                    <input
                      type="submit"
                      value="Sign Up"
                      className="btn btn-primary mb-5"
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

export default Signup;
