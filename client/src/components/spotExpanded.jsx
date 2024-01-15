import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { BiSolidLike } from "react-icons/bi";
import { BiLike } from "react-icons/bi";

import axios from "axios";
import auth from "../auth/auth";

function SpotExpanded() {
  //functional hooks
  let params = useParams()

  //global states
  const user = useSelector(state => state.user)

  //local states
  const [parkourSpot, setSpot] = useState({})
  const [imagePaths, setImagePaths] = useState([])
  const [likes, setLikes] = useState(0)
  const [liked, setLiked] = useState(false)


  useEffect(() => {
    //authenticates a the user then gets the specific spot from the database
    auth(user.value)
    axios.get(`http://localhost:3000/spot/getSpot/${params.spotName}`, {
      withCredentials: true
    }).then(res => {
      setSpot(res.data)
      setImagePaths(res.data.imagePaths)
      setLikes(res.data.likedBy.length)
      if(res.data.likedBy.includes(user.value)) {
        setLiked(true)
      }
    }).catch(error => {
      console.log(error)
    }) 
  }, [])

  function like() {
    axios.post(`http://localhost:3000/spot/like/${parkourSpot.name}`, {user: user.value}, {
      withCredentials: true
    }).then(res => {
      setLikes(likes + 1)
      setLiked(!liked)
    }).catch(error => {
      console.log(error)
    })
  }

  function unLike() {
    axios.post(`http://localhost:3000/spot/unLike/${parkourSpot.name}`, {user: user.value}, {
      withCredentials: true
    }).then(res => {
      setLikes(likes - 1)
      setLiked(!liked)
    }).catch(error => {
      console.log(error)
    })
  }

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
        <div className="likes">
          <h1>{likes}</h1>
          {liked ? <BiSolidLike size="80" onClick={unLike}/> : <BiLike size="80" onClick={like}/>}
        </div>
        <p className="description expanded-item">{parkourSpot.description}</p>
      </div>
    </div>
  );
}

export default SpotExpanded;