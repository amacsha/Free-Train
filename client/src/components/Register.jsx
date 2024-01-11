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
    axios.post("http://localhost:3000/", data).then(res => {
      navigate("/mapScreen")
    })
  }
  return ( 
    <div id="register">
      <form >       
        <div className="register-form-item">
          <label htmlFor="">Enter your email</label>
          <input type="text" onChange={updateEmail} value={email}/>
        </div>
        <div className="register-form-item">
          <label htmlFor="">Choose a username</label>
          <input type="text" onChange={updateUsername} value={username}/>
        </div>
        <div className="register-form-item">
          <label htmlFor="">Create a secure password</label>
          <input type="password" onChange={updatePassword} value={password}/>
        </div>
        <div className="register-form-item">
          <label htmlFor="">Confirm your secure password</label>
          <input type="password" onChange={updateConfirmPassword} value={confirmPassword}/>
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;