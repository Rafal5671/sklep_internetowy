import React from "react";
import {
  Container,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Box,
  Button,
} from "@mui/material";
import axios from 'axios';
import {useNavigate } from "react-router-dom";
import { useCart } from "./CartContext"; 
const OrderSummary = ({ products, totalPrice, address, user }) => {
  const { clearCart } = useCart(); 
  const navigate = useNavigate();
  const handlePlaceOrder = async () => {
    try {
      const orderRequest = {
        products: products.map(product => ({
          productId: product.id,
          quantity: product.quantity
        })),
        totalPrice: totalPrice,
        email: user.email, 
        city: address.city,  // Include new address fields
        street: address.address, // Assuming address contains street information
        postalCode: address.postalCode
      };
      const response = await axios.post('http://localhost:8081/api/order/create', orderRequest, { withCredentials: true });
 
      if (response.status === 200) {
        clearCart();
        navigate('/success');
      } else {
        alert("Failed to place order.");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Error placing order.");
    }
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        py: 3,
        backgroundColor: "white",
        marginTop: 3,
        marginBottom: 3,
        borderRadius: 7,
      }}
    >
      <Typography variant="h4" gutterBottom>
        Podsumowanie Zamówienia
      </Typography>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Adres Dostawy
        </Typography>
        <Typography>{address.address}</Typography>
        <Typography>
          {address.city}, {address.postalCode}
        </Typography>
      </Paper>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Dane użytkownika
        </Typography>
        <Typography>Imię: {user.name}</Typography>
        <Typography>Nazwisko: {user.lastName}</Typography>
        <Typography>Email: {user.email}</Typography>
        <Typography>Telefon: {user.phone}</Typography>
      </Paper>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Produkty
        </Typography>
        <List>
          {products.map((product) => (
            <ListItem key={product.id}>
              <ListItemAvatar>
                <img
                  key={product.id}
                  src={product.image || "https://via.placeholder.com/50"}
                  alt={`Product ${product.productName}`}
                  style={{ width: "50px", height: "50px", marginRight: "8px" }}
                />
              </ListItemAvatar>
              <ListItemText
                primary={product.name}
                secondary={`Ilość: ${product.quantity} | Cena: ${product.price} PLN`}
              />
            </ListItem>
          ))}
        </List>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 2,
          }}
        >
          <Typography variant="h6">Łączna Cena: {totalPrice} zł</Typography>
          <Button variant="contained" color="primary" onClick={handlePlaceOrder}>
            Kupuję i płacę
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default OrderSummary;
