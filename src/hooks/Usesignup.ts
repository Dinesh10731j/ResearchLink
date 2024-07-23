import {useMutation} from "@tanstack/react-query";
import { endpoints } from "../Endpoints/endpoints";
const {UseSignup} = endpoints;
import { axiosInstance } from "../Endpoints/axiosInstance";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface SignupData{
    name:string,
    email:string,
    password:string,
    affiliation:string
}

const Usersignup = async (signupdata:SignupData)=>{
    const navigate = useNavigate();
    try{
const response = await axiosInstance.post(UseSignup,signupdata);



setTimeout(()=>{
    navigate("/auth/login")

},2000)
    toast.success('Signup sucessful')


return response.data.data;

    }catch{
    toast.error('Failed to signup!')
    
    }
}


export const UseUserSignup = ()=>{
    return useMutation({mutationKey:['usersignup'],mutationFn:Usersignup,}

    )


}