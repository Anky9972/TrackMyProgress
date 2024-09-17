
// const Footer = () => {
//   return (
//     <footer className="bg-gray-800 text-white py-8">
//       <div className="container mx-auto px-6 text-center">
//         <div className="flex justify-center space-x-6 mb-4">
//           <a href="/" className="hover:underline">Home</a>
//           <a href="/about" className="hover:underline">About</a>
//           <a href="/contact" className="hover:underline">Contact</a>
//         </div>
//         <p>&copy; 2024 CodeTracker. All rights reserved.</p>
//       </div>
//     </footer>
//   );
// };

// export default Footer;
const Footer = () => {
  return (
    <footer className="bg-black h-auto text-white py-8 flex flex-col justify-center items-center gap-10">
      <div className="text-2xl font-semibold">DEV Track</div>
      <div className="text-4xl font-semibold text-center">
        Join our newsletter to get the <br />latest news and updates.
      </div>
      <div className="flex justify-center items-center gap-5 w-full">
        <input type="email" placeholder="Enter your email" className="py-2 px-4 rounded-full w-1/5 border-2 border-green-400 " />
        <button className="py-2 px-4 rounded-full bg-[#87db1c] text-black font-medium">Subscribe</button>
      </div>
      <div className="flex justify-center items-center gap-10 font-medium text-slate-300">
        <a href="/" className="hover:underline">Home</a>
        <a href="/about" className="hover:underline">About</a>
        <a href="/contact" className="hover:underline">Contact</a>
        <a href="/dashboard" className="hover:underline">Dashboard</a>
        <a href="/profile" className="hover:underline">Profile</a>
        <a href="/sheets" className="hover:underline">Sheets</a>
        <a href="/code-editor" className="hover:underline">Code Editor</a>
        <a href="/help" className="hover:underline">Help</a>

      </div>
      <div>&copy; 2024 CodeTracker. All rights reserved.</div>
    </footer>
  );
};

export default Footer;
