import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../Components/Login";
import Auth from "../Pages/Auth";
import Signup from "../Components/Signup";
import Home from "../Pages/Home";
import Profile from "../Components/Profile";

function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Auth />} />
      <Route path="register" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/tweet" element={<Home/>} />
      <Route path="/OsamaSam3468" element={<Profile/>} />
    </Routes>
  );
}

export default AllRoutes;
