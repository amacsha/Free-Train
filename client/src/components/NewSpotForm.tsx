import { IoArrowBackCircleOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector} from "react-redux";

import axios from 'axios'
import auth from "../auth/auth";
import { RootState } from "../store";


function NewSpotForm() {
  //functional hooks
  let navigate = useNavigate()

  //local states
  let [name, setName] = useState<string>("")
  let [description, setDescription] = useState<string>("")
  let [files, setFiles] = useState<File[]>([])
  const [problem, setProblem] = useState<string>("")

  //global states
  const newSpotPosition = useSelector((state : RootState) => state.newSpotPosition)
  const user = useSelector((state: RootState) => state.user)

  useEffect(() => {
    //authenticates the user
    auth(user.value)
  }, [])

  //updates all of the inputs
  function updateName(e: React.ChangeEvent<HTMLInputElement>){
    setName(e.target.value)
  }

  function updateDescription(e: React.ChangeEvent<HTMLTextAreaElement>){
    setDescription(e.target.value)
  }

  function updateFiles(file: FileList | null) {
    file && setFiles([...files, file[0]])
  }

  //sends the new spot to the server
  function validateAndSend(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    //checks the all input is given
    if(name == "") {
      setProblem("give your spot a name")
      return
    } else if(description == "") {
      setProblem("give your spot a description")
      return
    } else if (files.length == 0) {
      setProblem("Show everyone a picture")
      return
    }

    //creates the body to send to the server
    const data = new FormData()
    data.append("name", name)
    data.append("description", description)
    newSpotPosition.value && data.append("lat", newSpotPosition.value.lat.toString())
    newSpotPosition.value && data.append("lng", newSpotPosition.value.lng.toString())
    user.value && data.append("author", user.value)
    let fileCount = 0
    //loops through all files and adds them to the data object
    for(let image of files) {
      data.append(`file${fileCount}`, image)
      fileCount++
    }

    //sends the data to the server
    axios.post("http://localhost:3000/spot/addSpot", data, {
      withCredentials: true
    }).then(res => {
      navigate("/mapScreen")
    }).catch(error => {
      console.log(error)
      setProblem(error.response.data.status)
    })
  }

  return (
    <div id="new-spot-form">
      <Link to="/mapScreen" className="back-link">
        <IoArrowBackCircleOutline size="40" color="black"/>
      </Link>
      <h1>Add a spot</h1>
      <form onSubmit={validateAndSend}>
        <div className="formItem">
          <label htmlFor="name"> Give your spot a name</label>
          <input type="text" id="name" onChange={updateName} value={name}/>
        </div>
        <div className="formItem">
          <label htmlFor="description">Describe your spot</label>
          <textarea id="description" cols={30} rows={5} onChange={updateDescription} value={description} ></textarea>
        </div>
        <div className="itemDiv"></div>
        <div className="imageUpload">
          <label htmlFor="uploadImage">Post some pictures</label>
          <input type="file" accept=".jpg,.png," id="uploadImage" onChange={(e) => updateFiles(e.target.files)}/>
          <div className="imageDisplay">
            {files.map(image => {return (<img key={image.name} src={URL.createObjectURL(image)}/>)})}
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