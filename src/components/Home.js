import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const Home = () => {
  const [name, setName] = useState("");
  const [navigate, setNavigate] = useState(false);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("http://localhost:8000/user");
        setName(data.name);
      } catch (e) {
        setNavigate(true);
      }
    })();
  }, []);
  const logOut = async () => {
    await axios.post("logOut", {}, { withCredentials: true });
    setNavigate(true);
  };
  if (navigate) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="form-signin mt-5 text-center">
      <h3>Hi {name}</h3>
      <a
        href="javascript:void(0)"
        onClick={logOut}
        className="btn btn-lg btn-primary"
      >
        LogOut
      </a>
    </div>
  );
};

export default Home;
