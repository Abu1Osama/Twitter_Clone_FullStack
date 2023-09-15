import React from "react";
import Sidebar from "../Components/Sidebar";
import "../Style/Home.scss";
import Detail from "../Components/Detail";

function Home() {
  return (
    <div id="Home" className="Home">
      <Sidebar />
      <Detail/>
    </div>
  );
}

export default Home;
