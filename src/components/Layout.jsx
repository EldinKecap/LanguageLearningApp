import React from "react";
import NavBar from "./NavBar";
import { useLocation } from "react-router-dom";

export default function Layout({ children }) {
  const location = useLocation();
  console.log(location.pathname);
  let showNavBar = true;
  if (/\/languagelist\/romanian\/.*/.test(location.pathname)) {
    showNavBar = false;
  } else {
    showNavBar = true;
  }
  console.log(showNavBar);
  return (
    <>
      {showNavBar ? <NavBar /> : <></>}
      {children}
    </>
  );
}
