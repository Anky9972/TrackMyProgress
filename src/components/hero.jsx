// src/components/Hero.js

// const Hero = () => {
//   return (
//     <section className="bg-gray-800 text-white h-screen flex items-center justify-center text-center p-6">
//       <div>
//         <h1 className="text-4xl md:text-6xl font-bold mb-4">Track Your Coding Progress</h1>
//         <p className="text-lg md:text-xl mb-8">Monitor your performance across various coding platforms and manage your coding sheets all in one place.</p>
//         <a href="/signup" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-500 transition duration-300">
//           Get Started
//         </a>
//       </div>
//     </section>
//   );
// };

// export default Hero;

import { motion } from "framer-motion";
import { AuroraBackground } from "../components/ui/aurora-background";

export default function Hero() {
  return (
    (<AuroraBackground>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-4 items-center justify-center px-4">
        <div className="text-3xl md:text-7xl font-bold dark:text-white text-center">
        Track Your Coding Progress
        </div>
        <div
          className="px-20 font-extralight text-base md:text-2xl dark:text-neutral-200 py-4">
          Monitor your performance across various coding platforms and manage your coding sheets all in one place.
        </div>
        <button
          className="bg-black dark:bg-white rounded-full w-fit text-white dark:text-black px-4 py-2">
          Get Started
        </button>
      </motion.div>
    </AuroraBackground>)
  );
}
