"use client";
import Link from "next/link";
import { RiGithubFill, RiLinkedinFill } from "react-icons/ri";
const icons = [
  {
    path: "https://www.linkedin.com/in/rexon-pambujya/",
    name: <RiLinkedinFill />,
  },
  {
    path: "https://github.com/Rexon-Pambujya",
    name: <RiGithubFill />,
  },
];
export default function Socials({ containerStyles, iconsStyles }) {
  return (
    <div className={`${containerStyles}`}>
      {icons.map((icon, index) => {
        return (
          <Link target="_blank" href={icon.path} key={index}>
            <div className={`${iconsStyles}`}>{icon.name}</div>
          </Link>
        );
      })}
    </div>
  );
}
