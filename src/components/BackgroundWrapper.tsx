import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function BackgroundWrapper({ children }: Props) {
  return (
    <div className="fixed top-0 left-0 w-full md:w-[420px] md:left-1/2 md:-translate-x-1/2 h-screen overflow-hidden bg-main">
      {/* 背景 */}
      <div className="absolute inset-0 -z-10">
        <img
          src="/background.png"
          alt="背景"
          className="w-full h-full object-cover"
        />
      </div>
      {/* 中身 */}
      <div className="relative w-full h-full overflow-y-auto">
        {children}
      </div>
    </div>
  );
}
