"use client";
import { motion } from "framer-motion";

type BannerProps = {
  text: string;
};

export default function Banner({ text }: BannerProps) {
  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "tween", stiffness: 100, damping: 12 }}
      className="fixed top-0 left-0 w-full bg-white py-9 text-center text-base font-medium rounded-b-[80px] rounded-t-none shadow-xl z-50"
    >
      <span className="block mt-14">{text}</span>
    </motion.div>
  );
}