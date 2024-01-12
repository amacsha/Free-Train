import { useState } from "react";
import axios from "axios";
import logo from '../assets/FreeTrainLogo.png'
import { Link } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  function updateUsername(e) {
    setUsername(e.target.value)
  }

  function updatePassword(e) {
    setPassword(e.target.value)
  }

  function updateEmail(e) {
    setEmail(e.target.value)
  }

  function updateConfirmPassword(e) {
    setConfirmPassword(e.target.value)
  }

  function sendUser(e) {
    e.preventDefault()
    if(email == "") {
      console.log("enter an email")
      return
    } else if (username == "") {
      console.log("enter a username")
      return
    } else if(password == "") {
      console.log("enter a password")
      return
    } else if(confirmPassword == "") {
      console.log("please confirm your password")
      return
    }
    const data = new FormData()
    data.append("email", email)
    data.append("username", username)
    data.append("password", password)
    axios.post("http://localhost:3000/user/createUser", data).then(res => {
      props.setUser(username)
      navigate("/mapScreen")
    })
  }
  return ( 
    <div id="register">
      <div className="logoSide">
        <div className="logoDiv">
          <img src={logo} alt="" width="150px"/>
          <h1>Free-train</h1>
        </div>
      </div>
      <div className="formSide">
        <form onSubmit={sendUser}>       
          <div className="login-form-item">
            <label htmlFor="email">Enter your email</label>
            <input type="email" onChange={updateEmail} value={email} id="email" placeholder="example@domain.com"/>
          </div>
          <div className="login-form-item">
            <label htmlFor="username">Choose a username</label>
            <input type="text" onChange={updateUsername} value={username} id="username" placeholder="user123"/>
          </div>
          <div className="login-form-item">
            <label htmlFor="password">Create a secure password</label>
            <input type="password" onChange={updatePassword} value={password} id="password"/>
          </div>
          <div className="login-form-item">
            <label htmlFor="confirmPassword">Confirm your secure password</label>
            <input type="password" onChange={updateConfirmPassword} value={confirmPassword} id="confimPassword"/>
          </div>
          <button type="submit" className="login-button">Register</button>
          <Link to="/"><button type="button" className="login-button">Log in</button></Link>
        </form>
        
      </div>
    </div>
  );
}

export default Register;