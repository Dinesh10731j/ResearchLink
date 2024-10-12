import { UseResearchPaper } from "../hooks/Usegetresearchpaper";
import { motion } from "framer-motion";
import { CircularProgress } from "@mui/material";
import Box from "@mui/material/Box";
import { DarkModeContext } from "../context/DarkmodeContext";
import { useContext, useState } from "react";
import { ThumbsUp, ThumbsDown } from "lucide-react";
//import { Useuserdislike } from "../hooks/Usedislike";
//import { Useuserlike } from "../hooks/Uselike";
//import { UsegetLikesdislikes } from "../hooks/Usegetlikesdislikes";
import { UseLikesDislikes } from "../hooks/Uselikesdislikes";


interface ResearchPaperType {
  _id: string;
  title: string;
  description: string;
  researchpaper: string;
  publishedDate: string;
  userId: {
    name: string;
    _id: string;
    profilePicture: string;
  };
}

const Feeds = () => {
 // const [likesdislikesid, setLikesDislikesid] = useState('');
  const { data: Researchpapers, isLoading } = UseResearchPaper();
  //const dislikemutation = Useuserdislike();
  //const {data:likesdislikes} = UsegetLikesdislikes(likesdislikesid);
  //const likemutation = Useuserlike();

  const likedislike = UseLikesDislikes();

  const [searchQuery, setSearchQuery] = useState("");

  const context = useContext(DarkModeContext);

  if (context === null) {
    throw new Error("DarkModeContext must be used within a DarkModeProvider");
  }

  const { darkMode } = context;

  const filteredResearchPapers = Researchpapers?.filter(
    (paper: ResearchPaperType) =>
      paper.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300 },
    },
  };

  const handleLikeDislike = (id: string ) => {
    likedislike.mutate(id);
    //setLikesDislikesid(id);
  };

  

  return (
    <>
      <section className="flex flex-col gap-6">
        <div className="flex justify-between items-center mt-10">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search research papers"
            className="p-2 border rounded-lg w-full max-w-md"
          />
        </div>
        {isLoading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <CircularProgress size={30} color="primary" />
          </Box>
        ) : (
          filteredResearchPapers?.map((researchpaper: ResearchPaperType) => (
            <motion.div
              key={researchpaper._id}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className={`shadow-md p-6 rounded-lg transition mt-4 relative ${
                darkMode ? "bg-[#2D2D2A]" : "bg-white"
              }`}
            >
              <motion.h2
                variants={itemVariants}
                className={`text-2xl font-bold mb-2 ${
                  darkMode ? "text-white" : ""
                }`}
              >
                {researchpaper.title}
              </motion.h2>
              <motion.p
                variants={itemVariants}
                className={`${darkMode ? "text-white" : ""} text-gray-700 mb-4`}
              >
                {researchpaper.description}
              </motion.p>
              <motion.div
                variants={itemVariants}
                className="text-sm text-gray-500"
              >
                Publisher: {researchpaper.userId?.name}
              </motion.div>
              <motion.div
                variants={itemVariants}
                className="text-sm text-gray-500"
              >
                Published Date:{" "}
                {new Date(researchpaper.publishedDate).toLocaleDateString()}
              </motion.div>
              <motion.div className="absolute bottom-2 right-2 h-12 w-12 sm:h-16 sm:w-16 border-2 border-gray-200 rounded-full overflow-hidden">
                {researchpaper.userId.profilePicture ? (
                  <img
                    src={researchpaper.userId.profilePicture}
                    alt="Profile"
                    className="h-20 w-20 rounded-full object-cover cursor-pointer"
                  />
                ) : (
                  <img
                    src={`https://avatar.iran.liara.run/username?username=${researchpaper.userId?.name}`}
                    alt="Default Profile"
                    className="h-20 w-20 rounded-full object-cover cursor-pointer"
                  />
                )}
              </motion.div>
              <motion.a
                href={researchpaper.researchpaper}
                variants={itemVariants}
                className="text-blue-500 underline mt-4 block"
              >
                View Research Paper
              </motion.a>

              <div className="flex gap-4 mt-4 py-2 px-10">
                <ThumbsUp
                  className={`cursor-pointer `}
                  color="#1877F2"
                  onClick={() => handleLikeDislike(researchpaper._id)}
                />
                <h1 className={`${darkMode ? "text-white" : ""}`}>{0}</h1>
                <ThumbsDown
                  className={`cursor-pointer mt-1 `}
                  color="#D9534F"
                  onClick={() => handleLikeDislike(researchpaper._id)}
                />
                <h1 className={`${darkMode ? "text-white" : ""}`}>{0}</h1>
              </div>
            </motion.div>
          ))
        )}
      </section>
    </>
  );
};

export default Feeds;
