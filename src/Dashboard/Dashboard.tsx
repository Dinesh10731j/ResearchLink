import { Menu as MenuIcon, X, BellDot,MoonIcon,SunIcon } from "lucide-react";
import { useState,useContext } from "react";
import { NavLinks } from "../utils/NavLinks";
import { Link, Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { Toaster } from "react-hot-toast";
import { UserUserdetails } from "../hooks/Usegetusername";
import { UseGetRequest } from "../hooks/UsegetfriendRequest";
import { DarkModeContext } from "../context/DarkmodeContext";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(true);
  const context = useContext(DarkModeContext);

  if (context === null) {
   
    throw new Error('DarkModeContext must be used within a DarkModeProvider');
  }

  const { darkMode, setDarkMode } = context;

  const [shownotification, setShownotification] = useState(false);
  const navigate = useNavigate();
  const { data, isLoading, isError } = UserUserdetails();
  const { data: friendRequests, isLoading: requestsLoading } = UseGetRequest();

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("userid");
    navigate("/auth/login");
  };

  const ShowNotification = () => {
    setShownotification(!shownotification);
  };


  const userId = Cookies.get("userid");


  return (
    <>
      <div className={`relative ${darkMode?'bg-[#2D2D2A]':''} delay-100 transition-all`}>
        <div className="flex flex-col bg-none gap-3 md:flex-row">
          <MenuIcon
            color="#708090"
            onClick={() => setIsOpen(!isOpen)}
            className="fixed top-4 left-4 cursor-pointer md:hidden"
          />
          <aside
            className={`min-h-screen pt-10 z-20 md:w-64 bg-[#2f2f2f] fixed top-0 left-0 transition-transform duration-300 md:relative md:translate-x-0 ${
              isOpen ? "-translate-x-full" : "translate-x-0"
            } `}
          >
            <X
              className="fixed top-3 right-2 md:hidden cursor-pointer"
              color="white"
              onClick={() => setIsOpen(!isOpen)}
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
                <img
                  src="https://avatar.iran.liara.run/public"
                  className="h-20 w-20 rounded-full"
                />
              ) : data?.profilePicture ? (
                <img
                  src={data?.profilePicture}
                  alt="User Avatar"
                  className="h-20 w-20 cursor-pointer rounded-full"
                />
              ) : (
                <img
                  src="https://avatar.iran.liara.run/public"
                  className="h-20 w-20 rounded-full"
                />
              )}

              {isLoading ? (
                <CircularProgress size={20} color="primary" />
              ) : (
                <h1 className="text-center text-white text-2xl">{`Hi, ${data?.name}`}</h1>
              )}

              {isLoading ? (
                <CircularProgress size={20} color="primary" />
              ) : (
                <h1 className="text-center text-white text-2xl">
                  {`${data?.affiliation}`}
                </h1>
              )}

              <button
                className="bg-red-500 text-white py-2 px-10 ml-4 rounded-lg"
                onClick={handleLogout}
              >
                Logout
              </button>
            </section>
          </aside>

          <main className={`flex-1 p-4 transition-all duration-300  `}>
            <Outlet />
          </main>
          <section className="fixed top-5 right-5 z-50">
            <section className="flex gap-1">
            <BellDot onClick={ShowNotification} className="z-20 cursor-pointer" color={`${darkMode?'white':'black'}`} />
            <span className="font-sans text-red-600 h-7 text-center w-7 -py-3 rounded-full bg-black">{friendRequests?.length || 0}</span>
            </section>
       

          </section>

          <section className="fixed top-5 right-32 cursor-pointer">
            {darkMode ? (
              <SunIcon onClick={() => setDarkMode(!darkMode)} color={`${darkMode?'white':'black'}`} />
            ) : (
              <MoonIcon onClick={() => setDarkMode(!darkMode)} color={`${darkMode?'white':'black'}`} />
            )}
          </section>
          <section className="fixed top-4 right-5 ">
         
           
              
            
        

            <section
              className={`h-[400px] w-[300px] shadow-md bg-[#2f2f2f]  mt-10 rounded-md ${
                shownotification ? "block" : "hidden"
              }`}
            >
              {requestsLoading ? (
                <CircularProgress size={20} color="primary" />
              ) : friendRequests?.length > 0 ? (
                <ul>
                  {friendRequests.map((request: any) => (
                    <li key={request._id} className="p-2 border-b border-gray-500">
                      <div className="text-white">
                      <p>
  {request && request.sender ? (
    request.sender._id === userId ? (
      <div className="flex items-center gap-2 p-2 border border-gray-300 rounded-md bg-gray-50">
        <img 
          src={request.receiver?.profilePicture} 
          alt={`${request.receiver?.name}'s profile`} 
          className="h-10 w-10 rounded-full object-cover" 
        />
        <div>
          <strong className="text-blue-600">You</strong> <span className="text-blue-600">sent a friend request to </span>
          <span className="font-medium text-blue-600">{` ${request.receiver?.name}`}</span>.
        </div>
      </div>
    ) : (
      <div className="flex items-center gap-2 p-2 border border-gray-300 rounded-md bg-gray-50">
        <img 
          src={request.sender?.profilePicture} 
          alt={`${request.sender?.name}'s profile`} 
          className="h-10 w-10 rounded-full object-cover" 
        />
        <div>
          <strong className="text-blue-600">{request.sender.name}</strong> <span  className="text-blue-600">sent you a friend request.</span>
        </div>
      </div>
    )
  ) : (
    <div className="p-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500">
     <h1>No request found</h1>
    </div>
  )}
</p>



                        <p>{ new Date(request.createdAt).toLocaleString()}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-white text-center">No new friend requests</p>
              )}
            </section>


           
          </section>


         

        </div>

        <Toaster />
      </div>
    </>
  );
};

export default Dashboard;
