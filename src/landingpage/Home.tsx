import Header from "../components/Header"
import Reseacher from "../assets/researcher.jpg";
import ResearchMaterial from "../assets/rsearchmaterial.jpg";
import { Topics } from "../utils/topics";
import {motion} from "framer-motion";
import Books from "../assets/books.avif"
const Home = () => {
  return (

    <>

<Header/>

<section className="flex flex-col  md:gap-7 justify-center items-center py-3 px-12 md:flex-row">


  <section className="bg-slate-200 md:py-36 md:px-12 py-7 px-4">
    <motion.h1 className="md:text-5xl font-serif font-medium text-3xl"
     initial={{ opacity: 0, y: -80 }}
     animate={{opacity:1,y:0}}
     transition={{type:'spring',stiffness:300}}
    >
      Discover scientific knowledge and stay connected to the world of science</motion.h1>
    <motion.button className="md:py-5 px-12 py-3 bg-green-300 text-white rounded-md text-xl mt-12"
    
    initial={{ opacity: 0, y: -80 }}
    animate={{opacity:1,y:0}}
    transition={{type:'spring',stiffness:300}}
    >Join for free</motion.button>
  </section>
<section className="py-36 px-7">
  <motion.img src={Reseacher} alt="research-image" className="h-[500px] w-[700px]" initial={{opacity:0 ,y:-20}}
  
  animate={{opacity:1,y:0}}

  transition={{type:'spring',stiffness:100}}
  />
</section>
</section>


<section className="flex  flex-col gap-3 md:flex-row justify-center items-center px-3  ">
  <motion.section className="h-96 w-96 bg-slate-200 rounded-full shadow-md "
   initial={{ opacity: 0, y: -80 }}
   animate={{opacity:1,y:0}}
   transition={{type:'spring',stiffness:300}}
  >
    <img src={ResearchMaterial} alt="research-material" className=" h-96 w-96 rounded-full"
    
    
    />
   
  </motion.section>


  <section className="py-2 px-20">

<motion.h1 className="text-2xl  md:text-5xl font-medium font-serif "

initial={{ opacity: 0, y: -80 }}
animate={{opacity:1,y:0}}
transition={{type:'spring',stiffness:300}}
>Discover research</motion.h1>
<motion.h1 className="text-xl md:text-2xl"  initial={{ opacity: 0, y: -80 }}
     animate={{opacity:1,y:0}}
     transition={{type:'spring',stiffness:300}}>Access over 160 million publication pages 
  and stay up to date with what's happening in your field.</motion.h1>

  </section>
</section>


<section className="flex flex-col md:flex-row gap-4 px-5 justify-center items-center mt-12">
  <section className="py-2 px-3">
    <motion.h1 className=" text-3xl md:text-5xl font-serif font-medium  text-center"
    
    
    initial={{ opacity: 0, y: -80 }}
    animate={{opacity:1,y:0}}
    transition={{type:'spring',stiffness:300}}
    >Connect with your scientific community</motion.h1>
    <motion.p  className="py-2 px-3 text-xl"
     initial={{ opacity: 0, y: -80 }}
     animate={{opacity:1,y:0}}
     transition={{type:'spring',stiffness:300}}
    
    >Share your research, collaborate with your peers, and get the 
      support you need to advance your career.</motion.p>
  </section>

  <section>
  <motion.h1 className="text-center py-2 text-xl"
  
  initial={{ opacity: 0, y: -80 }}
  animate={{opacity:1,y:0}}
  transition={{type:'spring',stiffness:300}}
  >Visit Topic Pages</motion.h1>
   
<section className="flex flex-wrap gap-4">


  {
    Topics?.map(topics=>(
      <motion.button className="border border-green-300 -py-2 py-2 px-5 text-sm  md:-py-3 md:py-3 md:px-10 text-green-300 rounded-full
       md:text-xl hover:bg-green-100"  initial={{ opacity: 0, y: -80 }}
       animate={{opacity:1,y:0}}
       transition={{type:'spring',stiffness:300}}>{topics.topic}</motion.button>
    ))
  }
  

</section>
  </section>
</section>


<section className="flex flex-col md:flex-row gap-4 mt-7 justify-center items-center ">

  <section className="px-3">
    <motion.img src={Books} className="h-96 w-96 rounded-full shadow-md"
    
    initial={{ opacity: 0, y: -80 }}
  animate={{opacity:1,y:0}}
  transition={{type:'spring',stiffness:300}}
    />
  </section>

  <section className="px-20 ">
    <motion.h1 className=" text-3xl md:text-5xl font-serif text-center"
    
    initial={{ opacity: 0, y: -80 }}
  animate={{opacity:1,y:0}}
  transition={{type:'spring',stiffness:300}}
    >Measure your impact</motion.h1>
    <motion.p className=" text-xl md:text-2xl" 
    
    initial={{ opacity: 0, y: -80 }}
  animate={{opacity:1,y:0}}
  transition={{type:'spring',stiffness:300}}
    >Get in-depth stats on who's been reading your work and keep track of your citations.</motion.p>

  </section>
</section>

<section className="flex flex-col items-center justify-center mt-7 ">
  <motion.h1 className="md:text-5xl text-2xl text-center px-20 md:px-0"
  initial={{ opacity: 0, y: -80 }}
  animate={{opacity:1,y:0}}
  transition={{type:'spring',stiffness:300}}
  
  >Advance your research and join a community of 25 million scientists</motion.h1>
  <button className="md:py-4 md:-py-4 py-2 -py-2 px-12 md:px-16 bg-green-300 md:text-4xl text rounded-md mt-4 text-white ">Join for free</button>
</section>
    </>
  
  )
}

export default Home