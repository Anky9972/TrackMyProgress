// src/components/Features.js

const features = [
  {
    title: 'Profile Tracking',
    description: 'Track your profiles across multiple coding platforms like GFG, LeetCode, and more.',
    icon: '👤',
  },
  {
    title: 'Coding Sheets',
    description: 'Create, manage, and track your coding practice sheets efficiently.',
    icon: '📄',
  },
  {
    title: 'Progress Visualization',
    description: 'Visualize your progress with detailed charts and stats.',
    icon: '📊',
  },
  {
    title: 'Collaborative Sheets',
    description: 'Work on coding sheets together with your peers.',
    icon: '🤝',
  },
];

const Features = () => {
  return (
    <section className="p bg-black text-gray-800 px-28">
      <div className="container mx-auto px-6">
        <h2 className="text-6xl font-bold text-center mb-12 text-white">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            // <div key={index} className="p-6 bg-gray-100 rounded-lg text-center">
            //   <div className="text-4xl mb-4">{feature.icon}</div>
            //   <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            //   <p>{feature.description}</p>
            // </div>
        <MeteorsDemo key={index} feature={feature}/>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Features;

import { Meteors } from "../components/ui/meteors";

export function MeteorsDemo(props) {
  const {title,description,icon} = props.feature
  return (
    (<div className="">
      <div className=" w-full relative max-w-xs">
        <div
          className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-500 to-teal-500 transform scale-[0.80] bg-red-500 rounded-full blur-3xl" />
        <div
          className="relative shadow-xl bg-gray-900 border border-gray-800  px-4 py-8 h-full overflow-hidden rounded-2xl flex flex-col justify-end items-start">
          <div
            className="h-5 w-5 rounded-full border flex items-center justify-center mb-4 border-gray-500">
            <div className="text-4xl mb-4">{icon}</div>
          </div>

          <h1 className="font-bold text-xl text-white mb-4 relative z-50">
            {title}
          </h1>

          <p className="font-normal text-base text-slate-500 mb-4 relative z-50">
            {description}
          </p>

          <button className="border px-4 py-1 rounded-lg  border-gray-500 text-gray-300">
            Explore
          </button>

          {/* Meaty part - Meteor effect */}
          <Meteors number={20} />
        </div>
      </div>
    </div>)
  );
}
