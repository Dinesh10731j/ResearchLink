import { useForm } from 'react-hook-form';
import { UseUploadPaper } from '../hooks/Useuploadpaper';
import { uploadToCloudinary } from '../hooks/Useuploadtocloudinary'; 
import {toast} from "react-hot-toast";
import { Toaster } from 'react-hot-toast';
import {Upload} from "lucide-react";
import Cookies from "js-cookie";
import { useContext } from 'react';
import { DarkModeContext } from '../context/DarkmodeContext';

interface FileUploadData {
  title: string;
  description: string;
  file: FileList;
}

const UploadNewPaper = () => {
  const { register, handleSubmit, formState: { errors },reset } = useForm<FileUploadData>();
  const context = useContext(DarkModeContext);

if(context === null){
  throw new Error('DarkModeContext must be used within a DarkModeProvider')
}


const {darkMode} = context

  const mutation = UseUploadPaper();

  const onSubmit = async (data: FileUploadData) => {
    try {
      const userId = Cookies.get("userid")
      const file = data.file[0];
      if (file) {
        
        const imageUrl = await uploadToCloudinary(file);

        const paperData = {
          title: data.title,
          description: data.description,
        file:imageUrl, 
        userId:userId
        };

        
        mutation.mutate(paperData);
      } else {
        toast.error('Please select a file to upload');
      }
    } catch (error) {
      toast.error('Failed to upload image. Please try again.');
    };
    reset();
  };

  return (
    <div className="container mx-auto p-4 mt-20 md:p-6 lg:p-8  h-[100vh]">
      <h1 className={`text-2xl font-semibold mb-4 ${darkMode?'text-white':''}`}>Upload New Paper</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="title" className={`block text-sm font-medium text-gray-700 ${darkMode?'text-white':''}`}>Title</label>
          <input
            type="text"
            id="title"
            {...register('title', { required: 'Title is required' })}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
        </div>

        <div>
          <label htmlFor="description" className={`block text-sm font-medium text-gray-700 ${darkMode?'text-white':''}`}>Description</label>
          <textarea
            id="description"
            {...register('description')}
            rows={4}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label htmlFor="file" className="block text-sm font-medium text-white bg-blue-500 py-1 w-24 text-center cursor-pointer shadow-md rounded-md"  >Upload File</label>
          <input
            type="file"
            id="file"
            {...register('file', { required: 'File is required' })}
            className="mt-1  w-full text-gray-500 hidden"
          />
          {errors.file && <p className="text-red-500 text-sm mt-1">{errors.file.message}</p>}
        </div>

        <button
          type="submit"
          disabled={mutation.isPending}
          className={`px-7 py-2 text-white rounded-md ${mutation.isPending ? 'bg-gray-500' : 'bg-blue-600'} hover:bg-blue-700`}
        >
          {mutation.isPending ? 'Uploading...' : <Upload/>}
        </button>
      </form>
      <Toaster/>
    </div>
  );
};

export default UploadNewPaper;
