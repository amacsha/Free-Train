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
      <Link to="/mapScreen">
        <button className="back-button"><IoArrowBackCircleOutline size="40"/></button>
      </Link>
      <div id="your-spots">
        <h1>Your Spots</h1>
        {spots.map(spot => {
          console.log(spot)
          return (
            <div key={spot.name}>
              <div>
                <h1>{spot.name}</h1>
              </div>
              <div>
                <img src={`http://localhost:3000/spot/getImage/${spot.name}/${spot.imagePaths[0]}`}/>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default Profile;