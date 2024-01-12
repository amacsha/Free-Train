import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import logo from '../assets/FreeTrainLogo.png'

function Login(props) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  function updateEmail(e) {
    setEmail(e.target.value)
  }

  function updatePassword(e) {
    setPassword(e.target.value)
  }

  function checkEmailAndPassword(e) {
    e.preventDefault()
    if(email == "") {
      console.log("enter your email")
      return
    } else if (password == "") {
      console.log("enter your password")
      return
    }
    let data = new FormData()
    data.append("email", email)
    data.append("password", password)
    axios.post("http://localhost:3000/user/checkUser", data).then(res => {
      props.setUser(res.data.username)
      navigate("/mapScreen")
    })
  }

  return ( 
    < div id="login">
      <div className="logoSide">
        <div className="logoDiv">
          <img src={logo} alt="" width="150px"/>
          <h1>Free-train</h1>
        </div>
      </div>
      <div className="formSide">
        <form onSubmit={checkEmailAndPassword}>
          <div className="login-form-item">
            <label htmlFor="email">Enter you email</label>
            <input type="text" id="email" placeholder="example@exampleDomain.com" onChange={updateEmail} value={email}/>
          </div>
          <div className="login-form-item">
            <label htmlFor="password">Enter you password</label>
            <input type="password" id="password" onChange={updatePassword} value={password}/>
          </div>
          <button type="submit" className="login-button">Log in</button>
          <Link to="/register"><button className="login-button">Register</button></Link>
        </form>
      </div>
    </div>
   );
}

export default Login