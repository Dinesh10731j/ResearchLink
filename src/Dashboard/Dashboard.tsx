import { PanelLeftClose, Menu as MenuIcon, Upload } from "lucide-react";
import { useState } from "react";
import { NavLinks } from "../utils/NavLinks";
import { Link, Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { UseGetProfile } from "../hooks/Usegetprofile";
import { CircularProgress } from "@mui/material";
import { useForm } from "react-hook-form";
import { Usecloudinaryimageupload } from "../hooks/Useuploadprofilecloudinary";
import { Toaster } from "react-hot-toast";
import { toast } from "react-hot-toast";
import { UseUploaduserprofile } from "../hooks/Useuploadprofile";
import { UserUserdetails } from "../hooks/Usegetusername";

interface imageUpload {
  profile: FileList,
}

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(true);
  const mutation = UseUploaduserprofile();
  const { register, handleSubmit } = useForm<imageUpload>();
  const navigate = useNavigate();
  const { data, isLoading, isError} = UseGetProfile();
  const user = UserUserdetails();

  console.log(user?.data);

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("userid");
    navigate("/auth/login");
  };

  const onsubmit = async (data: imageUpload) => {
    try {
      const file = data.profile[0];
      if (file) {
        const imageUrl = await Usecloudinaryimageupload(file);
        mutation.mutate(imageUrl);
      } else {
        toast.error('Please select a file to upload');
      }
    } catch (error) {
      toast.error('Failed to upload image. Please try again.');
    }
  };

  return (
    <>
      <div className="relative">
        <MenuIcon
          color="#708090"
          onClick={() => setIsOpen(!isOpen)}
          className="fixed top-4 left-4 z-10 cursor-pointer md:hidden"
        />

        <PanelLeftClose
          color="#708090"
          onClick={() => setIsOpen(!isOpen)}
          className="fixed top-4 left-4 z-10 cursor-pointer hidden md:block"
        />

        <div className="flex flex-col md:flex-row">
          <aside
            className={`h-screen pt-10 w-58 md:w-64 bg-[#2f2f2f] fixed top-0 left-0 transition-transform duration-300 md:relative md:translate-x-0 ${
              isOpen ? "-translate-x-full" : "translate-x-0"
            }`}
          >
            <nav>
              <ul>
                {NavLinks.map((link) => (
                  <li
                    key={link.title}
                    className="flex items-center p-4 hover:bg-black rounded-md transition-all"
                  >
                    <link.icon className="text-white mr-4" />
                    <Link to={link.path} className="text-white">
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <section className="mt-10 flex flex-col items-center justify-center gap-3">
              {isLoading ? (
                <CircularProgress size={20} color="primary" />
              ) : isError ? (
                <img src="https://avatar.iran.liara.run/public" className="h-20 w-20 rounded-full"/>
              ) : data?.profile ? (
                <img
                  src={data.profile}
                  alt="User Avatar"
                  className="h-20 w-20 cursor-pointer rounded-full"
                />
              ) : (
                <img src="https://avatar.iran.liara.run/public" className="h-20 w-20 rounded-full"/>
              )}

              <section className="flex">
                <form onSubmit={handleSubmit(onsubmit)} className="flex flex-col items-center justify-center">
                <label
                    htmlFor="profile-upload"
                    className="bg-blue-600 text-white py-1 px-4 rounded-md cursor-pointer hover:bg-blue-700 shadow-md"
                    
                  >Upload profile</label>
                  <input type="file" {...register("profile")} className="ml-12 rounded-md text-white hidden"  id="profile-upload"
                
                 
                  
                  />
                  <button type="submit" className="mt-7 py-2  px-7 bg-blue-500 rounded-md text-white">
                    <Upload color="white"/>
                  </button>
                </form>
              </section>
{
  isLoading?(
    <CircularProgress size={20} color='primary'/>
  ):(
<h1 className="text-center text-white text-2xl">
    {`Hi,${user.data?.name}`}
         </h1>
  )
    
}
          

        
        {

          isLoading?(
            <CircularProgress size={20} color="primary"/>
          ):(
            <h1 className="text-center text-white text-2xl">
            {`${user.data?.affiliation}`}
                 </h1>

          )
          

        }
            

              <button
                className="bg-red-500 text-white py-2 px-10 ml-4 rounded-lg"
                onClick={handleLogout}
              >
                Logout
              </button>
            </section>
          </aside>

          <main className={`flex-1 p-4 transition-all duration-300 `}>
            <Outlet />
          </main>
        </div>
        <Toaster />
      </div>
    </>
  );
};

export default Dashboard;
