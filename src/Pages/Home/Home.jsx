import React from "react";
import BanarOne from "./section/BanarOne";
import SectionThree from "./section/SectionThree";
import Books from "./Books/Books";
import SectionTwo from "./section/SectionTwo";
import useTitle from "../../hooks/useTitle";

const Home = () => {
  useTitle("Home");
  return (
    <div>
      <BanarOne></BanarOne>
      <Books></Books>
      <SectionTwo></SectionTwo>
      <SectionThree></SectionThree>
    </div>
  );
};

export default Home;
