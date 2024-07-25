import { useQuery } from "@tanstack/react-query";
import { endpoints } from "../Endpoints/endpoints";
const { Researchpaper } = endpoints;
import axiosInstance from "../Endpoints/axiosInstance";
const ResearchPapers = async () => {
  const response = await axiosInstance.get(Researchpaper);
  console.log(response.data.data);

  return response.data.data;
};

export const UseResearchPaper = () => {
  return useQuery({ queryKey: ["researchpapers"], queryFn: ResearchPapers });
};
