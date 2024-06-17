import React, { useState, useEffect } from "react";
import { Container, CssBaseline, Typography, Box, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/profile/Sidebar";
import OrderSection from "../components/profile/OrderSection";

const Profile = () => {
  const [activeSection, setActiveSection] = useState("orders");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userJson = sessionStorage.getItem("user");
    if (userJson) {
      const parsedUser = JSON.parse(userJson);
      console.log("User object:", parsedUser);
      setUser(parsedUser);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("basket");
    navigate("/");
  };

  const renderSection = () => {
    switch (activeSection) {
      case "orders":
        return <OrderSection />;
      default:
        return <OrderSection />;
    }
  };

  if (!user) {
    return null;
  }

  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ display: "flex", flexDirection: "row", mt: 4, mb: 4 }}>
        <Box sx={{ width: "240px", mr: 4 }}>
          <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} onLogout={handleLogout} userRole={user.userType} />
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <Paper elevation={3} sx={{ padding: 3, backgroundColor: "#F5F5F5" }}>
            <Box mb={4}>
              <Typography variant="h4" gutterBottom>
                Cześć, {user.name}
              </Typography>
              {renderSection()}
            </Box>
          </Paper>
        </Box>
      </Container>
    </>
  );
};

export default Profile;
