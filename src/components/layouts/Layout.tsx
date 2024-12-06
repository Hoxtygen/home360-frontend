import { ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";

interface LayoutProps {
  children: ReactNode;
}
export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-[100dvh] grid grid-rows-[auto_1fr_auto]">
      <Header />
      <div className="dark:bg-white dark: text-black">{children}</div>
      <Footer />
    </div>
  );
}
