import { useMutation } from "@tanstack/react-query";
import { endpoints } from "../Endpoints/endpoints";
import axiosInstance from "../Endpoints/axiosInstance";
import Cookies from "js-cookie";
const {Sendrequest} = endpoints;
interface Userid{
    userid:string
}

const SendRequest = async (userid:Userid)=>{
    try{

        const requesterid = Cookies.get("userid")

        const response = await axiosInstance.post(Sendrequest,{requestreceiverid:userid,requestsenderid:requesterid});

        return response.data.data;
    
    }catch{
        throw new Error('failed to send request');

    }
}


export const UseSendRequest = ()=>{
    const mutataion =useMutation({mutationKey:['send-request'],mutationFn:SendRequest,
        onSuccess:()=>{
            alert('Request send successfully')

    },onError:()=>{
        alert('failed to send request');
    }});


    return mutataion;
}