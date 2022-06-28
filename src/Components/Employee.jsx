import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { NavLink, useNavigate } from "react-router-dom";
import Admin from "./Admin";

const Employee = (props) => {
  const [Data, setEmployee] = useState([]);
  const fetchData = async () => {
    const res = await fetch(
      "https://thinkbeatsolutions.com/react/api/get_employee.php",
      {
        method: "GET",
      }
    );
    const resJson = await res.json();
    setEmployee(resJson);
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
  };
  const navigate = useNavigate();
  console.log("User in admin ", props.User);
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
      navigate("../login");
      return;
    }
    fetchData();
  }, []);

  const deleteEmployee = async (id) => {
    console.log("id is :", id);
    const res = await fetch(
      "https://thinkbeatsolutions.com/react/api/delete_employee.php",
      {
        method: "POST",
        body: id,
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
      toast.error(resJson.success, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
      });
      fetchData();
    }
  };
  return (
    <>
      <div className="container mt-4">
        <NavLink
          className="btn btn-primary float-left mb-3 float-right mx-5"
          to="/addemployee"
        >
          Add
        </NavLink>
        <NavLink
          className="btn btn-primary float-left mb-3 float-right"
          to="/admin"
        >
          Admin
        </NavLink>
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th scope="col">Employee Id</th>
              <th scope="col">Employee Name</th>
              <th scope="col">Designation</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">Instagram</th>
              <th scope="col">Facebook</th>
              <th scope="col">Github</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {Data.map((employee) => {
              console.log("Employee are :", employee.name);
              return (
                <>
                  <tr>
                    <th scope="row">{employee.id}</th>
                    <td>{employee.name}</td>
                    <td>{employee.designation}</td>
                    <td>{employee.email}</td>
                    <td>{employee.phone}</td>
                    <td>
                      <a href={employee.instagram}>Instagram</a>
                    </td>
                    <td>
                      <a href={employee.facebook}>Facebook</a>
                    </td>
                    <td>
                      <a href={employee.github}>Github</a>
                    </td>

                    <td>
                      <NavLink
                        className="btn btn-primary"
                        to={"/editemployee?id=" + employee.id}
                      >
                        Edit
                      </NavLink>
                    </td>
                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={() => deleteEmployee(employee.id)}
                      >
                        Remove
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

export default Employee;
