"use client";
import Link from "next/link";
import { RiGithubFill, RiLinkedinFill } from "react-icons/ri";
import { SiLeetcode } from "react-icons/si";
const icons = [
  {
    path: "https://www.linkedin.com/in/rexon-pambujya/",
    name: <RiLinkedinFill />,
    labelText: "LinkedIn Profile",
  },
  {
    path: "https://github.com/Rexon-Pambujya",
    name: <RiGithubFill />,
    labelText: "Github Profile",
  },
  {
    path: "https://leetcode.com/u/Rexon_Pambujya/",
    name: <SiLeetcode />,
    labelText: "LeetCode Profile",
  },
];
export default function Socials({ containerStyles, iconsStyles }) {
  return (
    <div className={`${containerStyles}`}>
      {icons.map((icon, index) => {
        return (
          <Link
            target="_blank"
            href={icon.path}
            key={index}
            aria-label={icon.labelText}
          >
            <div className={`${iconsStyles}`}>{icon.name}</div>
          </Link>
        );
      })}
    </div>
  );
}
