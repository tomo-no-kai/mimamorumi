"use client";
import { motion } from "framer-motion";

type Props = {
  src: string;
  alt: string;
  size?: string;
  onClick?: () => void; // クリックイベントを受け取れるようにする
};

export default function BounceImage({ src, alt, size = "w-10 h-10", onClick }: Props) {
  return (
    <motion.img
      src={src}
      alt={alt}
      className={`${size} cursor-pointer`}
      whileTap={{ scale: 0.85 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 12,
      }}
      onClick={onClick} // ← ここで親から渡したイベントを実行
    />
  );
}