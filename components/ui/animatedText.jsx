"use client";
import { motion } from "framer-motion";

const quote = {
  initial: {
    opacity: 1,
  },
  animate: {
    opacity: 1,
    transition: {
      delay: 0.5,
      staggerChildren: 0.08,
    },
  },
};

const singelWord = {
  initial: {
    opacity: 0,
    y: 50,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
    },
  },
};

export const AnimatedText = ({ text, className }) => {
  return (
    <div
      className="w-full mx-auto flex items-center justify-center text-center 
  overflow-hidden
    "
    >
      <motion.h3
        variants={quote}
        initial="initial"
        animate="animate"
        className={`inline-block w-full text-dark font-bold
        capitalize text-4xl ${className}`}
      >
        {text.split(" ").map((word, index) => (
          <motion.span
            variants={singelWord}
            key={word + "-" + index}
            className="inline-block"
          >
            {word}&nbsp;
          </motion.span>
        ))}
      </motion.h3>
    </div>
  );
};
