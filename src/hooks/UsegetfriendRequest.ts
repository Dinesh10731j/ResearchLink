import { useQuery } from "@tanstack/react-query";
import { endpoints } from "../Endpoints/endpoints";
import axiosInstance from "../Endpoints/axiosInstance";
const {Getrequest} = endpoints;
const Fetchfriendrequests = async ()=>{
    try{
const response = await axiosInstance.get(Getrequest);

return response.data.data;

    }catch{
        throw new Error('Failed to fetch friend request')
    }
}


export const UseGetRequest = ()=>{
    return useQuery({queryKey:['getfriendrequest'],queryFn:Fetchfriendrequests})
}