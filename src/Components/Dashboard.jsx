import React from "react";
import { useEffect } from "react";
import { Navigate } from "react-router";
import { toast } from "react-toastify";

const Dashboard = () => {
  useEffect(() => {
    console.log("Dashboard");
    check();
  }, []);
  const check = async () => {
    const res = await fetch("/dashboard.php", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    console.log(res);
    const resJson = await res.json();
    console.log("Response from dashboard is :", resJson);

    if (resJson.error) {
      toast.error(resJson.error, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
      });
      // Navigate("../login");
      return;
    }
    // if (resJson.success) {
    console.log("IN dashboard");
    return (
      <>
        <h3>IN return</h3>
        <center>
          <section className="h-100 gradient-custom-2">
            <div className="container py-5 h-100">
              <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col col-lg-9 col-xl-7">
                  <div className="card">
                    <center>
                      <div className="ms-4  d-flex flex-column justify-content-center">
                        <center>
                          <img
                            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
                            alt="Generic placeholder image"
                            className="img-fluid img-thumbnail mt-4 mb-2"
                            width="200px"
                          />
                        </center>
                        <button
                          type="button"
                          className="btn btn-outline-dark"
                          data-mdb-ripple-color="dark"
                        >
                          Edit profile
                        </button>
                      </div>
                    </center>
                    <div className="mt-3 text-black">
                      <div className="d-flex justify-content-center text-center py-1">
                        <div>
                          <p className="mb-1 h5">253</p>
                          <p className="small text-muted mb-0">Photos</p>
                        </div>
                        <div className="px-3">
                          <p className="mb-1 h5">1026</p>
                          <p className="small text-muted mb-0">Followers</p>
                        </div>
                        <div>
                          <p className="mb-1 h5">478</p>
                          <p className="small text-muted mb-0">Following</p>
                        </div>
                      </div>
                    </div>
                    <div className="text-black mt-2">
                      <div className="mb-5">
                        <p className=" font-weight-bold h2 mb-1">Information</p>
                        <div>
                          <p className="font-weight-normal text-decoration-none mb-1">
                            {resJson.designation}
                          </p>
                          <p className="font-weight-normal text-decoration-none mb-0">
                            {resJson.name}
                          </p>
                          <a
                            className="font-weight-normal text-decoration-none mb-1"
                            href={"mailto:" + resJson.email}
                          >
                            Email
                          </a>
                          <br />
                          <a
                            className="font-weight-normal text-decoration-none mb-0"
                            href={resJson.facebook}
                          >
                            Facebook
                          </a>
                          <br />
                          <a
                            className="font-weight-normal text-decoration-none mb-0"
                            href={resJson.github}
                          >
                            Github
                          </a>
                          <br />
                          <a
                            className="font-weight-normal text-decoration-none mb-0"
                            href={resJson.instagram}
                          >
                            Instagram
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </center>
      </>
    );
    // }
  };
};

export default Dashboard;
