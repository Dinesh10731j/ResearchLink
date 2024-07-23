import { endpoints } from "../Endpoints/endpoints";
import { axiosInstance } from "../Endpoints/axiosInstance";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";


interface Logindata {
  email: string;
  password: string;
}
const { UserLogin } = endpoints;
const userLogin = async (logindata: Logindata) => {
  const response = await axiosInstance.post(UserLogin, logindata);
  console.log('This is LoginResponse',response.data)

  return response.data;
};

export const UseUserLogin = () => {
    const navigate =useNavigate();
    
  const mutation = useMutation({
    mutationKey: ["userlogin"],
    mutationFn: userLogin,
    onSuccess: (data) => {

        toast.success("Login successful!");
Cookies.set("token",data?.token)

        setTimeout(()=>{
navigate("/dashboard");
        },2000)


    },

    onError: () => {
toast.error('Invalid credentials')


    },
  });

  return mutation;
};
