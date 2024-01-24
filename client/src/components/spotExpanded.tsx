import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { BiSolidLike } from "react-icons/bi";
import { BiLike } from "react-icons/bi";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";

import axios from "axios";
import auth from "../auth/auth";
import { RootState } from "../store";
import { Spot } from "../types/spot";
import { Challenge } from "../types/challenge";
import { Comment } from "../types/comment";

function SpotExpanded() {
  //functional hooks
  let params = useParams();

  //global states
  const user = useSelector((state: RootState) => state.user);

  //local states
  const [parkourSpot, setSpot] = useState<Spot | null>(null);
  const [imagePaths, setImagePaths] = useState<string[]>([]);
  const [likes, setLikes] = useState<number>(0);
  const [liked, setLiked] = useState<boolean>(false);
  const [comment, setComment] = useState<string>("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [challengeText, setChallengeText] = useState<string>("");
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [stateChange, setStateChange] = useState<boolean>(false);

  useEffect(() => {
    //authenticates a the user then gets the specific spot from the database
    auth(user.value);
    const requests = [];
    axios
      .get<Spot>(`http://localhost:3000/spot/getSpot/${params.spotName}`, {
        withCredentials: true,
      })
      .then((res) => {
        setSpot(res.data);
        setImagePaths(res.data.imagePaths);
        setLikes(res.data.likedBy.length);
        axios
          .get<Challenge[]>(
            `http://localhost:3000/challenge/getChallengeBySpot/${res.data.name}`,
            {
              withCredentials: true,
            },
          )
          .then((res) => {
            setChallenges(res.data);
          })
          .catch((error) => {
            console.log(error);
          });
        if (user.value && res.data.likedBy.includes(user.value)) {
          setLiked(true);
        }
        setComments(res.data.comments);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function like() {
    if (parkourSpot == null) return;
    axios
      .post(
        `http://localhost:3000/spot/like/${parkourSpot.name}`,
        { user: user.value },
        {
          withCredentials: true,
        },
      )
      .then((res) => {
        setLikes(likes + 1);
        setLiked(!liked);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function unLike() {
    if (parkourSpot == null) return;
    axios
      .post(
        `http://localhost:3000/spot/unLike/${parkourSpot.name}`,
        { user: user.value },
        {
          withCredentials: true,
        },
      )
      .then((res) => {
        setLikes(likes - 1);
        setLiked(!liked);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function addComment(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (comment == "" || !user.value || !parkourSpot) {
      return;
    }
    let commentObj = new FormData();
    commentObj.append("madeBy", user.value);
    commentObj.append("comment", comment);
    axios
      .post(
        `http://localhost:3000/spot/addComment/${parkourSpot.name}`,
        commentObj,
        {
          withCredentials: true,
        },
      )
      .then((res) => {
        setComments([
          ...comments,
          { madeBy: user.value ? user.value : "", comment: comment },
        ]);
        setComment("");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function updateComment(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setComment(e.target.value);
  }

  function updateChallengeText(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setChallengeText(e.target.value);
  }

  function createChallenge(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!parkourSpot) return;
    const data = new FormData();
    data.append("challenge", challengeText);
    data.append("spotName", parkourSpot.name);
    axios
      .post("http://localhost:3000/challenge/addChallenge", data, {
        withCredentials: true,
      })
      .then((res) => {
        setChallenges([
          ...challenges,
          {
            challenge: challengeText,
            spotName: parkourSpot.name,
            completedBy: [],
          },
        ]);
        setChallengeText("");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function toggleCompleted(challenge: Challenge) {
    axios
      .post(
        `http://localhost:3000/challenge/toggleCompleted/${challenge.challenge}`,
        {
          username: user.value,
        },
        {
          withCredentials: true,
        },
      )
      .then((res) => {
        if (
          user.value != null &&
          challenge.completedBy.includes(user.value) == false
        ) {
          challenge.completedBy.push(user.value);
          setStateChange(true);
        } else {
          if (!user.value) return;
          challenge.completedBy.splice(
            challenge.completedBy.indexOf(user.value),
            1,
          );
          setStateChange(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div id="spot-expanded">
      <div id="spot-expanded-body">
        <Link to="/mapScreen">
          <IoArrowBackCircleOutline size="40" color="black" />
        </Link>
        <h1 className="expanded-item">{parkourSpot?.name}</h1>
        <h2 className="expanded-item">Found by {parkourSpot?.author}</h2>
        <div className="divider"></div>
        <div className="image-show">
          {imagePaths.map((image, index) => {
            return <img key={index} src={image} width="200px" />;
          })}
        </div>
        <p className="description">
          <span>{parkourSpot?.author}</span>
          <br />
          {` ${parkourSpot?.description}`}
        </p>
        <div className="divider expanded-item"></div>
        <div className="likes">
          <h1>{likes}</h1>
          {liked ? (
            <BiSolidLike size="80" onClick={unLike} />
          ) : (
            <BiLike size="80" onClick={like} />
          )}
        </div>
        <div className="comments">
          <form onSubmit={addComment}>
            <textarea
              cols={50}
              rows={3}
              value={comment}
              onChange={updateComment}
              className="create-comment"
            ></textarea>
            <button type="submit" className="add-comment">
              Add Comment
            </button>
          </form>
          <div className="comment-display">
            {comments.map((comment) => {
              return (
                <div className="comment">
                  <p>{`${comment.madeBy} - ${comment.comment}`}</p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="challenges">
          <form onSubmit={createChallenge}>
            <textarea
              cols={50}
              rows={3}
              value={challengeText}
              onChange={updateChallengeText}
              className="create-comment"
            ></textarea>
            <button type="submit" className="add-comment">
              Add Challenge
            </button>
          </form>
          <div className="challenges-display">
            {challenges.map((challenge) => {
              return (
                <div className="challenge">
                  <h4>{challenge.challenge}</h4>
                  {user.value && challenge.completedBy.includes(user.value) ? (
                    <FaStar
                      size="20"
                      onClick={() => toggleCompleted(challenge)}
                    />
                  ) : (
                    <FaRegStar
                      size="20"
                      onClick={() => toggleCompleted(challenge)}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SpotExpanded;
