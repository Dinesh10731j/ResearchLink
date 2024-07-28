import { UseResearchPaper } from "../hooks/Usegetresearchpaper";
import { motion } from "framer-motion";

interface ResearchPaperType {
  _id: string;
  title: string;
  description: string;
  researchpaper: string;
  publishedDate: string;
  userId: {
    name:string,
    _id: string;
    profilePicture: string;
  };
}

const Feeds = () => {
  const { data: Researchpapers } = UseResearchPaper();

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
        {Researchpapers?.map((researchpaper: ResearchPaperType) => (
          <motion.div
            key={researchpaper._id}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="bg-white -z-10 shadow-md p-6 rounded-lg hover:bg-gray-100 transition mt-20 md:mt-0 relative"
          >
            <motion.h2 variants={itemVariants} className="text-2xl font-bold mb-2">
              {researchpaper.title}
            </motion.h2>
            <motion.p variants={itemVariants} className="text-gray-700 mb-4">
              {researchpaper.description}
            </motion.p>
            <motion.div variants={itemVariants} className="text-sm text-gray-500">
              Publisher: {researchpaper.userId?.name}
            </motion.div>
            <motion.div variants={itemVariants} className="text-sm text-gray-500">
              Published Date: {new Date(researchpaper.publishedDate).toLocaleDateString()}
            </motion.div>
            <motion.div
              className="absolute bottom-2 right-2 h-12 w-12 sm:h-16 sm:w-16 border-2 border-gray-200 rounded-full overflow-hidden"
            >
              {researchpaper.userId.profilePicture ? (
                <img
                  src={researchpaper.userId.profilePicture}
                  alt="Profile"
                  className="h-20 w-20 rounded-full object-cover"
                />
              ) : (
                <img
                  src="https://avatar.iran.liara.run/public"
                  alt="Default Profile"
                  className="h-20 w-20 rounded-full object-cover"
                />
              )}
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
