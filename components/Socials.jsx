import Link from "next/link";
import { RiGithubFill, RiLinkedinFill } from "react-icons/ri";
import { SiLeetcode } from "react-icons/si";

import { socials } from "@/content/socials";

const iconMap = {
  linkedin: RiLinkedinFill,
  github: RiGithubFill,
  leetcode: SiLeetcode,
};

export default function Socials({ containerStyles = "", iconsStyles = "" }) {
  return (
    <ul className={containerStyles}>
      {socials.map((social) => {
        const Icon = iconMap[social.icon];
        if (!Icon) return null;

        return (
          <li key={social.href}>
            <Link
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${social.label} profile`}
              // 44px hit area regardless of how small the glyph is
              className={`inline-flex h-11 w-11 items-center justify-center
                          rounded-full transition-colors ${iconsStyles}`}
            >
              <Icon aria-hidden />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
