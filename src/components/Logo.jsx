import React from "react";
import "./Logo.css"
import { useNavigate } from "react-router-dom";

export default function Logo() {
  const navigator = useNavigate()

  return (
    <div className="firstWordOfLogo" onClick={()=>{ navigator('');}}>
      Lang<strong className="gradientLetters secondWordOfLogo">Learn</strong>
    </div>
  );
}
