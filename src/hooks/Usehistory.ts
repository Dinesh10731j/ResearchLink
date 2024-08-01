import { endpoints } from "../Endpoints/endpoints";
import axiosInstance from "../Endpoints/axiosInstance";
const {Useractivities} =endpoints;
import Cookies from "js-cookie";
import { useQuery } from "@tanstack/react-query";
const fetchHistory = async ()=>{

    try{


        const userid = Cookies.get('userid');
        const response = await axiosInstance.get(`${Useractivities}/${userid}`);

        

        return response.data.data;

    }catch{
        throw new Error('Failed to fetch user activities');
    }
    
}


export const  UseUserActivities =()=>{
    return useQuery({queryKey:['useractivities'],queryFn:fetchHistory})
}