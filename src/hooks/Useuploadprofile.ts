import axiosInstance from "../Endpoints/axiosInstance";
import { endpoints } from "../Endpoints/endpoints";
const {Uploadimage} = endpoints
import {useMutation} from "@tanstack/react-query";
import {toast} from "react-hot-toast"
import Cookies from "js-cookie";
interface cloudinaryUrlType{
    cloudinaryUrl:string,
}

const Uploaduserprofile  = async (cloudinaryUrl:cloudinaryUrlType)=>{
    const response = await axiosInstance.post(Uploadimage,{profile:cloudinaryUrl});
    console.log(response)

    return response.data.data;
}


export const UseUploaduserprofile = ()=>{
    const mutation = useMutation({mutationKey:['imageupload'],mutationFn:Uploaduserprofile,
        onSuccess:(data)=>{
            Cookies.set('userprofile',data?._id);
            
        toast.success('Profile uploaded successfully!')
    },
onError:()=>{
    toast.error("Failed to upload profile");
}

});


return mutation
}