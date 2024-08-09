import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../Endpoints/axiosInstance";
import { endpoints } from "../Endpoints/endpoints";

const { Getuserprofile } = endpoints;
const fetchUserProfile = async (id: string) => {
  try {
    const response = await axiosInstance.get(`${Getuserprofile}/${id}`);

    return response.data.data;
  } catch {
    throw new Error("Failed to fetch user profile!");
  }
};

export const UseUserProfile = (id: any) => {
  return useQuery({
    queryKey: ["userprofile"],
    queryFn: () => fetchUserProfile(id),
    refetchOnMount: "always",
    refetchInterval: 1000,
    staleTime: 1000,
    refetchOnWindowFocus: "always",
  });
};
