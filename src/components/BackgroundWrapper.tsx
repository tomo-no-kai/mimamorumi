import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function BackgroundWrapper({ children }: Props) {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* 背景 */}
      <div className="absolute inset-0 -z-10 bg-[url('/back.png')] bg-cover bg-top" />

      {/* 中身 */}
      {children}
    </div>
  );
}
