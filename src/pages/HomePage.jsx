import React from "react";
import NavBar from "../components/NavBar";
import HeroSection from "../components/HeroSection";
import InformationSection from "../components/InformationSection";

import TryForFreeSection from "../components/TryForFreeSection";
import SpatialRepetitionSection from "../components/SpatialRepetitionSection";
import ContactUsSection from "../components/ContactUsSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <InformationSection />
      <SpatialRepetitionSection />
      <TryForFreeSection />
      <ContactUsSection />
    </>
  );
}
