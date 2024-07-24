import { PanelLeftClose, Menu as MenuIcon } from "lucide-react";
import { useState } from "react";
import { NavLinks } from "../utils/NavLinks";
import { Link, Outlet } from "react-router-dom";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <div className="relative">
        {/* Menu Icon for small screens */}
        <MenuIcon
          color="#708090"
          onClick={() => setIsOpen(!isOpen)}
          className="fixed top-4 left-4 z-10 cursor-pointer md:hidden"
        />

        {/* PanelLeftClose Icon for larger screens */}
        <PanelLeftClose
          color="#708090"
          onClick={() => setIsOpen(!isOpen)}
          className="fixed top-4 left-4 z-10 cursor-pointer hidden md:block"
        />

        <div className="flex flex-col md:flex-row">
          {/* Side Navigation */}
          <aside
            className={`h-screen pt-10 w-64 bg-[#2f2f2f] fixed top-0 left-0 transition-transform duration-300 md:relative md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:w-72`}
          >
            <nav>
              <ul>
                {NavLinks.map((link) => (
                  <li key={link.title} className="flex items-center p-4 hover:bg-black rounded-md transition-all">
                    <link.icon className="text-white mr-4" />
                    <Link to={link.path} className="text-white">
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
          
          {/* Main Content */}
          <main className={`flex-1 p-4 transition-all duration-300 ${isOpen ? 'md:ml-64' : ''}`}>
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
