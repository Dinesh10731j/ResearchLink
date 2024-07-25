import { UseResearchPaper } from "../hooks/Usegetresearchpaper";
import { motion } from "framer-motion";

interface ResearchPaperType {
  title: string;
  description: string;
  researchpaper: string;
  publishedDate: string;
}

const Feeds = () => {
  const Researchpapers = UseResearchPaper();
  console.log(Researchpapers.data);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300 } },
  };

  return (
    <>
      <section className="flex flex-col gap-6">
        {Researchpapers?.data?.map((researchpaper: ResearchPaperType) => (
          <motion.div
            key={researchpaper.title}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="bg-white shadow-md p-6 rounded-lg hover:bg-gray-100 transition mt-20 md:mt-0"
          >
            <motion.h2 variants={itemVariants} className="text-2xl font-bold mb-2">
              {researchpaper.title}
            </motion.h2>
            <motion.p variants={itemVariants} className="text-gray-700 mb-4">
              {researchpaper.description}
            </motion.p>
            <motion.div variants={itemVariants} className="text-sm text-gray-500">
              Published Date: {new Date(researchpaper.publishedDate).toLocaleDateString()}
            </motion.div>
            <motion.a
              href={researchpaper.researchpaper}
              variants={itemVariants}
              className="text-blue-500 underline mt-4 block"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Research Paper
            </motion.a>
          </motion.div>
        ))}
      </section>
    </>
  );
};

export default Feeds;
