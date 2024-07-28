import { PanelLeftClose, Menu as MenuIcon } from "lucide-react";
import { useState } from "react";
import { NavLinks } from "../utils/NavLinks";
import { Link, Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

import { CircularProgress } from "@mui/material";
import { Toaster } from "react-hot-toast";
import { UserUserdetails } from "../hooks/Usegetusername";




const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(true);
 
  const navigate = useNavigate();
  const {data,isLoading,isError} = UserUserdetails();



  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("userid");
    navigate("/auth/login");
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
              ) : data?.profilePicture ? (
                <img
                  src={data?.profilePicture}
                  alt="User Avatar"
                  className="h-20 w-20 cursor-pointer rounded-full"
                />
              ) : (
                <img src="https://avatar.iran.liara.run/public" className="h-20 w-20 rounded-full"/>
              )}

              
{
  isLoading?(
    <CircularProgress size={20} color='primary'/>
  ):(
<h1 className="text-center text-white text-2xl">
    {`Hi,${data?.name}`}
         </h1>
  )
    
}
          

        
        {

          isLoading?(
            <CircularProgress size={20} color="primary"/>
          ):(
              <h1 className="text-center text-white text-2xl">
            {`${data?.affiliation}`}
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
