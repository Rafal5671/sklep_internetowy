import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Grid, FormHelperText } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const DeliveryForm = () => {
  const [form, setForm] = useState({
    address: '',
    city: '',
    postalCode: ''
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateField = (name, value) => {
    let error = '';
    switch (name) {
      case 'address':
        error = value ? '' : 'Adres jest wymagany';
        break;
      case 'city':
        error = value ? '' : 'Miasto jest wymagane';
        break;
      case 'postalCode':
        error = /^[0-9]{2}-[0-9]{3}$/.test(value) ? '' : 'Podaj poprawny kod pocztowy';
        break;
      default:
        break;
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validateField(name, value),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form fields
    const newErrors = Object.keys(form).reduce((acc, key) => {
      const error = validateField(key, form[key]);
      if (error) acc[key] = error;
      return acc;
    }, {});

    setErrors(newErrors);

    // Check if there are no validation errors
    if (Object.values(newErrors).every(x => x === '')) {
      // Save address to session storage
      sessionStorage.setItem('deliveryAddress', JSON.stringify(form));
      // Redirect to order summary page
      navigate('/summary');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 3, marginTop: 3, marginBottom: 3, borderRadius: 7, backgroundColor: 'white' }}>
      <Typography variant="h4" gutterBottom>
        Adres Zamówienia
      </Typography>
      <form onSubmit={handleSubmit} noValidate>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Ulica i Numer domu / mieszkania"
              name="address"
              value={form.address}
              onChange={handleChange}
              error={!!errors.address}
              helperText={errors.address}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Miasto"
              name="city"
              value={form.city}
              onChange={handleChange}
              error={!!errors.city}
              helperText={errors.city}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Kod Pocztowy"
              name="postalCode"
              value={form.postalCode}
              onChange={handleChange}
              error={!!errors.postalCode}
              helperText={errors.postalCode}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Dalej
            </Button>
          </Grid>
        </Grid>
      </form>
      <FormHelperText sx={{ mt: 2 }}>* Pola wymagane</FormHelperText>
    </Container>
  );
};

export default DeliveryForm;
