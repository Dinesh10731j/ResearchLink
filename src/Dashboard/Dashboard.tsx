import { PanelLeftClose} from "lucide-react";
import { useState } from "react";
import { NavLinks } from "../utils/NavLinks";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <div className="relative">
        <PanelLeftClose
          color="#708090"
          onClick={() => setIsOpen(!isOpen)}
          className="fixed top-4 left-4 z-10 cursor-pointer "
        />
        <aside className={`h-screen pt-10 w-72 bg-[#2f2f2f] transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <nav>
            <ul>
              {NavLinks.map((link) => (
                <li key={link.title} className="flex items-center p-4 ">
                  <link.icon className="text-white mr-4" />
                  <Link to={link.path} className="text-white">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
      </div>
    </>
  );
};

export default Dashboard;