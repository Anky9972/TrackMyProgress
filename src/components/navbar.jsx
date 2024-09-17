import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../services/firebase"; 
import { signOut } from "firebase/auth";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("User is authenticated:", user);
        setUser(user);
        setIsAuthenticated(true);
      } else {
        console.log("User is not authenticated");
        setUser(null);
        setIsAuthenticated(false);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 50) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
        setIsAuthenticated(false);
        navigate("/"); 
      })
      .catch((error) => {
        console.error("Logout Error:", error);
      });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          className="rounded-full top-10 md:min-w-[50vw] lg:min-w-fit fixed z-[5000] inset-x-0 mx-auto max-w-2xl py-2 px-5 flex justify-between items-center bg-white text-black"
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex justify-center items-center">
            <Link to="/" className="text-2xl font-bold">
              DEV<span className=" ml-1 font-normal">Track</span>
            </Link>
          </div>
          <div>
            <ul className="flex items-center gap-5 font-medium">
              <li 
                className="hover:cursor-pointer" 
                onClick={() => navigate("/")}
              >
                Home
              </li>
              <li 
                className="hover:cursor-pointer" 
                onClick={() => navigate("/dashboard")}
              >
                Dashboard
              </li>
              <li 
                className="hover:cursor-pointer" 
                onClick={() => navigate("/sheets")}
              >
                Coding Sheets
              </li>
              {user && (
                <li 
                  className="hover:cursor-pointer" 
                  onClick={() => navigate("/profile")}
                >
                  Profile
                </li>
              )}
              {!isAuthenticated ? (
                <li 
                  className="cursor-pointer flex justify-center items-center px-3 py-2 rounded-full duration-300 transition-all hover:bg-slate-100"
                  onClick={() => navigate("/login")}
                >
                  <button className="py-2 px-5 rounded-3xl font-bold bg-black text-white">
                    Login
                  </button>
                </li>
              ) : (
                <li 
                  className="cursor-pointer flex justify-center items-center px-3 py-2 rounded-full duration-300 transition-all hover:bg-slate-100"
                  onClick={handleLogout}
                >
                  <button className="py-2 px-5 rounded-3xl font-bold bg-black text-white">
                    Logout
                  </button>
                </li>
              )}
            </ul>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
};

export default Navbar;
