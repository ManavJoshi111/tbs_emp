import React from "react";
import { useNavigate } from "react-router";

const Logout = (props) => {
  const navigate = useNavigate();
  props.setToggle(false);
  navigate("../signup");
  return <div>Logout</div>;
};

export default Logout;
