"use client";

import React, { useState } from "react";
import "./style.css";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { IonIcon } from "@ionic/react";
import { close, person, mail, lockClosed } from "ionicons/icons";

const Home = () => {
  const [isLoginActive, setIsLoginActive] = useState(false);
  const [isPopupActive, setIsPopupActive] = useState(false);

  const handleSignupClick = () => {
    setIsLoginActive(true);
  };

  const handleLoginClick = () => {
    setIsLoginActive(false);
  };

  const handlePopupClick = () => {
    setIsPopupActive(true);
  };

  const handleCloseClick = () => {
    setIsPopupActive(false);
  };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res.error) {
        setError("Invalid Credentials");
        return;
      }

      router.replace("dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError("All fields are necessary.");
      return;
    }

    try {
      const resUserExists = await fetch("api/userExists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const { user } = await resUserExists.json();

      if (user) {
        setError("User already exists.");
        return;
      }

      const res = await fetch("api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      if (res.ok) {
        const form = e.target;
        form.reset();
        router.push("/");
        handleLoginClick();
      } else {
        setError("Registration Failed");
        console.error("Registration Failed", error);
      }

      if (res.ok) {
        const form = e.target;
        form.reset();
        router.push("/");
        handleLoginClick();
      } else {
        console.log("Registration Failed", error);
      }
    } catch (error) {}
  };

  return (
    <div className="my">
    <div>
      <header>
        <h2 className="logo">PaintRouteX</h2>
        <nav className="navigation">
          <a href="#">Home</a>
          <a href="#">Features</a>
          <a href="#">Products</a>
          <a href="#">Support</a>
          <button className="btnLogin-popup" onClick={handlePopupClick}>
            Login
          </button>
        </nav>
      </header>

      <div
        className={`wrapper ${isPopupActive ? "active-popup" : ""} ${
          isLoginActive ? "active" : ""
        }`}
      >
        <span className="icon-close" onClick={handleCloseClick}>
          <IonIcon icon={close} />
        </span>

        <div className={`form-box login ${isLoginActive ? "" : "active"}`}>
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <div className="input-box">
              <span className="icon">
                <IonIcon icon={person} />
              </span>
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                placeholder="Email"
              />
              <label>Email</label>
            </div>
            <div className="input-box">
              <span className="icon">
                <IonIcon icon={lockClosed} />
              </span>
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
              />
              <label>Password</label>
            </div>
            <div className="remember-forgot">
              <label>
                <input type="checkbox" />
                Remember me
              </label>
              <a href="#">Forgot Password?</a>
            </div>
            <div>{error}</div>
            <button type="submit" className="btn">
              Login
            </button>
            <div className="login-register">
              <p>
                Don't have an account?{" "}
                <a href="#" className="signup-link" onClick={handleSignupClick}>
                  Sign Up
                </a>
              </p>
            </div>
          </form>
        </div>

        <div className={`form-box signup ${isLoginActive ? "active" : ""}`}>
          <h2>Sign up</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-box">
              <span className="icon">
                <IonIcon icon={person} />
              </span>
              <input
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Full Name"
              />
              <label>Username</label>
            </div>
            <div className="input-box">
              <span className="icon">
                <IonIcon icon={mail} />
              </span>
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                placeholder="Email"
              />
              <label>Email</label>
            </div>
            <div className="input-box">
              <span className="icon">
                <IonIcon icon={lockClosed} />
              </span>
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
              />
              <label>Password</label>
            </div>
            <div className="remember-forgot">
              <label>
                <input type="checkbox" /> I agree to the terms & conditions
              </label>
            </div>
            <div>{error}</div>
            <button type="submit" className="btn">
              Sign up
            </button>
            <div className="login-register">
              <p>
                Already have an account?{" "}
                <a href="#" className="login-link" onClick={handleLoginClick}>
                  Login
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Home;
