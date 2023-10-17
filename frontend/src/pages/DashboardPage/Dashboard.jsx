import TSDashboard from "../../components/UserDashboard/TSDashboard";
import AdminDashboard from "../../components/UserDashboard/UserDashboard";
import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import AuthContext from "../../context/AuthContext";
import Menu from '../../components/Menu/Menu.jsx';
import './Dashboard.css';

export default function Dashboard() {
  const [userGroup, setUserGroup] = useState(null);
  let {user, authTokens} = useContext(AuthContext);

  async function listUser() {
    let headers = {
      "Content-Type": "application/json",
      "Authorization": "JWT " + authTokens.access,
      "Accept": "application/json"
  }

  console.log(headers, "USUARIO ", user)
    try {
      const response = await axios.get(`/auth/users/${user.user_id}/`, {headers: headers});
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
      <header className="mb-5">
          <Menu />
      </header>
      <body>     
      <div className="fijar">
        {userGroup === 1 && <AdminDashboard />}
        {userGroup === 2 && <TSDashboard />}
        </div>
      </body>
    </div>
        
  );
}
