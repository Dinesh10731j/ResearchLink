import { useForm } from 'react-hook-form';
import { UseUploadPaper } from '../hooks/Useuploadpaper';
import { uploadToCloudinary } from '../hooks/Useuploadtocloudinary'; // Adjust the path
import {toast} from "react-hot-toast";
import { Toaster } from 'react-hot-toast';
import {Upload} from "lucide-react"

interface FileUploadData {
  title: string;
  description: string;
  file: FileList;
}

const UploadNewPaper = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FileUploadData>();
  const mutation = UseUploadPaper();

  const onSubmit = async (data: FileUploadData) => {
    try {
      const file = data.file[0];
      if (file) {
        
        const imageUrl = await uploadToCloudinary(file);

        const paperData = {
          title: data.title,
          description: data.description,
        file:imageUrl, 
        };

        
        mutation.mutate(paperData);
      } else {
        toast.error('Please select a file to upload');
      }
    } catch (error) {
      toast.error('Failed to upload image. Please try again.');
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <h1 className="text-2xl font-semibold mb-4">Upload New Paper</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            id="title"
            {...register('title', { required: 'Title is required' })}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            {...register('description')}
            rows={4}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label htmlFor="file" className="block text-sm font-medium text-gray-700">Upload File</label>
          <input
            type="file"
            id="file"
            {...register('file', { required: 'File is required' })}
            className="mt-1 block w-full text-gray-500"
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
