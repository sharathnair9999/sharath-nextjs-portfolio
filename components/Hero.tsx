import Link from "next/link";
import React from "react";
import { Cursor, useTypewriter } from "react-simple-typewriter";
import BackgroundCircles from "./BackgroundCircles";
import { motion } from "framer-motion";
import { PageInfo } from "../typings";
import { urlFor } from "../sanity";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
type Props = { pageInfo: PageInfo };

const Hero = ({ pageInfo }: Props) => {
  const [text] = useTypewriter({
    words: pageInfo?.typewriterWords,
    loop: true,
    delaySpeed: 200,
  });
  return (
    <div className="min-h-screen flex flex-col items-center space-y-8 justify-center text-center overflow-hidden">
      <BackgroundCircles />
      <motion.img
        initial={{
          opacity: 0,
          scale: 2,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 2,
        }}
        src={urlFor(pageInfo?.heroImage).url()}
        alt={pageInfo?.name}
        className="h-32 w-32 rounded-full relative mx-auto object-cover"
      />
      <div className="z-20">
        <h2 className="text-xs font-bold md:text-md uppercase text-gray-500 dark:text-gray-500 pb-2 tracking-[10px] md:tracking-[15px]">
          {pageInfo?.role}
        </h2>
        <h1 className="text-2xl lg:text-4xl font-semibold px-10">
          <span className="italic dark:text-white">{text}</span>
          <Cursor cursorColor="#4e87f9" />
        </h1>
        <div className="flex flex-wrap justify-center items-center gap-2 md:gap-3 mt-3">
          <Link href={"#about"}>
            <button className="heroButton">About</button>
          </Link>
          <Link href={"#experience"}>
            <button className="heroButton">Experience</button>
          </Link>
          <Link href={"#skills"}>
            <button className="heroButton">Skills</button>
          </Link>
          <Link href={"#projects"}>
            <button className="heroButton">Projects</button>
          </Link>
        </div>
        <a
          className="text-gray_900/80 hover:text-gray_900 dark:text-blue_200 hover:dark:text-blue_300 transition-colors gap-1 md:gap-2 font-normal lg:font-light flex justify-center items-center w-fit mx-auto pt-5 text-xs lg:text-base"
          target={"_blank"}
          href={pageInfo?.fileUrl}
        >
          <span>Resume</span>
          <ArrowTopRightOnSquareIcon height={"1rem"} width="1rem" />
        </a>
      </div>
    </div>
  );
};

export default Hero;
