import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../Endpoints/axiosInstance";
import { endpoints } from "../Endpoints/endpoints";
const {Editactivity} = endpoints;
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
    return useMutation({mutationKey:['editactivity'],mutationFn:editActivities});
}