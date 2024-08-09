import { endpoints } from "../Endpoints/endpoints";
const { Researchlinkusers } = endpoints;
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../Endpoints/axiosInstance";

const FetchResearchLinkUsers = async () => {
  const response = await axiosInstance.get(Researchlinkusers);
  try{
    return response.data.data;
  }catch(err){
    throw new Error('failed to fetch data');
  }

 
};

export const UseGetResearchLinkUsers = () => {
  return useQuery({
    queryKey: ["researchlinkusers"],
    queryFn: FetchResearchLinkUsers,
    refetchInterval:1000,
    staleTime:1000,
    refetchOnWindowFocus:'always',
    refetchOnMount:'always'
  });
};
