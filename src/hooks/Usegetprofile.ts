import { endpoints } from "../Endpoints/endpoints";
const {Getprofileimage} = endpoints;
import axiosInstance from "../Endpoints/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";



const getProfile = async()=>{
    try{

        const profileid = Cookies.get("userprofile")

        const response = await axiosInstance.get(`${Getprofileimage}/${profileid}`);
      

        return response.data.data;
    }catch{
        throw new Error('Fail to get user profile')
    }

   
}



export const UseGetProfile = ()=>{
return useQuery({queryKey:['userprofile'],queryFn:getProfile})
}