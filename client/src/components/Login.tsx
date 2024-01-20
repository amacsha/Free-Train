import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import logo from "../assets/FreeTrainLogo.png";
import { setUser } from "../slices/userSlice";
import { User } from "../user";
import { RootState } from "../store";



function Login() {
  //functional hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //local states
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [problem, setProblem] = useState<string>("");

  //global states
  // const user: User = useSelector((state: RootState) => state.user);

  //functions to update input boxes
  function updateEmail(e: React.ChangeEvent<HTMLInputElement>): void {
    setEmail(e.target.value);
  }

  function updatePassword(e: React.ChangeEvent<HTMLInputElement>): void {
    setPassword(e.target.value);
  }

  //authentication and validation from the server
  function checkEmailAndPassword(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
    e.preventDefault();

    //ensures all boxes are filled
    if (email == "") {
      setProblem("enter your email");
      return;
    } else if (password == "") {
      setProblem("enter your password");
      return;
    }

    //sets up form data
    let data = new FormData();
    data.append("email", email);
    data.append("password", password);

    //sends the axios request to the server, sets the user state to the username or the local problem state to the problem
    axios
      .post<User>("http://localhost:3000/user/checkUser", data, {
        withCredentials: true,
      })
      .then((res) => {
        dispatch(setUser(res.data.username));
        navigate("/mapScreen");
      })
      .catch((error) => {
        console.log(error);
        setProblem(error.response.data.status);
      });
  }

  return (
    <div id="login">
      <div className="logoSide">
        <div className="logoDiv">
          <img src={logo} alt="" width="150px" />
          <h1>Free-train</h1>
        </div>
      </div>
      <div className="formSide">
        <form onSubmit={() => checkEmailAndPassword}>
          <div className="login-form-item">
            <label htmlFor="email">Enter you email</label>
            <input
              type="email"
              id="email"
              placeholder="example@domain.com"
              onChange={updateEmail}
              value={email}
            />
          </div>
          <div className="login-form-item">
            <label htmlFor="password">Enter you password</label>
            <input
              type="password"
              id="password"
              onChange={updatePassword}
              value={password}
            />
          </div>
          {problem == "" ? null : (
            <h2 className="problem-display">{problem}</h2>
          )}
          <button type="submit" className="login-button" onClick={checkEmailAndPassword}>
            Log in
          </button>
          <Link to="/register">
            <button className="login-button">Register</button>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
