import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import axios from "axios";
import logo from "../assets/FreeTrainLogo.png";
import { setUser } from "../slices/userSlice";
import { RootState } from "../store";

import './Register.css'

function Register() {
  //functional components
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //global states
  const user = useSelector((state: RootState) => state.user);

  //local states
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [problem, setProblem] = useState<string>("");

  //updates all of the inputs
  const updateState = (
    setter: Function,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setter(e.target.value);
  };

  function sendUser(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    //ensures all inputs have something in them
    if (email == "") {
      setProblem("enter an email");
      return;
    } else if (username == "") {
      setProblem("enter a username");
      return;
    } else if (password == "") {
      setProblem("enter a password");
      return;
    } else if (confirmPassword == "") {
      setProblem("please confirm your password");
      return;
    } else if (confirmPassword != password) {
      setProblem("Ensure passwords match");
      return;
    }

    //sets up data object to send
    const data = new FormData();
    data.append("email", email);
    data.append("username", username);
    data.append("password", password);

    //sends data to the server to be added, if it is successful the user is logged in
    axios
      .post("http://localhost:3000/user/createUser", data, {
        withCredentials: true,
      })
      .then((res) => {
        dispatch(setUser(username));
        localStorage.setItem("username", username);
        navigate("/mapScreen");
      })
      .catch((error) => {
        console.log(error);
        setProblem(error.response.data.status);
      });
  }

  return (
    <div id="register">
      <div className="logoSide">
        <div className="logoDiv">
          <img src={logo} alt="" width="150px" />
          <h1>Free-train</h1>
        </div>
      </div>
      <div className="formSide">
        <form onSubmit={sendUser}>
          <div className="login-form-item">
            <label htmlFor="email">Enter your email</label>
            <input
              type="email"
              onChange={(e) => updateState(setEmail, e)}
              value={email}
              id="email"
              placeholder="example@domain.com"
            />
          </div>
          <div className="login-form-item">
            <label htmlFor="username">Choose a username</label>
            <input
              type="text"
              onChange={(e) => updateState(setUsername, e)}
              value={username}
              id="username"
              placeholder="user123"
            />
          </div>
          <div className="login-form-item">
            <label htmlFor="password">Create a secure password</label>
            <input
              type="password"
              onChange={(e) => updateState(setPassword, e)}
              value={password}
              id="password"
            />
          </div>
          <div className="login-form-item">
            <label htmlFor="confirmPassword">
              Confirm your secure password
            </label>
            <input
              type="password"
              onChange={(e) => updateState(setConfirmPassword, e)}
              value={confirmPassword}
              id="confimPassword"
            />
          </div>
          {problem == "" ? null : (
            <h2 className="problem-display">{problem}</h2>
          )}
          <div className="btnDiv">
            <button type="submit" title="Register" className="login-button">
              Register
            </button>
            <Link to="/">
              <button type="button" className="login-button">
                Log in
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
