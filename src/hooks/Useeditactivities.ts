import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../Endpoints/axiosInstance";
import { endpoints } from "../Endpoints/endpoints";
import toast from "react-hot-toast";
const {Editactivity} = endpoints;
import { useNavigate } from "react-router-dom";
interface RecentActivity {
    _id: string;
    title: string;
    description: string;
    researchpaper: string;
    userId: string;
    publishedDate: string;
    createdAt: string;
    updatedAt: string;
  }
const editActivities = async (formData:RecentActivity)=>{


    try{


        const response= await axiosInstance.patch(Editactivity,formData);

        return response.data;

    }catch{

        throw new Error('Failed to edit activities');
    }
};



export const UseEditActivity = ()=>{
    const navigate = useNavigate();
    return useMutation({mutationKey:['editactivity'],mutationFn:editActivities,onSuccess:()=>{
        toast.success('Activity edited successfully');
       navigate('/dashboard/recent-activities')
        
    },onError:()=>{
        toast.error('Failed! to edit activity');
    }});
}