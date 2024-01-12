import { CgProfile } from "react-icons/cg";
import { GrMapLocation } from "react-icons/gr";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSearch } from "../slices/searchSlice";

function Options() {
  const search = useSelector(state => state.search)
  const dispatch = useDispatch()

  return ( 
    <div id="options">
      <Link to="/profile"><CgProfile size="60" color="black"/></Link>
      <GrMapLocation size="60" onClick={() => dispatch(setSearch())}/>
    </div>
   );
}

export default Options;