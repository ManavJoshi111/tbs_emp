import React, { useEffect, useState } from "react";
import "../Styles/Profile.css";

const Profile = () => {
  const fetchApi = async () => {
    const url = `https://thinkbeatsolutions.com/react/api/get_employee.php`;
    const res = await fetch(url);
    const resJson = await res.json();
    setEmp(resJson);
    // return resJson;
  };
  const [Emp, setEmp] = useState([]);
  useEffect(() => {
    fetchApi();
    // setEmp(fetchApi());
    // console.log("ldjf");
  }, []);
  return (
    <>
      <div className="container-fluid d-flex flex-column flex-md-row justify-content-center align-items-center mt-5">
        {Emp.length > 0
          ? Emp.map((data) => {
              console.log(data);
              if (data.role != 1) {
                return (
                  <div className="card mx-3 mb-3">
                    <div className="user text-center d-flex justify-content-center align-items-center">
                      <img
                        src={
                          "https://thinkbeatsolutions.com/react/images/" +
                          data.id +
                          ".jpg"
                        }
                        className=" mt-3"
                        width="100px"
                        height="130px"
                      />
                    </div>
                    <div className="mt-5 text-center">
                      <h4 className="mb-0">{data.name}</h4>
                      <span className="text-muted d-block mb-2">
                        {data.designation}
                      </span>
                      <div className="d-flex justify-content-around align-items-center mt-4 px-4">
                        <div className="stats">
                          <span>15</span>
                          <h6 className="mb-0">Work Orders</h6>
                        </div>
                        <div className="stats">
                          <span>32</span>
                          <h6 className="mb-0">Tasks</h6>
                        </div>
                        <div className="stats">
                          <span>4</span>
                          <h6 className="mb-0">Roles</h6>
                        </div>
                      </div>
                      <button className="btn btn-primary btn-lg follow mt-3 mb-2">
                        View Profile
                      </button>
                    </div>
                  </div>
                );
              }
            })
          : ""}
      </div>
    </>
  );
};
export default Profile;
