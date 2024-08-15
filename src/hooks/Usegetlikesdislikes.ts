import { endpoints } from "../Endpoints/endpoints";
import axiosInstance from "../Endpoints/axiosInstance";
import { useQuery } from "@tanstack/react-query";
const { Getdislikesdislikes } = endpoints;
const fetchgetLikesDislikes = async (paperId: string) => {
 
  try {
    const response = await axiosInstance.get(
      `${Getdislikesdislikes}/${paperId}`
    );
 
    return response.data.data;
  } catch {
    throw new Error("Failed to fetch the likesdislikes");
  }
};

export const UsegetLikesdislikes = (paperId: string) => {
  return useQuery({
    queryKey: ["getlikesdislikes"],
    queryFn: () => fetchgetLikesDislikes(paperId),
    refetchInterval: 1000,
    staleTime: 1000,
    refetchOnMount: "always",
    refetchOnWindowFocus: "always",
  });
};
