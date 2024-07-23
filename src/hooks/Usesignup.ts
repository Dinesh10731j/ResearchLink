import {useMutation} from "@tanstack/react-query";
import { endpoints } from "../Endpoints/endpoints";
const {UserSignup} = endpoints;
import axiosInstance from "../Endpoints/axiosInstance";
import toast from "react-hot-toast";

import { useNavigate } from "react-router-dom";


interface SignupData{
    name:string,
    email:string,
    password:string,
    affiliation:string
}

const Usersignup = async (signupdata:SignupData)=>{
 
    
const response = await axiosInstance.post(UserSignup,signupdata);



return response.data.data;

}



export const UseUserSignup = ()=>{
    const navigate = useNavigate();
    const mutation= useMutation({mutationKey:['usersignup'],mutationFn:Usersignup,
        
        onSuccess:()=>{
            toast.success('Signup sucessful')


            setTimeout(()=>{
                navigate("/auth/login")
            },2000)

    },

onError:()=>{
    toast.error('Failed to signup!')
}
}

   

    )


    return mutation;

}