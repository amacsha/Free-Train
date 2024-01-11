import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { IoArrowBackCircleOutline } from "react-icons/io5";

function SpotExpanded() {
  let params = useParams()
  const [parkourSpot, setSpot] = useState({})
  const [imagePaths, setImagePaths] = useState([])
  useEffect(() => {
    axios.get(`http://localhost:3000/spot/getSpot/${params.spotName}`).then(res => {
      console.log(res.data)
      setSpot(res.data)
      setImagePaths([...imagePaths, res.data.imagePaths])
    }).catch(error => {
      console.log(error)
    }) 
  }, [])

  return ( 
    <div id="spot-expanded">
      <Link to="/mapScreen">
        <button className="back-button"><IoArrowBackCircleOutline size="40"/></button>
      </Link>
      <div className="spot-expanded-body">
        <h1>{parkourSpot.name}</h1>
        <p>{parkourSpot.description}</p>
        {imagePaths.map(image => {
          return <img key={image} src={`http://localhost:3000/spot/getImage/${parkourSpot.name}/${image}`} />
        })}
      </div>
    </div>
  );
}

export default SpotExpanded;