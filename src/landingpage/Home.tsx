import Header from "../components/Header";
import Reseacher from "../assets/researcher.jpg";
import ResearchMaterial from "../assets/rsearchmaterial.jpg";
import { Topics } from "../utils/topics";
import { motion, useScroll } from "framer-motion";
import Books from "../assets/books.avif";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../context/DarkmodeContext";
import { useContext } from "react";
import { MoonIcon, SunIcon } from "lucide-react";

const Home = () => {
  const { scrollYProgress } = useScroll();
  const context = useContext(DarkModeContext);
  if (context === null) {
    throw new Error('DarkModeContext must be used within a DarkModeProvider');
  }

  const { darkMode, setDarkMode } = context;

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="bg-white dark:bg-[#2D2D2A] text-black dark:text-white min-h-screen">
        <Header />

        <motion.section
          style={{ scaleX: scrollYProgress }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          className="h-1 bg-green-500"
        />

        <section className="flex flex-col md:gap-7 justify-center items-center py-3 px-12 md:flex-row">
          <section className="bg-slate-200 dark:bg-gray-700 md:py-36 md:px-12 py-7 px-4">
            <motion.h1
              className="md:text-5xl font-serif font-medium text-3xl"
              initial={{ opacity: 0, y: -80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Discover scientific knowledge and stay connected to the world of science
            </motion.h1>
            <Link to={'/auth/signup'}>
              <motion.button
                className="md:py-5 px-12 py-3 bg-green-300 text-white rounded-md text-xl mt-12"
                initial={{ opacity: 0, y: -80 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Join for free
              </motion.button>
            </Link>
          </section>
          <section className="py-36 px-7">
            <motion.img
              src={Reseacher}
              alt="research-image"
              className="h-[500px] w-[700px]"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 100 }}
            />
          </section>
        </section>

        <section className="flex flex-col gap-3 md:flex-row justify-center items-center px-3">
          <motion.section
            className="h-96 w-96 bg-slate-200 dark:bg-gray-700 rounded-full shadow-md"
            initial={{ opacity: 0, y: -80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <img
              src={ResearchMaterial}
              alt="research-material"
              className="h-96 w-96 rounded-full"
            />
          </motion.section>
          <section className="py-2 px-20">
            <motion.h1
              className="text-2xl md:text-5xl font-medium font-serif"
              initial={{ opacity: 0, y: -80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Discover research
            </motion.h1>
            <motion.h1
              className="text-xl md:text-2xl"
              initial={{ opacity: 0, y: -80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Access over 160 million publication pages and stay up to date with what's happening in your field.
            </motion.h1>
          </section>
        </section>

        <section className="flex flex-col md:flex-row gap-4 px-5 justify-center items-center mt-12">
          <section className="py-2 px-3">
            <motion.h1
              className="text-3xl md:text-5xl font-serif font-medium text-center"
              initial={{ opacity: 0, y: -80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Connect with your scientific community
            </motion.h1>
            <motion.p
              className="py-2 px-3 text-xl"
              initial={{ opacity: 0, y: -80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Share your research, collaborate with your peers, and get the support you need to advance your career.
            </motion.p>
          </section>
          <section>
            <motion.h1
              className="text-center py-2 text-xl font-serif font-medium"
              initial={{ opacity: 0, y: -80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Visit Topic Pages
            </motion.h1>
            <section className="flex flex-wrap gap-4">
              {Topics?.map((topics) => (
                <motion.button
                  key={topics.topic}
                  className="border border-green-300 py-2 px-5 text-sm md:py-3 md:px-10 text-green-300 rounded-full md:text-xl hover:bg-green-100 dark:hover:bg-green-900"
                  initial={{ opacity: 0, y: -80 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {topics.topic}
                </motion.button>
              ))}
            </section>
          </section>
        </section>

        <section className="flex flex-col md:flex-row gap-4 mt-7 justify-center items-center">
          <section className="px-3">
            <motion.img
              src={Books}
              className="h-96 w-96 rounded-full shadow-md"
              initial={{ opacity: 0, y: -80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
          </section>
          <section className="px-20">
            <motion.h1
              className="text-3xl md:text-5xl font-serif text-center"
              initial={{ opacity: 0, y: -80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Measure your impact
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl"
              initial={{ opacity: 0, y: -80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Get in-depth stats on who's been reading your work and keep track of your citations.
            </motion.p>
          </section>
        </section>

        <section className="flex flex-col items-center justify-center mt-7">
          <motion.h1
            className="md:text-5xl text-2xl text-center px-20 md:px-0 font-serif"
            initial={{ opacity: 0, y: -80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Advance your research and join a community of 25 million scientists
          </motion.h1>
          <section className="py-4 px-4">
          <Link to="/auth/signup">
            <motion.button
              className="md:py-4 py-2 px-12 md:px-16 bg-green-300 md:text-4xl rounded-md mt-4 text-white"
              initial={{ opacity: 0, y: -80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Join for free
            </motion.button>
          </Link>
          </section>
         
        </section>

        <Footer />

        <button
          onClick={() => setDarkMode(!darkMode)}
          className="fixed bottom-5 right-5 p-2 bg-green-300 rounded-full shadow-lg"
        >
          {darkMode ? <SunIcon size={24} /> : <MoonIcon size={24} />}
        </button>
      </div>
    </div>
  );
};

export default Home;
