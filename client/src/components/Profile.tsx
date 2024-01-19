import { Link, useNavigate } from "react-router-dom";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoMdLogOut } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { MdClose } from "react-icons/md";

import axios from "axios";
import { setUser } from "../slices/userSlice";
import auth from "../auth/auth";

function Profile() {
  //functional hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //global states
  const user = useSelector((state) => state.user);

  //local states
  let [spots, setSpots] = useState([]);
  let [deleteUser, setDeleteUser] = useState(false);
  let [password, setPassword] = useState("");
  let [likedSpots, setLikedSpots] = useState([]);
  let [challenges, setChallenges] = useState([]);

  useEffect(() => {
    //authenticates user and then gets a list of spots that they found
    auth(user.value);
    let requests = [];
    let foundSpots = axios.get(
      `http://localhost:3000/spot/getAuthorSpots/${user.value}`,
      {
        withCredentials: true,
      },
    );
    requests.push(foundSpots);
    let likesSpots = axios.get(
      `http://localhost:3000/spot/getLikedSpots/${user.value}`,
      {
        withCredentials: true,
      },
    );
    requests.push(likesSpots);
    let challenges = axios.get(
      `http://localhost:3000/challenge/getCompletedChallenges/${user.value}`,
      {
        withCredentials: true,
      },
    );
    requests.push(challenges);
    Promise.all(requests)
      .then((values) => {
        console.log(values);
        setLikedSpots(values[1].data.content);
        setSpots(values[0].data);
        setChallenges(values[2].data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function logout() {
    //sets the users name to empty string, tells the server to log out and then sends the user back to the login page
    console.log('test')
    dispatch(setUser(""));
    axios
      .get("http://localhost:3000/user/logout", {
        withCredentials: true,
      })
      .then((res) => {
        dispatch(setUser(null));
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function deleteSpot(spotName) {
    axios
      .delete(`http://localhost:3000/spot/deleteSpot/${spotName}`, {
        withCredentials: true,
      })
      .then((res) => {
        let newSpots = spots.filter((spot) => {
          return spot.name != spotName;
        });
        setSpots(newSpots);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function deleteUserConfirmed() {
    axios
      .post(
        "http://localhost:3000/user/deleteUser",
        {
          user: user.value,
          password: password,
        },
        {
          withCredentials: true,
        },
      )
      .then((res) => {
        dispatch(setUser(null));
        window.location.replace("/");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function updatePassword(e) {
    setPassword(e.target.value);
  }

  return (
    <div id="profile">
      {deleteUser ? (
        <div className="deleteCheck">
          <div className="delete-box">
            <MdClose
              size="20"
              className="close-icon"
              onClick={() => setDeleteUser(false)}
            />
            <h2>Are you sure you want to delete your account</h2>
            <h3>
              This action is permanent and you cannot recover your account once
              deleted
            </h3>
            <input
              type="text"
              onChange={updatePassword}
              value={password}
              placeholder="enter your password"
            />
            <button onClick={deleteUserConfirmed} className="delete">
              Delete account
            </button>
          </div>
        </div>
      ) : null}
      <div id="profile-body">
        <Link to="/mapScreen">
          <IoArrowBackCircleOutline size="40" color="black" />
        </Link>
        <h1 className="profile-item">{user.value}</h1>
        <div className="logout">
          <MdDelete
            size="40"
            color="black"
            onClick={() => setDeleteUser(true)}
          />
          <IoMdLogOut size="40" color="black" onClick={logout} />
        </div>
        <h2 className="profile-header">Your Spots</h2>
        <div className="your-spots">
          {spots.length == 0 ? (
            <h2>You have discovered no spots</h2>
          ) : (
            spots.map((spot) => {
              return (
                <div key={spot.name} className="profile-spot">
                  <div className="profile-spot-info">
                    <h3>{spot.name}</h3>
                    <h3>likes: {spot.likedBy.length}</h3>
                    <Link to={`/spotExpanded/${spot.name}`}>
                      <button className="visit">more info</button>
                    </Link>
                    <button
                      className="delete"
                      onClick={() => deleteSpot(spot.name)}
                    >
                      Delete Spot
                    </button>
                  </div>
                  <div className="image-side">
                    <img
                      src={`http://localhost:3000/spot/getImage/${spot.name}/${spot.imagePaths[0]}`}
                      height="100px"
                    />
                  </div>
                </div>
              );
            })
          )}
        </div>
        <div className="field-divider"></div>
        <h2 className="profile-header">Liked spots</h2>
        <div className="your-spots">
          {likedSpots.length == 0 ? (
            <h2>You haven't liked any spots</h2>
          ) : (
            likedSpots.map((spot) => {
              return (
                <div key={spot.name} className="profile-spot">
                  <div className="profile-spot-info">
                    <h3>{spot.name}</h3>
                    <Link to={`/spotExpanded/${spot.name}`}>
                      <button className="visit">more info</button>
                    </Link>
                  </div>
                  <div className="image-side">
                    <img
                      src={`http://localhost:3000/spot/getImage/${spot.name}/${spot.imagePaths[0]}`}
                      height="100px"
                    />
                  </div>
                </div>
              );
            })
          )}
        </div>
        <div className="field-divider"></div>
        <h2 className="profile-header">Challenges</h2>
        <div className="your-spots">
          {challenges.map((challenge) => {
            return (
              <div className="profile-challenge">
                <h3>{challenge.challenge}</h3>
                <button
                  onClick={() =>
                    navigate(`/spotExpanded/${challenge.spotName}`)
                  }
                >
                  go to spot
                </button>
              </div>
            );
          })}
        </div>
        <div className="field-divider"></div>
      </div>
    </div>
  );
}

export default Profile;
