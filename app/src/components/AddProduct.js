import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Typography, Container, MenuItem, Select, FormControl, InputLabel, FormHelperText, Alert } from '@mui/material';
import axios from 'axios';

function AddProduct() {
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [imagePath, setImagePath] = useState('');
  const [price, setPrice] = useState('');
  const [salePrice, setSalePrice] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState([]);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:8081/api/categories', { withCredentials: true });
        setCategories(response.data);
      } catch (error) {
        console.error('Błąd podczas pobierania kategorii:', error);
      }
    };

    fetchCategories();
  }, []);

  const validate = () => {
    let tempErrors = {};
    tempErrors.productName = productName ? "" : "Nazwa produktu jest wymagana";
    tempErrors.description = description ? "" : "Opis jest wymagany";
    tempErrors.imagePath = imagePath ? "" : "Ścieżka do zdjęcia jest wymagana";
    tempErrors.price = price ? "" : "Cena jest wymagana";
    tempErrors.salePrice = salePrice ? "" : "Cena na promocji jest wymagana";
    tempErrors.categoryId = categoryId ? "" : "Kategoria jest wymagana";

    setErrors(tempErrors);
    return Object.values(tempErrors).every(x => x === "");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) {
      return;
    }
    
    try {
      const product = {
        productName,
        description,
        image: imagePath,
        price: parseFloat(price),
        cutPrice: parseFloat(salePrice),
        category: { id: parseInt(categoryId) }
      };
      const response = await axios.post('http://localhost:8081/api/products/add', product, { withCredentials: true });
      setSuccess('Produkt dodany pomyślnie');
      setProductName('');
      setDescription('');
      setImagePath('');
      setPrice('');
      setSalePrice('');
      setCategoryId('');
    } catch (error) {
      console.error('Błąd podczas dodawania produktu:', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Dodaj produkt
      </Typography>
      {success && <Alert severity="success">{success}</Alert>}
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Nazwa produktu"
              fullWidth
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              error={Boolean(errors.productName)}
              helperText={errors.productName}
              InputLabelProps={{ style: { color: 'black' } }}
              sx={{
                '& .MuiInputBase-input::placeholder': {
                  color: 'black'
                }
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Opis"
              fullWidth
              multiline
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              error={Boolean(errors.description)}
              helperText={errors.description}
              InputLabelProps={{ style: { color: 'black' } }}
              sx={{
                '& .MuiInputBase-input::placeholder': {
                  color: 'black'
                }
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Ścieżka do zdjęcia"
              fullWidth
              value={imagePath}
              onChange={(e) => setImagePath(e.target.value)}
              error={Boolean(errors.imagePath)}
              helperText={errors.imagePath}
              InputLabelProps={{ style: { color: 'black' } }}
              sx={{
                '& .MuiInputBase-input::placeholder': {
                  color: 'black'
                }
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Cena"
              fullWidth
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              error={Boolean(errors.price)}
              helperText={errors.price}
              InputLabelProps={{ style: { color: 'black' } }}
              sx={{
                '& .MuiInputBase-input::placeholder': {
                  color: 'black'
                }
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Cena na promocji"
              fullWidth
              type="number"
              value={salePrice}
              onChange={(e) => setSalePrice(e.target.value)}
              error={Boolean(errors.salePrice)}
              helperText={errors.salePrice}
              InputLabelProps={{ style: { color: 'black' } }}
              sx={{
                '& .MuiInputBase-input::placeholder': {
                  color: 'black'
                }
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth error={Boolean(errors.categoryId)}>
              <Select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                displayEmpty
              >
                <MenuItem value="" disabled>
                  Wybierz kategorię
                </MenuItem>
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.categoryName}
                  </MenuItem>
                ))}
              </Select>
              {errors.categoryId && <FormHelperText>{errors.categoryId}</FormHelperText>}
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit" fullWidth>
              Dodaj produkt
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default AddProduct;
