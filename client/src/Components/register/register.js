import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./register.css";
export default function Register() {
  const [user, setUser] = useState({});
  let navigate = useNavigate();
  const registerUser = () => {
    fetch("http://localhost:8000/api/register", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        navigate("/login");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="register">
      <div className="register_form">
        <h2 className="form_heading">register</h2>
        <form className="form" autoComplete="off">
          <input
            type="text"
            placeholder="first Name..."
            onChange={(event) => {
              setUser({ ...user, firstname: event.target.value });
            }}
          />
          <input
            type="text"
            placeholder="last Name..."
            onChange={(event) => {
              setUser({ ...user, lastname: event.target.value });
            }}
          />

          <input
            type="text"
            placeholder="Email..."
            onChange={(event) => {
              setUser({ ...user, email: event.target.value });
            }}
          />
          <input
            type="text"
            placeholder="phone no..."
            onChange={(event) => {
              setUser({ ...user, phone: event.target.value });
            }}
          />
          <input
            type="text"
            placeholder="address"
            onChange={(event) => {
              setUser({ ...user, address: event.target.value });
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
              registerUser();
            }}
          >
            register me
          </button>
        </form>
        <p className="text">
          Already registred ?<Link to="/login">login</Link>
        </p>
      </div>
    </div>
  );
}
