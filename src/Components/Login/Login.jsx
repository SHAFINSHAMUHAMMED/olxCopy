import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FirebaseContext } from "../../store/Context";
import { signInWithEmailAndPassword } from "firebase/auth";

import Logo from "../../olx-logo.png";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { auth } = useContext(FirebaseContext);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)) {
      alert("Please enter a valid email address.");
      return;
    }
    if (password.trim() === "" || password.length < 6) {
      alert("Please enter valid password.");
      return;
    }
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div>
      <div className="loginParentDiv container d-flex flex-column align-items-center">
        <img
          className="logo"
          width="150px"
          height="150px"
          src={Logo}
          alt="Logo"
        />
        <form onSubmit={handleLogin}>
          <div className="form-group mb-3">
            <label className="mb-1" htmlFor="email">
              Email
            </label>
            <input
              className="form-control"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              name="email"
              placeholder="Enter email"
            />
          </div>
          <div className="form-group mb-3">
            <label className="mb-1" htmlFor="password">
              Password
            </label>
            <input
              className="form-control"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              name="password"
              placeholder="Enter password"
            />
          </div>
          <button className="btn btn-primary">Login</button>
        </form>
        <div className="d-flex justify-content-center">
          <p className="mt-3">
            Don't have an account?{" "}
            <a onClick={() => navigate("/signup")}>Signup</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
