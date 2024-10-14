import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../Endpoints/axiosInstance";
import { endpoints } from "../Endpoints/endpoints";
import Cookies from "js-cookie";
const {Follow} = endpoints;
const Follows = async (userId:string)=>{
    try{
        const followerId= Cookies.get('userid');
        const response = await axiosInstance.post(Follow,{followerId:followerId,userId:userId});
        return response.data;

    }catch{
        throw new Error('Failed to follow the user')
    }
};



export const UseFollow = ()=>{
    return useMutation({mutationKey:['follow'],mutationFn:Follows});
}