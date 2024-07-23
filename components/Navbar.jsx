import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { motion } from "framer-motion";

const links = [
  { path: "/", name: "Home" },
  { path: "/projects", name: "Projects" },
  { path: "/contact", name: "Contact" },
];

export default function Navbar({
  containerStyles,
  linkStyles,
  underLineStyles,
}) {
  const path = usePathname();
  return (
    <nav className={`${containerStyles}`}>
      {links.map((link, index) => {
        return (
          <Link
            href={link.path}
            key={index}
            className={`relative capitalize ${linkStyles}`}
          >
            {link.path === path && (
              <motion.span
                initial={{ y: "-100%" }}
                animate={{ y: 0 }}
                transition={{ type: "tween" }}
                layoutId="underline"
                className={`absolute bottom-0 left-0 h-[2.5px] bg-primary w-full ${underLineStyles}`}
              />
            )}
            {link.name}
          </Link>
        );
      })}
    </nav>
  );
}
