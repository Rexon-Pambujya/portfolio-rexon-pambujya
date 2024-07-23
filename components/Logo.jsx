import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const MotionLink = motion(Link);

export default function Logo() {
  return (
    <motion.div>
      <MotionLink
        href="/"
        className="bg-dark text-white flex items-center justify-center rounded-full text-xl"
        style={{ width: 40, height: 40 }}
        alt=""
        animate={{
          backgroundColor: [
            "#121212",
            "rgba(131,58,180,1)",
            "rgba(253,29,29,1)",
            "rgba(252,176,69,1)",
            "rgba(131,58,180,1)",
            "#121212",
          ],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
        }}
      >
        RP
      </MotionLink>
    </motion.div>
  );
}
