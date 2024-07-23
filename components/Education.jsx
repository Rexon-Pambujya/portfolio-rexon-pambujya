"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { useRef } from "react";

const Details = ({ coursetype, time, place, info }) => {
  return (
    <li className="first:mt-0 first:mb-5 mb-5 w-[90%] mx-auto xl:flex-grow flex-1 flex-col items-center text-justify justify-between">
      <div>
        <h3 className="capitalize font-bold xl:text-2xl ">
          {coursetype}&nbsp;
        </h3>
        <span className="capitalize font-medium text-muted-foreground">
          {time} | {place}
        </span>
        <p className="font-light w-full">
          {info.split("\n").map((line, index) => (
            <span key={index}>
              {line}
              {index !== info.split("\n").length - 1 && <br />}
            </span>
          ))}
        </p>
      </div>
    </li>
  );
};

export default function Education() {
  const ref = useRef(null);
  // const completion = useScrollProgress(ref);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center start"],
  });
  const scaleY = scrollYProgress;
  return (
    <div className="my-34">
      <div className="flex items-center justify-center mb-10 gap-x-4">
        <GraduationCap size={28} />
        <h2 className="font-bold text-2xl ">Education</h2>
      </div>
      <div ref={ref} className="w-[85%] mx-auto lg:w-[90%] relative">
        <motion.div
          className="hidden xl:flex absolute left-8 top-0 w-[4px] h-full bg-primary origin-top"
          style={{ scaleY }}
          transition={{ type: "inertia" }}
        />
        <ul className="w-full flex flex-col items-start justify-between xl:ml-8 xs:ml-0.5">
          <Details
            coursetype="Bachelors of Engineering (B.E) IT"
            place="Mumbai, India"
            time="August 2019 - July 2023"
            info="St. Francis Institute of Technology"
          />
          <Details
            coursetype="12th Higher Secondary Certificate (H.S.C)"
            place="Vasai, India"
            time="Aug 2017 – May 2019"
            info="Thomas Baptista Junior College"
          />
          <Details
            coursetype="10th Secondary School Certificate (S.S.C)"
            place="Vasai, India"
            time="Aug 2017 – May 2019"
            info="St. Anthonys Convent High School"
          />
        </ul>
      </div>
    </div>
  );
}
