import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import auth from "../auth/auth";

function SpotExpanded() {
  let params = useParams()
  const [parkourSpot, setSpot] = useState({})
  const [imagePaths, setImagePaths] = useState([])
  const user = useSelector(state => state.user)
  useEffect(() => {
    auth(user.value)
    axios.get(`http://localhost:3000/spot/getSpot/${params.spotName}`, {
      withCredentials: true
    }).then(res => {
      console.log(res.data)
      setSpot(res.data)
      setImagePaths(res.data.imagePaths)
    }).catch(error => {
      console.log(error)
    }) 
  }, [])

  return ( 
    <div id="spot-expanded">
      <div id="spot-expanded-body">
        <Link to="/mapScreen">
          <button className="back-button"><IoArrowBackCircleOutline size="40"/></button>
        </Link>
        <h1 className="expanded-item">{parkourSpot.name}</h1>
        <h2 className="expanded-item">Found by {parkourSpot.author}</h2>
        <div className="divider"></div>
        <div className="image-show">
          {imagePaths.map(image => {
            return <img key={image} src={`http://localhost:3000/spot/getImage/${parkourSpot.name}/${image}`} width="200px"/>
          })}
        </div>
        <div className="divider expanded-item"></div>
        <p className="description expanded-item">{parkourSpot.description}</p>
      </div>
    </div>
  );
}

export default SpotExpanded;