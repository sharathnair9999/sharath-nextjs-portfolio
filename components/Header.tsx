import React, { useEffect, useState } from "react";
import { SocialIcon } from "react-social-icons";
type Props = {};
import { motion } from "framer-motion";
import { socials } from "../constants";
import { MdOutlineLightMode } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";
export default function Header({}: Props) {
  const [isDark, setIsDark] = useState<null | boolean>(null);

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
    <header className="sticky top-0 flex items-center justify-center max-w-full px-4 lg:px-10 py-1 lg:py-2 z-30 bg-transparent md:px-20 ">
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
        className="flex items-center mr-auto"
      >
        {/* Social Icons */}
        {socials.map(({ url, fgColor, bgColor, label }, id) => (
          <SocialIcon
            key={id}
            label={label}
            url={url}
            fgColor={fgColor}
            bgColor={bgColor}
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
          fgColor="gray"
          bgColor="transparent"
        />
        <p className="uppercase hidden md:inline-flex text-sm text-gray-400">
          Get In Touch
        </p>
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
            <MdOutlineLightMode
              size={"1.5rem"}
              className="toggle-switch text-gray-400 hover:bg-gray-700 "
            />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: [-100, 20, 0] }}
            transition={{ duration: 1.5 }}
          >
            <MdDarkMode
              size={"1.5rem"}
              className="toggle-switch hover:bg-slate-200 "
            />
          </motion.div>
        )}
      </motion.button>
    </header>
  );
}
