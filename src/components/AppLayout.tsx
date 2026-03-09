import type { ReactNode } from "react";
import NavBar from "./NavBar/NavBar";
import "./NavBar/NavBar.css";
import { Footer } from "./Footer";

export function AppLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <header className="site-header">
        <NavBar />
      </header>
      <main>{children}</main>
      <Footer />
    </>
  );
}
