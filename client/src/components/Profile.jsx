import { Link } from "react-router-dom";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import axios from "axios";
import { useEffect, useState } from "react";

function Profile(props) {
  let [spots, setSpots] = useState([])
  useEffect(() => {
    axios.get(`http://localhost:3000/spot/getAuthorSpots/${props.user}`).then(res => {
      setSpots([...spots, res.data[0]])
    }).catch(error => {
      console.log(error)
    })
  }, [])
  return (
    <div id="profile">
      <div id="profile-body">
        <Link to="/mapScreen">
          <button className="back-button"><IoArrowBackCircleOutline size="40"/></button>
        </Link>
        <h1 className="profile-item">{props.user}</h1>
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