import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../register/register.css";
export default function Login() {
  const [user, setUser] = useState({});
  const [valid, setValid] = useState(null);
  let navigate = useNavigate();
  const loginUser = () => {
    fetch("http://localhost:8000/api/login", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
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
        localStorage.setItem("jwt_token", data.token);
        navigate("/profile");
      })
      .catch((err) => {
        setValid(false);
      });
  };
  return (
    <div className="register">
      <div className="register_form">
        <h2 className="form_heading">login</h2>
        <form className="form" autoComplete="off">
          <input
            type="text"
            placeholder="Email..."
            onChange={(event) => {
              setUser({ ...user, email: event.target.value });
            }}
          />
          <input
            type="password"
            placeholder="Password..."
            onChange={(event) => {
              setUser({ ...user, password: event.target.value });
            }}
          />
          <button
            type="submit"
            className="btn"
            onClick={(event) => {
              event.preventDefault();
              loginUser();
            }}
          >
            login
          </button>
        </form>
        <p className="text">
          Not registred ?<Link to="/register">register me</Link>
        </p>
      </div>
    </div>
  );
}
