import React from "react";
import NavBar from "./NavBar";
import { useLocation } from "react-router-dom";

export default function Layout({ children }) {
  const location = useLocation();
  let showNavBar = true;
  if (/\/languagelist\/romanian\/\b/.test(location.pathname)) {
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
