import { Link, useNavigate } from "react-router-dom";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoMdLogOut } from "react-icons/io";

import axios from "axios";
import { setUser } from "../slices/userSlice";
import auth from "../auth/auth";


function Profile() {
  //functional hooks
  const dispatch = useDispatch()
  const navigate = useNavigate()

  //global states
  const user = useSelector(state => state.user)

  //local states
  let [spots, setSpots] = useState([])

  useEffect(() => {
    //authenticates user and then gets a list of spots that they found
    auth(user.value)
    axios.get(`http://localhost:3000/spot/getAuthorSpots/${user.value}`, {
      withCredentials: true
    }).then(res => {
      console.log(res.data)
      setSpots([...spots, res.data[0]])
    }).catch(error => {
      console.log(error)
    })
  }, [])


  function logout() {
    //sets the users name to empty string, tells the server to log out and then sends the user back to the login page
    dispatch(setUser(""))
    axios.get("http://localhost:3000/user/logout", {
      withCredentials: true
    }).catch(error => {
      console.log(error)
    })
    navigate("/")
  }

  return (
    <div id="profile">
      <div id="profile-body">
        <Link to="/mapScreen">
          <button className="back-button"><IoArrowBackCircleOutline size="40"/></button>
        </Link>
        <h1 className="profile-item">{user.value}</h1>
        <div className="logout">
          <IoMdLogOut size="40" color="black" onClick={logout}/>
        </div>
        <h2 className="profile-header">Your Spots</h2>
        <div className="your-spots">
          {spots.map(spot => {
            console.log(spot)
            return (
              <div key={spot.name} className="profile-spot">
                <div className="profile-spot-info">
                  <h3>{spot.name}</h3>
                  <button>more info</button>
                </div>
                <div>
                  <img src={`http://localhost:3000/spot/getImage/${spot.name}/${spot.imagePaths[0]}`} height="100px"/>
                </div>
              </div>
            )
          })} 
        </div>
        <div className="field-divider"></div>
      </div>
    </div>
  );
}

export default Profile;