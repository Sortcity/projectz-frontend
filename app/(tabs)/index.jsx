import React, { useContext, useEffect } from "react";
import Login from "../Views/Auth/Login";

import { UserContext } from "@/scripts/UserContext";

import axios from "axios";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const accesstoken = sessionStorage.getItem("accesstoken");
  const { token, setToken } = useContext(UserContext);
  const { userData, setUserData } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (!token) {
        setToken(accesstoken);
      }
      try {
        const response = await axios.get(
          "https://sortcity.ap-south-1.elasticbeanstalk.com:443/userDetails",
          {
            headers: {
              Authorization: `Bearer ${accesstoken}`,
            },
          }
        );

        const user = response.data;
        if (user) {
          setUserData(user);
        }
        router.replace("/Dashboard");
      } catch (error) {
        console.error("Error fetching user details:", error);
        return null;
      }
    };
    fetchUserDetails();
  }, [accesstoken]);

  return <Login />;
}
