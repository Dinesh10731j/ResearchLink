import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../Endpoints/axiosInstance";
import { endpoints } from "../Endpoints/endpoints";
const { Deleteactivity } = endpoints;
const deleteRecentActivity = async (activityId: string) => {
  try {
    const response = await axiosInstance.delete(
      `${Deleteactivity}/${activityId}`
    );
    return response.data;
  } catch {
    throw new Error("Failed to delete recent avcrivity");
  }
};

export const UseDeleteActivity = () => {
  return useMutation({
    mutationKey: ["deleteactivity"],
    mutationFn: deleteRecentActivity,
  });
};
