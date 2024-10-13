import { endpoints } from "../Endpoints/endpoints";
import axiosInstance from "../Endpoints/axiosInstance";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";

const {Dislikes} = endpoints;

const Userdislike = async (dislikeid:string) => {
    try{
        const userid = Cookies.get("userid");
        const response = await axiosInstance.post(Dislikes, {paperId:dislikeid,userId:userid });
   
        return response.data;
    }catch{
        throw new Error('Failed to like the researchpaper')
    }
  
};

export const Useuserdislike = () => {
  const dislikemutation = useMutation({
    mutationKey: ['userdislike'],
    mutationFn: (userid: string) => Userdislike(userid),
  });

  return dislikemutation;
};
