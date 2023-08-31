import React from "react";
import Sidebar from "../Components/Sidebar";
import Recomendation from "./Recomendation";
import "../Style/Home.scss";

function Home() {
  return (
    <div id="Home" className="Home">
      <Sidebar />
      <Recomendation />
    </div>
  );
}

export default Home;
