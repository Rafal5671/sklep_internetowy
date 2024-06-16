import React from "react";
import { Box,Container } from "@mui/material";
import CartZone from "../components/CartZone";
function Cart() {
  return (
    <>
      <Box
        sx={{ display: "flex", flexDirection: "column" }}
      >
        <Container>
        <CartZone />
        </Container>
      </Box>
    </>
  );
}

export default Cart;
