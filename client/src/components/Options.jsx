import { CgProfile } from "react-icons/cg";
import { GrMapLocation } from "react-icons/gr";
import { Link } from "react-router-dom";

function Options(props) {
  return ( 
    <div id="options">
      <Link to="/profile"><CgProfile size="60" color="black"/></Link>
      <GrMapLocation size="60" onClick={() => props.setSearch(!props.search)}/>
    </div>
   );
}

export default Options;