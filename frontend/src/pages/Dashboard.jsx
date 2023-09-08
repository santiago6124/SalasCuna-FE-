import TSDashboard from "../components/UserDashboard/TSDashboard";
import AdminDashboard from "../components/UserDashboard/UserDashboard";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Dashboard() {
  const [userGroup, setUserGroup] = useState(null);

  async function listUser() {
    try {
      const response = await axios.get("/auth/users/me/");
      const userData = response.data;
      console.log("user", userData);

      switch (userData.groups[0]) {
        case 1:
          setUserGroup(1);
          break;
        case 2:
          setUserGroup(2);
          break;
        default:
          setUserGroup(null);
      }
    } catch (error) {
      console.error("Error fetching user data", error);
    }
  }

  useEffect(() => {
    listUser();
  }, []);

  return (
    <body>
      {userGroup === 1 && <AdminDashboard />}
      {userGroup === 2 && <TSDashboard />}
    </body>
  );
}
