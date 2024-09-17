// src/components/CallToAction.js

const CallToAction = () => {
  return (
    <section className="bg-black text-white py-16 text-center">
      {/* <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold mb-4">Ready to Track Your Coding Journey?</h2>
        <p className="mb-8">Sign up now and start making consistent progress in your coding skills.</p>
        <a href="/signup" className="bg-white text-blue-600 py-2 px-4 rounded hover:bg-gray-200 transition duration-300">
          Sign Up Now
        </a>
      </div> */}
      <TypewriterEffectSmoothDemo/>
    </section>
  );
};

export default CallToAction;


import { TypewriterEffectSmooth } from "../components/ui/typewriter-effect";
export function TypewriterEffectSmoothDemo() {
  const words = [
    {
      text: "Ready ",
    },
    {
      text: "to",
    },
    {
      text: "Track",
    },
    {
      text: "Your",
    },
    {
      text: "Coding",
      className:"text-purple-400 dark:text-purple-400"
    },
    {
      text: "Journey?",
      className:"text-purple-400 dark:text-purple-400"
    },
    // {
    //   text: "Aceternity.",
    //   className: "text-blue-500 dark:text-blue-500",
    // },
  ];
  return (
    <div className="flex flex-col items-center justify-center h-[40rem]  ">
      {/* <p className="text-neutral-600 dark:text-neutral-200 text-xs sm:text-base  ">
        The road to freedom starts from here
      </p> */}
      <TypewriterEffectSmooth words={words} />
      <p className="text-md mb-10">Sign up now and start making consistent progress in your coding skills.</p>
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
        <button className="w-40 h-10 rounded-xl bg-black border dark:border-white border-transparent text-white text-sm">
          Login
        </button>
        <button className="w-40 h-10 rounded-xl bg-white text-black border border-black  text-sm">
          Signup
        </button>
      </div>
    </div>
  );
}
