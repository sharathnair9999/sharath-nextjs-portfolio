import React, { useEffect, useState } from "react";
import { SocialIcon } from "react-social-icons";
type Props = { socials: Social[] };
import { motion } from "framer-motion";
import { SunIcon } from "@heroicons/react/24/outline";
import { MoonIcon } from "@heroicons/react/24/solid";
import { Social } from "../typings";
export default function Header({ socials }: Props) {
  const [isDark, setIsDark] = useState<null | boolean>(null);
  const fgColor = isDark ? "hsl(0, 0%, 40%)" : "hsl(0, 0%, 30%)";
  useEffect(() => {
    if (typeof window !== undefined) {
      ((theme = "dark") => {
        document.documentElement.classList.add(theme);
        setIsDark(theme === "dark");
      })(localStorage.getItem("theme") ?? "dark");
    }
  }, []);

  const toggleDarkMode = () => {
    if (isDark) {
      setIsDark((state) => !state);
      localStorage?.setItem("theme", "light");
      document.documentElement.classList.remove("dark");
    } else {
      setIsDark((state) => !state);
      localStorage?.setItem("theme", "dark");
      document.documentElement.classList.add("dark");
    }
  };
  return (
    <header className="sticky top-0  bg-inherit  z-50 w-full  ">
      <div className="px-4 lg:px-10 py-1 lg:py-2 mx-auto max-w-7xl md:px-20 flex">
        <motion.div
          initial={{
            x: -500,
            opacity: 0,
            scale: 0.5,
          }}
          animate={{
            x: 0,
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 1.5,
          }}
          className="flex items-center mr-auto max-w-6xl justify-center"
        >
          {/* Social Icons */}
          {socials.map((social) => (
            <SocialIcon
              key={social._id}
              label={social.title}
              url={social.url}
              fgColor={fgColor}
              bgColor="transparent"
            />
          ))}
        </motion.div>
        <motion.div
          initial={{
            x: -500,
            opacity: 0,
            scale: 0.5,
          }}
          animate={{
            x: 0,
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 1,
          }}
          className="flex items-center mr-3 lg:mr-8 text-gray-300 cursor-pointer "
        >
          <SocialIcon
            className="cursor-pointer"
            network="email"
            fgColor={fgColor}
            bgColor="transparent"
          />
          <a
            href="#contact"
            className="uppercase hidden md:inline-flex text-sm text-gray-700 dark:text-gray-400"
          >
            Get In Touch
          </a>
        </motion.div>
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            duration: 1,
          }}
          onClick={toggleDarkMode}
        >
          {isDark ? (
            <motion.div
              initial={{ opacity: 0, x: 200 }}
              animate={{ opacity: 1, x: [-100, 20, 0] }}
              transition={{ duration: 1.5 }}
            >
              <SunIcon className="h-8 w-8 p-1 rounded-full shadow-md shadow-gray_100/30 border border-gray_500/30 text-gray-400 hover:bg-gray_800 " />
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, x: 200 }}
              animate={{ opacity: 1, x: [-100, 20, 0] }}
              transition={{ duration: 1.5 }}
            >
              <MoonIcon className="h-8 w-8 p-1 rounded-full hover:bg-gray_100 border shadow-md shadow-gray_500 border-gray_500/30" />
            </motion.div>
          )}
        </motion.button>
      </div>
    </header>
  );
}
