import Cookies from "js-cookie"
import axiosInstance from "../Endpoints/axiosInstance"
import { endpoints } from "../Endpoints/endpoints";
import { useQuery } from "@tanstack/react-query";
const {Userdetails} = endpoints
const getusername = async () =>{
    const userid = Cookies.get("userid")
    
    const response = await axiosInstance.get(`${Userdetails}/${userid}`);

    return response.data.data;
}



export const UserUserdetails = ()=>{
    return useQuery({queryKey:['userdetails'],queryFn:getusername});
}