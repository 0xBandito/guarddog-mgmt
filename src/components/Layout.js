import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Nav from "./Nav";
import Footer from "./Footer";
import ScrollRestore from "./ScrollRestore";
import { GRAIN } from "../constants/colors";

export default function Layout() {
  const location = useLocation();

  useEffect(() => {
    // On non-homepage routes, hide the pre-React loader as soon as React mounts.
    // On the homepage, HomePage's own Loader takes over — it will hide the
    // pre-React loader once its first frame is ready (via window.__hideInitialLoader).
    if (location.pathname !== "/") {
      const el = document.getElementById("initial-loader");
      if (el) el.classList.add("hidden");
    }
  }, [location.pathname]);

  return (
    <>
      <ScrollRestore />
      <div style={{ position: "fixed", inset: 0, backgroundImage: GRAIN, backgroundRepeat: "repeat", backgroundSize: "256px 256px", pointerEvents: "none", zIndex: 50, opacity: 0.5, mixBlendMode: "overlay" }} />
      <Nav />
      <Outlet />
      <Footer />
    </>
  );
}
