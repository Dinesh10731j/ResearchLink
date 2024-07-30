
import { UseUserProfile } from "../hooks/Usegetuserprofile";
import { useParams } from "react-router-dom";

const Userprofile = () => {
const {id} =useParams();

console.log('This is params',id)
    const data = UseUserProfile(id);
    console.log("This is userprofile data ",data);
  return (
    <div>


This is userprofile

    </div>
  )
}

export default Userprofile