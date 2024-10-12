import { useMutation } from "@tanstack/react-query";
import { endpoints } from "../Endpoints/endpoints";
const {Likesdislikes} = endpoints;
import axiosInstance from "../Endpoints/axiosInstance";
import Cookies from "js-cookie";

interface idTypes{
    paperId:string
    userId:string

}
const LikesDislikes = async (paperId:idTypes)=>{

    try{
const userId = Cookies.get('userid')

        const response = await axiosInstance.post(Likesdislikes,{paperId:paperId,userId:userId});

        return response.data;

    }catch(error){

       
        throw new Error('Failed to like and dislike');

    }
}


export const UseLikesDislikes = ()=>{
    return useMutation({mutationKey:['likesdislikes'],mutationFn:LikesDislikes})
}