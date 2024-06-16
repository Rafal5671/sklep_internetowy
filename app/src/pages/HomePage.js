import React from "react";
import { Container, Box, Typography } from "@mui/material";
import ProductZone from "../components/ProductZone";
import Slider from "../components/Slider";
import CookiesPopup from "../components/CookiesPopup";

function HomePage() {
    return (
        <>
            <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
                <Container
                    maxWidth="lg"
                    sx={{
                        py: 3,
                        marginTop: 3,
                        marginBottom: 3,
                        borderRadius: 7,
                        backgroundColor: "white",
                    }}
                >
                    <Slider />
                    <Typography
                        variant="h4"
                        component="h2"
                        sx={{ 
                            fontWeight: 'bold', 
                            marginTop: 4, 
                            marginBottom: 2,
                            color: '#333',
                            textAlign: 'left' 
                        }}
                    >
                        Polecane:
                    </Typography>
                    <ProductZone />
                    <CookiesPopup/>
                </Container>
            </Box>
        </>
    );
}

export default HomePage;
