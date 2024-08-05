
import { endpoints } from "../Endpoints/endpoints";
import axiosInstance from "../Endpoints/axiosInstance";
const {Userstats} = endpoints;
import Cookies from "js-cookie";
import { useQuery } from "@tanstack/react-query";
const FetchUserStats = async ()=>{

    try{

        const userid = Cookies.get('userid');

        const response = await axiosInstance.get(`${Userstats}/${userid}`);
        

        return response.data.data;


    }catch{
        throw new Error('Failed to fetch user stats')
    }

}



export const UseUserStats = () =>{
    return useQuery({queryKey:['userstats'],queryFn:FetchUserStats})
}