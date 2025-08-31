import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function BackgroundWrapper({ children }: Props) {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* 背景 */}
      <div
      className="absolute inset-0 -z-10 bg-[url('/back.png')] bg-cover bg-top bg-no-repeat"
      style={{ width: "100%", height: "100vh", minHeight: "100%", objectFit: "cover" }}
      />
      {/* 中身 */}
      {children}
    </div>
  );
}
