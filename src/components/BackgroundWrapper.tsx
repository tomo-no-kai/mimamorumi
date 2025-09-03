import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function BackgroundWrapper({ children }: Props) {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* 背景 */}
      <div className="absolute inset-0 -z-10">
        <img
          src="/background.png"
          alt="背景"
          className="w-full h-full object-cover"
        />
      </div>
      {/* 中身 */}
      {children}
    </div>
  );
}
