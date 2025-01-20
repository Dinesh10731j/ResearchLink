import axiosInstance from "../Endpoints/axiosInstance";
import { endpoints } from "../Endpoints/endpoints";
import { useQuery } from "@tanstack/react-query";

const { Countviews } = endpoints;
const countViews = async (researchPaperId: string) => {
  try {
    const response = await axiosInstance.get(
      `${Countviews}/${researchPaperId}`
    );

    return response.data.researchpaperInfo;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

export const UseCountViews = (researchPaperId: string) => {
  return useQuery({
    queryKey: ["Views",researchPaperId],
    queryFn: () => countViews(researchPaperId),
    refetchInterval: 1000,
    refetchOnMount: "always",
    refetchOnReconnect: "always",
    refetchOnWindowFocus:'always',
  });
};
