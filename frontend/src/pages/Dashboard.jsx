import TSDashboard from "../components/UserDashboard/TSDashboard";
import AdminDashboard from "../components/UserDashboard/UserDashboard";
import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import Menu from '../components/Menu/Menu.jsx';

export default function Dashboard() {
  const [userGroup, setUserGroup] = useState(null);
  let user = useContext(AuthContext)

  async function listUser() {
    try {
      const response = await axios.get(`/auth/users/${user.user.user_id}/`);
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
          alert('No tienes ningun rol asignado. Consultar con administración')
          window.location.assign("/");
      }
    } catch (error) {
      console.error("Error fetching user data", error);
    }
  }

  useEffect(() => {
    listUser();
  }, []);

  return (
    <div>
      <body>
        {userGroup === 1 && <AdminDashboard />}
        {userGroup === 2 && <TSDashboard />}
      </body>
    </div>
    
  );
}
