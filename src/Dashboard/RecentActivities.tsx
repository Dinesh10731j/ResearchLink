import { UseUserActivities } from "../hooks/Usehistory";
import { CircularProgress } from "@mui/material";
import { motion } from "framer-motion";
import { DarkModeContext } from "../context/DarkmodeContext";
import { useContext } from "react";

interface RecentActivity {
  _id: string;
  title: string;
  description: string;
  researchpaper: string;
  userId: string;
  publishedDate: string;
  createdAt: string;
  updatedAt: string;
}

const RecentActivities = () => {
  const { data, isLoading, isError } = UseUserActivities();

const context = useContext(DarkModeContext);

if(context === null){
  throw new Error('DarkModeContext must be used within a DarkModeProvider');
}

const {darkMode} = context;
  
  return (
    <section className="p-4 max-w-4xl mx-auto">
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <CircularProgress size={30} />
        </div>
      ) : isError ? (
        <p className="text-center text-red-500">Error fetching user activities</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {data?.map((activity: RecentActivity) => (
            <motion.div
              key={activity._id}
              className={` p-6 rounded-lg shadow-md ${darkMode?'bg-[#2D2D2A]':'bg-white'}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}

            >
              <h2 className={`text-xl font-bold mb-2 ${darkMode?'text-white':''}`}>{activity.title}</h2>
              <p className={`text-gray-700 mb-4  ${darkMode?'text-gray-100':''}`}>{activity.description}</p>
              <a
                href={activity.researchpaper}
                className="text-blue-500 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Research Paper
              </a>
              <p className="text-gray-500 mt-2">Published Date: {new Date(activity.publishedDate).toLocaleDateString()}</p>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
};

export default RecentActivities;
