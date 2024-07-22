import { motion } from "framer-motion";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <header className="flex justify-between items-center  shadow-xl py-3 md:py-5 px-10 md:px-36 font-serif ">
      <section>
        <motion.h1
          className="text-green-400 md:text-3xl  text-xl"
          initial={{ opacity: 0, y: -80 }}
          animate={{opacity:1,y:0}}
          transition={{type:'spring',stiffness:300}}
        >
          ResearchLink
        </motion.h1>
      </section>

      <section className="flex gap-3">
        <section>
        <Link to='/auth/login'>
        
        <motion.button className="hover:border-b hover:border-b-gray-500"
          
          initial={{ opacity: 0, y: -80 }}
          animate={{opacity:1,y:0}}
          transition={{type:'spring',stiffness:300}}
          >
            Login
          </motion.button>
        </Link>  
        </section>

        <section>
       <Link to='/auth/signup'>
       <motion.button className="text-green-400 hover:border-b hover:border-b-green-400"
          
          initial={{ opacity: 0, y: -80 }}
          animate={{opacity:1,y:0}}
          transition={{type:'spring',stiffness:300}}
          >
            Login for free
          </motion.button>
       </Link>  
        </section>
      </section>
    </header>
  );
};

export default Header;
