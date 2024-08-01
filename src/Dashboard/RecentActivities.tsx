import { UseUserActivities } from "../hooks/Usehistory";
import { CircularProgress } from "@mui/material";
import { motion } from "framer-motion";


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
              className="bg-white p-6 rounded-lg shadow-md"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-xl font-bold mb-2">{activity.title}</h2>
              <p className="text-gray-700 mb-4">{activity.description}</p>
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
