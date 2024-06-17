import React, { useState } from 'react';
import { Container, Grid, Card, CardContent, Typography, Button, Divider, Snackbar } from '@mui/material';
import CartItem from './CartItem';
import { Link } from 'react-router-dom';
import CartSummary from './CartSummary';
import { ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';


const CartZone = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  const [showEmptyCartSnackbar, setShowEmptyCartSnackbar] = useState(false);

  const handleQuantityChange = (id, newQuantity) => {
    updateQuantity(id, newQuantity);
  };

  const handleRemove = (id) => {
    removeFromCart(id);
  };

  const handleDelivery = () => {
    if (cartItems.length === 0) {
      setShowEmptyCartSnackbar(true);
    } else {
      const user = sessionStorage.getItem('user');
      if (user) {
        navigate('/delivery');
      } else {
        navigate('/login');
      }
    }
  };

  const handleCloseSnackbar = () => {
    setShowEmptyCartSnackbar(false);
  };

  const itemCount = cartItems.reduce((count, item) => count + item.quantity, 0);
  const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const productText = itemCount === 1 ? 'produkt' : 'produkty';

  return (
    <section>
      <Container sx={{ py: 5 }}>
        <Grid container justifyContent="center" alignItems="center">
          <Grid item xs={12}>
            <Card sx={{ borderRadius: 2 }}>
              <CardContent sx={{ p: 0 }}>
                <Grid container spacing={0}>
                  <Grid item lg={8}>
                    <div style={{ padding: '40px' }}>
                      <Grid container justifyContent="space-between" alignItems="center" sx={{ mb: 5 }}>
                        <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'black' }}>
                          Koszyk
                        </Typography>
                        <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
                          {itemCount} {productText}
                        </Typography>
                      </Grid>

                      <Divider sx={{ my: 4 }} />

                      {cartItems.length > 0 ? cartItems.map(item => (
                          <CartItem
                              key={item.id}
                              item={item}
                              onQuantityChange={handleQuantityChange}
                              onRemove={handleRemove}
                          />
                      )) : (
                          <Typography variant="subtitle1">
                            Twój koszyk jest pusty
                          </Typography>
                      )}

                      <div style={{ paddingTop: '20px' }}>
                        <Button startIcon={<ArrowBack />} component={Link} to="/" variant="text">
                          Kontynuj zakupy
                        </Button>
                      </div>
                    </div>
                  </Grid>
                  <Grid item lg={4} sx={{ backgroundColor: '#f5f5f5' }}>
                    <CartSummary
                        itemCount={itemCount}
                        totalPrice={totalPrice}
                        onDelivery={handleDelivery}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Snackbar
        open={showEmptyCartSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message="Twój koszyk jest pusty. Proszę dodaj produkty do koszyka przed przejściem do dostawy."
      />
    </section>
  );
}

export default CartZone;

