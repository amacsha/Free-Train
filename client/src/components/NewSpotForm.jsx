import { IoArrowBackCircleOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useState } from "react";


function NewSpotForm() {
  let [name, setName] = useState("")
  let [description, setDescription] = useState("")
  let [files, setFiles] = useState([])

  function updateName(e){
    setName(e.target.value)
  }

  function updateDescription(e){
    setDescription(e.target.value)
  }

  function updateFiles(file) {
    setFiles([...files, file[0]])
  }

  return ( 
    <div id="new-spot-form">
      <Link to="/mapScreen">
        <button className="back-button"><IoArrowBackCircleOutline size="40"/></button>
      </Link>
      <form >
        <div className="formItem">
          <label htmlFor="name"> Give your spot a name</label>
          <input type="text" id="name" onChange={updateName} value={name}/>
        </div>
        <div className="formItem">
          <label htmlFor="description">Describe your spot</label>
          <textarea id="description" cols="30" rows="5" onChange={updateDescription} value={description}></textarea>
        </div>
        <div className="imageUpload">
          <label htmlFor="uploadImage">Post some pictures</label>
          <input type="file" accept=".jpg,.png," id="uploadImage" onChange={(e) => updateFiles(e.target.files)}/>
          <div className="imageDisplay">
            {files.map(image => {return (<img key={image.url} src={URL.createObjectURL(image)} height="200px"/>)})}
          </div>
        </div>
      </form>
    </div>
  );
}

export default NewSpotForm;