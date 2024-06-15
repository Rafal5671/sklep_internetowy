import React, { useEffect, useState } from 'react';
import OrderSummary from '../components/OrderSummary';
import AppNavbar from '../components/Navbar';
import AppFooter from '../components/Footer';
import axios from 'axios';
import { Container, CircularProgress } from '@mui/material';

const OrderSummaryPage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const address = JSON.parse(sessionStorage.getItem('deliveryAddress'));
  const cart = JSON.parse(sessionStorage.getItem('cart'));

  const orderData = {
    products: cart,
    totalPrice: cart.reduce((total, item) => total + (item.quantity * item.price), 0),
    address: address
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userFromSession = JSON.parse(sessionStorage.getItem('user'));
        console.log("User id",userFromSession.id);
        if (userFromSession.id) {
          const response = await axios.get(`http://localhost:8081/api/user-data/${userFromSession.id}`);
          console.log(response);
          setUser(response.data);
        } else {
          console.error('No user ID found in session storage');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  if (!user) {
    return <div>Error loading user data.</div>;
  }

  return (
    <>
      <AppNavbar />
      <Container>
        <OrderSummary
          products={orderData.products}
          totalPrice={orderData.totalPrice}
          address={orderData.address}
          user={user}
        />
      </Container>
      <AppFooter />
    </>
  );
};

export default OrderSummaryPage;
