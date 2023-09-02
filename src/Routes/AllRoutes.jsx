import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../Components/Login";
import Auth from "../Pages/Auth";
import Signup from "../Components/Signup";
import Home from "../Pages/Home";
import Profile from "../Components/Profile";
import Bookmarks from "../Components/Bookmarks";

function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Auth />} />
      <Route path="register" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/tweet" element={<Home/>} />
      <Route path="/profile" element={<Profile/>} />
      <Route path="/Bookmarks" element={<Bookmarks/>}/>
{/* 
          <Route path="/explore" component={ExplorePage} />
          <Route path="/profile" component={ProfilePage} />
          <Route path="/notification" component={NotificationPage} />
          <Route path="/messages" component={MessagesPage} />
          <Route path="/communities" component={CommunitiesPage} />
          <Route path="/verified" component={VerifiedPage} />
          <Route path="/more" component={MorePage} /> */}
    </Routes>
  );
}

export default AllRoutes;




