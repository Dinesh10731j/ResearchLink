import { useContext } from "react";
import { UseUserProfile } from "../hooks/Usegetuserprofile";
import { useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { DarkModeContext } from "../context/DarkmodeContext";
import {Link} from "react-router-dom";
import {PlusCircle} from "lucide-react";
import { UseFollow } from "../hooks/Usefollow";

const Userprofile = () => {
  const { id } = useParams();
  const followmutation = UseFollow();
  const { data:data, isLoading, isError } = UseUserProfile(id);
  const context = useContext(DarkModeContext);
  if (context === null) {
    throw new Error("DarkModeContext must be used within a DarkModeProvider");
  }

  const { darkMode } = context;


  const handleFollower = (userId:string)=>{
   followmutation.mutate(userId);

  }

  return (
    <>
      <section className="flex flex-col items-center justify-center gap-3">
        <section>
          {isLoading ? (
            <CircularProgress size={30} color="primary" />
          ) : data?.profilePicture ? (
            <img
              src={data?.profilePicture}
              className="h-40 w-40 rounded-full mt-20 shadow-md"
            />
          ) : (
            <img
              src={`https://avatar.iran.liara.run/username?username=${data?.name}`}
              className="h-40 w-40 rounded-full shadow-md"
            />
          )}
        </section>

        <section>
          {isLoading ? (
            <CircularProgress size={20} color="primary" />
          ) : data?.name ? (
            <h1 className={`text-4xl font-sans ${darkMode?'text-white':''}`}>{data?.name}</h1>
          ) : (
            <h1>Username not found</h1>
          )}
        </section>
        <section>
          {isLoading ? (
            <CircularProgress size={20} color="primary" />
          ) : data?.affiliation ? (
            <h1 className={`font-sans text-2xl ${darkMode?'text-white':''} `}>{data?.affiliation}</h1>
          ) : isError ? (
            <h1>Error affiliation not found</h1>
          ) : (
            <p>User affiliation not found</p>
          )}
        </section>

        <section>
          {isLoading ? (
            <CircularProgress size={20} color="primary" />
          ) : data?.researchField ? (
            <h1 className={`font-sans text-2xl ${darkMode?'text-white':''} `}>{data?.researchField}</h1>
          ) : isError ? (
            <h1>Research field not found</h1>
          ) : (
            <p>User field not found</p>
          )}
        </section>


        <section className="flex flex-col md:flex-row items-center gap-6">
  <Link to="/dashboard/chat">
    <button className="py-2 px-6 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition duration-300">
      Message
    </button>
  </Link>
  
  <section className="flex items-center gap-4">
    <button onClick={()=>handleFollower(data?._id)}  className=" flex gap-2 py-2 px-4 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition duration-300">
      Follow <PlusCircle className="w-6 h-6 text-gray-900 " />
    </button>
    
  </section>
</section>

      </section>
    </>
  );
};

export default Userprofile;
