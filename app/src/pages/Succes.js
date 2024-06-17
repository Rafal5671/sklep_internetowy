import React from "react";
import { Container, Typography, Box, Button } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const PaymentSuccess = () => {

    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    py: 3,
                    marginTop: 3,
                    marginBottom: 3,
                    borderRadius: 7,
                    width: "100%",
                }}
            >
                <Container maxWidth="sm" style={{ textAlign: "center" }}>
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        p={3}
                        boxShadow={3}
                        borderRadius={8}
                        backgroundColor={"white"}
                    >
                        <CheckCircleIcon style={{ fontSize: 80, color: "green" }} />
                        <Typography variant="h4" gutterBottom>
                            Zamówienie zostało złożone pomyślnie!
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            Dziękujemy za złożenie zamówienia.
                        </Typography>
                        <Button variant="contained" color="primary" href="/">
                            Powrót do strony głównej
                        </Button>
                    </Box>
                </Container>
            </Box>
        </>
    );
};

export default PaymentSuccess;
