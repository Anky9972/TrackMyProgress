import { Sidebar, SidebarBody, SidebarLink } from "../components/ui/sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "../lib/utils";
import { useState, useEffect } from "react";
import GitHubProfile from "./codingprofile/githubprofile";
import UserStatsChart from "./userstatecharts";
import RecentActivity from "./RecentActivity";
import Suggestions from "./Suggestions";
import LeetCodeProfile from './codingprofile/LeetCodeProfile'

import { auth } from "../services/firebase";
import { signOut } from "firebase/auth";
import GeeksforGeeksProfile from "./codingprofile/GeeksForGeeksProfile";
import CodeforcesProfile from "./codingprofile/CodeForcesProfile";
import CodingNinjasProfile from "./codingprofile/CodingNinjasProfile";

export default function SidebarDemo() {
  const [open, setOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Monitor the authentication state
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsAuthenticated(!!user);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setIsAuthenticated(false);
        navigate("/"); // Redirect to home or login page after logging out
      })
      .catch((error) => {
        console.error("Logout Error:", error);
      });
  };

  const links = [
    {
      label: "Events",
      href: "/events",
      icon: (
        <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Profile",
      href: "/profile",
      icon: (
        <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Settings",
      href: "/settings",
      icon: (
        <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Logout",
      href: "#",
      icon: (
        <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
      onClick: handleLogout, // Attach logout logic here
    },
  ];

  return (
    <div
      className={cn(
        " flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1  mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
        "min-h-screen" // for your use case, use `h-screen` instead of `h-[60vh]`
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} onClick={link.onClick} />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: "Manu Arora",
                href: "#",
                icon: (
                  <img
                    src="https://assets.aceternity.com/manu.png"
                    className="h-7 w-7 flex-shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      <Dashboard />
    </div>
  );
}

export const Logo = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre"
      >
        Acet Labs
      </motion.span>
    </Link>
  );
};

export const LogoIcon = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </Link>
  );
};

// Dummy dashboard component with content
const Dashboard = () => {
  const dummyStats = {
    dates: ['Jan', 'Feb', 'Mar', 'Apr'],
    solved: [10, 20, 15, 30],
  };

  return (
    <div className="flex flex-1">
      <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md col-span-1 md:col-span-2 lg:col-span-2">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Your Progress
            </h2>
            <UserStatsChart stats={dummyStats} />
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Recent Activity
            </h2>
            <RecentActivity />
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md col-span-1 lg:col-span-1">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              GitHub Profile
            </h2>
            <GitHubProfile username="Anky9972" />
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md col-span-1 lg:col-span-1">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Leetcode Profile
            </h2>
            <LeetCodeProfile username="Anky9972" />
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md col-span-1 lg:col-span-1">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              GeeksForGeeks Profile
            </h2>
            <GeeksforGeeksProfile username="ankygaur9972" />
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md col-span-1 lg:col-span-1">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Codeforces Profile
            </h2>
            <CodeforcesProfile username="ankygaur9972" />
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md col-span-1 lg:col-span-1">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              CodingNinjas Profile
            </h2>
            <CodingNinjasProfile username="ankygaur" />
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md col-span-1 lg:col-span-1">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Suggestions
            </h2>
            <Suggestions />
          </div>
          {/* <div className="bg-white p-6 rounded-lg shadow-md col-span-1 md:col-span-2 lg:col-span-3">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Coding Sheets
            </h2>
            <CodingSheet />
          </div> */}
        </div>
      </div>
    </div>
  );
};
