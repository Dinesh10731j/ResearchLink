import { endpoints } from "../Endpoints/endpoints";
import axiosInstance from "../Endpoints/axiosInstance";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";

const { Userlikes } = endpoints;

const Userlike = async (likeid:string) => {
    try{
        const userid = Cookies.get("userid");
        const response = await axiosInstance.post(Userlikes, { dislike:likeid,userid:userid });
        console.log(response.data.data);
        return response.data.data;
    }catch{
        throw new Error('Failed to dislike the researchpaper')
    }
  
};

export const Useuserlike = () => {
  const likemutation = useMutation({
    mutationKey: ['userlike'],
    mutationFn: (userid: string) => Userlike(userid),
  });

  return likemutation;
};
