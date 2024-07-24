import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../Endpoints/axiosInstance";
import { endpoints } from "../Endpoints/endpoints";
import { toast } from "react-hot-toast";

const { Uploadpaper } = endpoints;
interface Uploaddata {
  title: string;
  description: string;
  file: FileList;
}
const UploadPaper = async (uploadData: Uploaddata) => {
  try {
    const response = await axiosInstance.post(Uploadpaper, uploadData);

    return response.data;
  } catch (err) {
    throw new Error("Failed to upload paper");
  }
};

export const UseUploadPaper = () => {
  const mutataion = useMutation({
    mutationKey: ["uploadpaper"],
    mutationFn: UploadPaper,
    onSuccess: () => {
toast.success("Paper uploaded successfully")

    },


    onError:()=>{
        toast.error("Paper failed to upload")
    }
  });


  return mutataion;
};
