import React from "react";
import Navbar from "../components/Navbar";
import UserProfile from "../components/UserProfile";

const Dashboard = () => {
  return (
    <div className="h-screen">
      <div className="flex bg-[#FCF5EA] h-full">
        <Navbar />
        <div className="flex-1 p-4 overflow-y-auto">
          {" "}
          {/* Scroll container here */}
          <UserProfile />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
