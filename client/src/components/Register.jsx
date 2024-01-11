import { useState } from "react";
import axios from "axios";

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
      <form onSubmit={sendUser}>       
        <div className="register-form-item">
          <label htmlFor="email">Enter your email</label>
          <input type="email" onChange={updateEmail} value={email} id="email"/>
        </div>
        <div className="register-form-item">
          <label htmlFor="username">Choose a username</label>
          <input type="text" onChange={updateUsername} value={username} id="username"/>
        </div>
        <div className="register-form-item">
          <label htmlFor="password">Create a secure password</label>
          <input type="password" onChange={updatePassword} value={password} id="password"/>
        </div>
        <div className="register-form-item">
          <label htmlFor="confirmPassword">Confirm your secure password</label>
          <input type="password" onChange={updateConfirmPassword} value={confirmPassword} id="confimPassword"/>
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;