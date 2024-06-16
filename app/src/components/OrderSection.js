import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Paper, Typography } from '@mui/material';

const OrderSection = () => {
    const [orders, setOrders] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const loggedUser = JSON.parse(sessionStorage.getItem('user'));
        setUser(loggedUser);

        const fetchOrders = async () => {
            try {
                const response = await axios.get('http://localhost:8081/api/order/all', { 
                    params: { email: loggedUser?.email },
                    withCredentials: true 
                });

                if (Array.isArray(response.data)) {
                    setOrders(response.data);
                } else {
                    console.error('Expected an array but got:', response.data);
                }
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        if (loggedUser) {
            fetchOrders();
        }
    }, []);

    if (!Array.isArray(orders)) {
        console.error('Orders is not an array:', orders);
        return null;
    }

    const userOrders = orders.filter(order => order.user && order.user.id === user?.id);

    return (
        <Box mb={4} style={{ color: '#000' }}>
            <Typography variant="h6" style={{ color: '#000' }}>Zamówienia</Typography>
            {userOrders.map((order) => (
                <Paper key={order.id} elevation={3} style={{ padding: '16px', marginTop: '16px', backgroundColor: '#fff' }}>
                    <Typography variant="body1"><strong>{order.state === 'DELIVERED' ? 'Zakończone' : 'W toku'}</strong></Typography>
                    <Typography variant="body2" style={{ color: '#888888' }}>{new Date(order.orderDate).toLocaleDateString()}</Typography>
                    <Typography variant="body2" style={{ color: '#888888' }}>nr {order.id}</Typography>
                    <Typography variant="h6" style={{ marginTop: '8px' }}>{order.totalPrice.toFixed(2)} zł</Typography>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
                        <Box display="flex" alignItems="center">
                            {order.orderProducts.map((product) => (
                                <img
                                    key={product.id}
                                    src={product.product.image || 'https://via.placeholder.com/50'}
                                    alt={`Product ${product.product.productName}`}
                                    style={{ width: '50px', height: '50px', marginRight: '8px' }}
                                />
                            ))}
                        </Box>
                    </Box>
                </Paper>
            ))}
        </Box>
    );
};

export default OrderSection;
