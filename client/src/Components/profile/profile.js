import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./profile.css";
export default function Profile() {
  const [user, setUser] = useState({});
  let navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("jwt_token");
    fetch("http://localhost:8000/api/me", {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          throw new Error(res.status);
        }
      })
      .then((data) => {
        setUser(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const logout = () => {
    localStorage.removeItem("jwt_token");
    navigate("/login");
  };

  return (
    <div className="profile">
      <h1>Profile</h1>
      <p>firstname : {user.firstname}</p>
      <p>lastname : {user.lastname}</p>
      <p>phone : {user.phone}</p>
      <p>email : {user.email}</p>
      <p>address: {user.address}</p>
      <button className="profile_btn" onClick={logout}>
        logout
      </button>
    </div>
  );
}
