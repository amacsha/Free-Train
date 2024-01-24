import { IoArrowBackCircleOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import axios from "axios";
import { AxiosResponse } from "axios";
import auth from "../auth/auth";
import { RootState } from "../store";

import './NewSpotForm.css'

function NewSpotForm() {
  //functional hooks
  const navigate = useNavigate();

  //local states
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [files, setFiles] = useState<File[]>([]);
  const [problem, setProblem] = useState<string>("");

  //global states
  const newSpotPosition = useSelector(
    (state: RootState) => state.newSpotPosition,
  );
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    //authenticates the user
    auth(user.value);
  }, []);

  function validateUserInput(name: string, description: string, files: File[]) {
    if (name == "") {
      setProblem("give your spot a name");
      return;
    } else if (description == "") {
      setProblem("give your spot a description");
      return;
    } else if (files.length == 0) {
      setProblem("Show everyone a picture");
      return;
    }
  }

  function createCloudinaryURL(): string {
    const cloudinaryName: string = import.meta.env.VITE_CLOUDINARYNAME;
    if (cloudinaryName) {
      return `https://api.cloudinary.com/v1_1/${cloudinaryName}/image/upload`;
    } else {
      console.error("cloudinary database name undefined");
      return "";
    }
  }

  const updateState = (
    setter: Function,
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setter(e.target.value);
  };

  function updateFiles(file: FileList | null) {
    file && setFiles([...files, file[0]]);
  }

  //sends the new spot to the server
  function validateAndSend(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    //checks the all input is given
    validateUserInput(name, description, files);

    //creates the body to send to the server
    const data = new FormData();
    data.append("name", name);
    data.append("description", description);
    newSpotPosition.value &&
      data.append("lat", newSpotPosition.value.lat.toString());
    newSpotPosition.value &&
      data.append("lng", newSpotPosition.value.lng.toString());
    user.value && data.append("author", user.value);

    const CLOUDINARYURL: string = createCloudinaryURL();

    const imagePromises: Promise<AxiosResponse<any, any>>[] = [];
    for (let image of files) {
      const imageData = new FormData();
      imageData.append("file", image);
      imageData.append("upload_preset", "default");
      const imagePromise = axios.post(CLOUDINARYURL, imageData);
      imagePromises.push(imagePromise);
    }

    if (imagePromises.length > 0) {
      Promise.all(imagePromises)
        .then((responses) => {
          responses.forEach((response) => {
            data.append("imagePaths", response.data.secure_url);
          });
          return axios
            .post("http://localhost:3000/spot/addSpot", data, {
              withCredentials: true,
            })
            .catch((error) => {
              console.error("Error:", error);
            });
        })
        .then((response) => {
          navigate("/mapScreen");
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }

  return (
    <div id="new-spot-form" data-testid="new-spot-form">
      <Link to="/mapScreen" className="back-link">
        <IoArrowBackCircleOutline size="40" color="black" />
      </Link>
      <h1>Add a spot</h1>
      <form onSubmit={validateAndSend}>
        <div className="formItem">
          <label htmlFor="name"> Give your spot a name</label>
          <input
            type="text"
            id="name"
            onChange={(e) => updateState(setName, e)}
            value={name}
          />
        </div>
        <div className="formItem">
          <label htmlFor="description">Describe your spot</label>
          <textarea
            id="description"
            cols={30}
            rows={5}
            onChange={(e) => updateState(setDescription, e)}
            value={description}
          ></textarea>
        </div>
        <div className="itemDiv"></div>
        <div className="imageUpload">
          <label htmlFor="uploadImage">Post some pictures</label>
          <input
            type="file"
            accept=".jpg,.png,"
            id="uploadImage"
            onChange={(e) => updateFiles(e.target.files)}
          />
          <div className="imageDisplay">
            {files.map((image) => {
              return <img key={image.name} src={URL.createObjectURL(image)} />;
            })}
          </div>
        </div>
        <div className="itemDiv"></div>
        {problem == "" ? null : <h2 className="problem-display">{problem}</h2>}
        <button type="submit">submit</button>
      </form>
    </div>
  );
}

export default NewSpotForm;
