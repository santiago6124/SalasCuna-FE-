import { createContext, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

const AuthContext = createContext();

export default AuthContext;
export const AuthProvider = ({ children }) => {
  let [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );
  let [user, setUser] = useState(() =>
    localStorage.getItem("authTokens")
      ? jwt_decode(localStorage.getItem("authTokens"))
      : null
  );
  let [loading, setLoading] = useState(true);

  let history = useNavigate();

  let signupUser = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const payload = {
      first_name: formData.get("first_name"),
      last_name: formData.get("last_name"),
      dni: formData.get("dni"),
      phone_number: formData.get("phone_number"),
      address: formData.get("address"),
      department: formData.get("department"),
      city: formData.get("city"),
      email: formData.get("email"),
      password: formData.get("password"),
      re_password: formData.get("re_password"),
    };
    const group = {
      groups: [parseInt(formData.get("role"))],
    };
    let response = await fetch("/auth/users/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: JSON.stringify(payload),
    });
    if (response.status === 201) {
      let us = await axios.get("/api/user/");
      var userId = us.data[us.data.length - 1].id;
      let response2 = await axios.patch(`/api/user/${userId}/`, group, {
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": Cookies.get("csrftoken"),
        },
      });
      if (response2.status === 200) {
        alert("Revisar email para verificar tu cuenta");
      } else {
        alert("Error");
      }
    } else if (response.status === 400) {
      alert("Bad Request. Email is already in use");
    } else {
      alert("Something went wrong");
    }
  };

  let loginUser = async (e) => {
    e.preventDefault();
    let response = await fetch("/auth/jwt/create/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: e.target.username.value,
        password: e.target.password.value,
      }),
    });
    let data = await response.json();
    if (response.status === 200) {
      setAuthTokens(data);
      setUser(jwt_decode(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
      history("/home-page");
    } else {
      alert("Something went wrong");
    }
  };

  let logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
  };

  let updateToken = async () => {
    console.log("Update");
    try {
        let response = await fetch("/auth/jwt/refresh", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": "JWT " + authTokens.access,
            },
            body: JSON.stringify({ refresh: authTokens?.refresh }),
        });

        var data = await response.json();

        if (response.status === 200) {
            setAuthTokens(data);
            setUser(jwt_decode(data.access));
            localStorage.setItem("authTokens", JSON.stringify(data));
          } else {
            logoutUser();
          }
    } catch (error) {
        console.log(error.message)
    }

    if (loading) {
      setLoading(false);
    }
  };

  let contextData = {
    user: user,
    authTokens: authTokens,
    signupUser: signupUser,
    loginUser: loginUser,
    logoutUser: logoutUser,
  };

  useEffect(() => {
    if (loading) {
      updateToken();
    }

    let fourMinutes = 1000 * 60 * 60;
    let interval = setInterval(() => {
      if (authTokens) {
        updateToken();
      }
    }, fourMinutes);
    return () => clearInterval(interval);
  }, [authTokens, loading]);

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
