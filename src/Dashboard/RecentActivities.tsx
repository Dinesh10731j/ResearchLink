import { useState } from "react";
import { useForm } from "react-hook-form";
import { UseUserActivities } from "../hooks/Usehistory";
import { CircularProgress } from "@mui/material";
import { motion } from "framer-motion";
import { DarkModeContext } from "../context/DarkmodeContext";
import { useContext } from "react";
import { Trash2Icon, Edit2Icon, CheckIcon, XIcon } from "lucide-react";
import { UseDeleteActivity } from "../hooks/Usedeleterecentactivity";
import { UseEditActivity } from "../hooks/Useeditactivities";

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
  const deleteActivityMutation = UseDeleteActivity();
  const editMutation  = UseEditActivity();

  const context = useContext(DarkModeContext);

  if (context === null) {
    throw new Error("DarkModeContext must be used within a DarkModeProvider");
  }

  const { darkMode } = context;

  const [editingId, setEditingId] = useState<string | null>(null);


  const { register, handleSubmit, reset } = useForm<Partial<RecentActivity>>();

  const handleRemove = (activityId: string) => {
    deleteActivityMutation.mutate(activityId);
  };

  const handleEdit = (activity: RecentActivity) => {
    setEditingId(activity._id);
    reset({
      title: activity.title,
      description: activity.description,
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    reset();
  };

 
  const handleSaveEdit = (formData: Partial<RecentActivity>, activityId: string) => {
const editedData = {
  ...formData,activityId:activityId
}

editMutation.mutate(editedData as RecentActivity);
    
  };

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
              className={`p-6 rounded-lg shadow-md ${
                darkMode ? "bg-[#2D2D2A]" : "bg-white"
              } relative`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              {editingId === activity._id ? (
                <form
                  onSubmit={handleSubmit((formData) =>
                    handleSaveEdit(formData, activity._id)
                  )}
                >
                  <input
                    type="text"
                    {...register("title", { required: true })}
                    className="w-full p-2 border rounded mb-2"
                  />
                  <textarea
                    {...register("description", { required: true })}
                    className="w-full p-2 border rounded mb-2"
                  />
                  <div className="flex space-x-2">
                    <button type="submit" className="text-green-500 cursor-pointer">
                      <CheckIcon />
                    </button>
                    <button
                      type="button"
                      onClick={handleCancelEdit}
                      className="text-red-500 cursor-pointer"
                    >
                      <XIcon />
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <Trash2Icon
                    className="absolute top-7 md:top-2 right-2 text-red-700 cursor-pointer"
                    onClick={() => handleRemove(activity._id)}
                  />
                  <Edit2Icon
                    onClick={() => handleEdit(activity)}
                    className="absolute top-7 md:top-2 right-10 text-blue-700 cursor-pointer"
                  />
                  <h2
                    className={`text-xl font-bold mb-2 ${
                      darkMode ? "text-white" : ""
                    }`}
                  >
                    {activity.title}
                  </h2>
                  <p
                    className={`text-gray-700 mb-4 ${
                      darkMode ? "text-white" : ""
                    }`}
                  >
                    {activity.description}
                  </p>
                  <a
                    href={activity.researchpaper}
                    className="text-blue-500 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Research Paper
                  </a>
                  <p className="text-gray-500 mt-2">
                    Published Date:{" "}
                    {new Date(activity.publishedDate).toLocaleDateString()}
                  </p>
                </>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
};

export default RecentActivities;
