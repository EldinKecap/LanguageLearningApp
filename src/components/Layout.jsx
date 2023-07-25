import React from "react";
import NavBar from "./NavBar";
import { useLocation } from "react-router-dom";

export default function Layout({ children }) {
  const location = useLocation();
  let showNavBar = true;
  const isOnQuizPath = /^\/languagelist\/([^/]+)\/(.+)/.test(location.pathname)
  console.log();
  if (isOnQuizPath) {
    showNavBar = false;
  } else {
    showNavBar = true;
  }
  return (
    <>
      {showNavBar ? <NavBar /> : <></>}
      {children}
    </>
  );
}
