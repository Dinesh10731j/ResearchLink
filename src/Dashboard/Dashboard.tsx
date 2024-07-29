import {Menu as MenuIcon } from "lucide-react";
import { useState } from "react";
import { NavLinks } from "../utils/NavLinks";
import { Link, Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

import { CircularProgress } from "@mui/material";
import { Toaster } from "react-hot-toast";
import { UserUserdetails } from "../hooks/Usegetusername";
import {X,BellDot} from "lucide-react";





const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(true);
  const notification = 0;

 
  const navigate = useNavigate();
  const {data,isLoading,isError} = UserUserdetails();



  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("userid");
    navigate("/auth/login");
  };



const ShowNotification = ()=>{
  alert("This is notification")
}

  
  return (
    <>
      <div className="relative">
       

        <div className="flex flex-col bg-none md:flex-row">
        <MenuIcon
          color="#708090"
          onClick={() => setIsOpen(!isOpen)}
          className="fixed top-4 left-4  cursor-pointer md:hidden"
        />

     
          
          <aside
            className={`min-h-screen pt-10 z-20 md:w-64 bg-[#2f2f2f] fixed top-0 left-0  transition-transform duration-300 md:relative md:translate-x-0 ${
              isOpen ? "-translate-x-full" : "translate-x-0"
            } `}
          >
            <X className="fixed top-3 right-2 md:hidden cursor-pointer " color="white"
            
            onClick={()=>setIsOpen(!isOpen)}
            />
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
          <section className="fixed top-4 right-5 cursor-pointer">
            <section className="flex gap-2">
            <BellDot onClick={ShowNotification}/>
            <p className="h-5 w-5 text-red-500 text-center ">{notification}</p>
           
            </section>
      
      </section>
         
        </div>
        <Toaster />
    
      </div>

    </>
  );
};

export default Dashboard;
