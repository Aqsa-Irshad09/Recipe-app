import React, { useState, useEffect } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import LogoutButton from "../LogoutButton";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";

const LoginButton = () => {
  const navigate = useNavigate();
  const CLIENTID =
    "977570644682-jmes017jkq5r2pl4fu1kd146jnh4do8t.apps.googleusercontent.com";
  const URL = "https://accounts.google.com/o/oauth2/revoke?token=";
  const [accessToken, setAccessToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedAccessToken = localStorage.getItem("accessToken");
    if (storedAccessToken) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = async () => {
    if (accessToken) {
      try {
        await fetch(URL + accessToken, {
          method: "GET",
        });
        console.log("Access token revoked.");
      } catch (error) {
        console.error("Failed to revoke the token: ", error);
      }

      // Clear the access token
      setAccessToken(null);
      setIsLoggedIn(false);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("isLoggedIn");
      console.log("Logout Successfully");
    }
  };

  const handleSuccessfulLogin = (credentialResponse) => {
    setAccessToken(credentialResponse.credential);
    setIsLoggedIn(true);
    localStorage.setItem("accessToken", credentialResponse.credential);
    localStorage.setItem("isLoggedIn", "true");
    const userDetails = jwtDecode(credentialResponse.credential);
    localStorage.setItem("userDetails", JSON.stringify(userDetails));
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  return (
    <GoogleOAuthProvider clientId={CLIENTID}>
      {isLoggedIn ? (
        <Box sx={{ py: 2, maxWidth: "100%" }} className="logoutContainer">
          {/* Display user information when logged in */}
          <p>Logged in as: {jwtDecode(accessToken).name}</p>
          <LogoutButton onLogout={handleLogout} />
        </Box>
      ) : (
        <GoogleLogin
          onSuccess={handleSuccessfulLogin}
          onError={() => {
            console.log("Login Failed");
          }}
        />
      )}
    </GoogleOAuthProvider>
  );
};

export default LoginButton;
