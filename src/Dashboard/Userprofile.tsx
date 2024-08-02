import { useContext } from "react";
import { UseUserProfile } from "../hooks/Usegetuserprofile";
import { useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { DarkModeContext } from "../context/DarkmodeContext";

const Userprofile = () => {
  const { id } = useParams();
  const { data: data, isLoading, isError } = UseUserProfile(id);
  const context = useContext(DarkModeContext);
  if (context === null) {
    throw new Error("DarkModeContext must be used within a DarkModeProvider");
  }

  const { darkMode } = context;

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
              src="https://avatar.iran.liara.run/public"
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


        <section>
          <button className="py-2 px-12 bg-blue-500 text-white rounded-md shadow-md">Message</button>
        </section>
      </section>
    </>
  );
};

export default Userprofile;
