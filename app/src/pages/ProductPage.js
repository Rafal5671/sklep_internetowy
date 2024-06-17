import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  Grid,
  Container,
  Paper,
  FormControl,
  MenuItem,
  Select,
  IconButton,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import axios from "axios";
import { useParams } from "react-router-dom";
import AddToCartModal from "../components/cart/AddToCartModal";
import { useCart } from "../components/cart/CartContext";

const ProductPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    if (productId) {
      const fetchProduct = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8081/api/products/${productId}`
          );
          setProduct(response.data);
        } catch (error) {
          console.error("Error fetching product:", error);
        }
      };

      fetchProduct();
    } else {
      console.error("Product ID is undefined");
    }
  }, [productId]);

  const handleChange = (event) => {
    setQuantity(event.target.value);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  if (!product) {
    return <Typography>Loading...</Typography>;
  }

  const formattedDescription = product.description.replace(/\\r\\n|\\n/g, "\n");
  const descriptionLines = formattedDescription.split("\n");
  const descriptionLines4 = formattedDescription.split("\n").slice(0, 4);

  return (
    <>
      <Box
        sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <Container
          maxWidth="lg"
          sx={{
            py: 4,
            marginTop: 4,
            marginBottom: 4,
            borderRadius: 7,
            backgroundColor: "white",
            boxShadow: 3,
          }}
        >
          <Grid container spacing={4} alignItems="flex-start">
            <Grid item xs={12} md={5}>
              <Card elevation={0}>
                <CardMedia
                  component="img"
                  image={product.image}
                  alt={product.productName}
                  sx={{ width: "100%", height: "auto", borderRadius: 2 }}
                />
              </Card>
            </Grid>
            <Grid item xs={12} md={7}>
              <Typography
                variant="h3"
                gutterBottom
                component="div"
                sx={{ mt: 2, mb: 2, fontWeight: "bold" }}
              >
                {product.productName}
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={8}>
                  <Paper elevation={3} sx={{ p: 3 }}>
                    <Typography
                      variant="body1"
                      gutterBottom
                      sx={{ lineHeight: 1.7 }}
                    >
                      {descriptionLines4.map((line, index) => (
                        <span key={index}>
                          {line}
                          <br />
                        </span>
                      ))}
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={4}>
                  <Paper
                    elevation={3}
                    sx={{
                      p: 3,
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    {product.cutPrice && (
                      <Typography
                        sx={{ color: "green", fontWeight: "bold", mb: 1 }}
                      >
                        Oszczędź {product.price - product.cutPrice} zł
                      </Typography>
                    )}
                    <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
                      {product.cutPrice ? product.cutPrice : product.price} zł
                    </Typography>
                    <Box
                      sx={{
                        mt: 2,
                        display: "flex",
                        alignItems: "center",
                        mb: 2,
                      }}
                    >
                      <FormControl size="small" sx={{ width: "70px", mr: 1 }}>
                        <Select
                          labelId="quantity-label"
                          id="quantity"
                          value={quantity}
                          onChange={handleChange}
                          sx={{ borderRadius: 2 }}
                        >
                          <MenuItem value={1}>1</MenuItem>
                          <MenuItem value={2}>2</MenuItem>
                          <MenuItem value={3}>3</MenuItem>
                          <MenuItem value={4}>4</MenuItem>
                        </Select>
                      </FormControl>
                      <IconButton
                        variant="contained"
                        size="large"
                        sx={{
                          flexGrow: 1,
                          borderRadius: 2,
                          boxShadow: 3,
                          backgroundColor: "green",
                          "&:hover": {
                            backgroundColor: "#388e3c",
                          },
                        }}
                        onClick={handleAddToCart}
                      >
                        <AddShoppingCartIcon sx={{ color: "white" }} />
                      </IconButton>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <CheckCircleOutlineIcon sx={{ color: "green", mr: 1 }} />
                      <Typography variant="body2" sx={{ color: "green" }}>
                        Dostępny
                      </Typography>
                    </Box>
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant="h5"
              gutterBottom
              component="div"
              sx={{ mt: 4, mb: 2, fontWeight: "bold" }}
            >
              Opis Produktu:
            </Typography>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
                {descriptionLines.map((line, index) => (
                  <span key={index}>
                    {line}
                    <br />
                  </span>
                ))}
              </Typography>
            </Paper>
          </Grid>
        </Container>
      </Box>
      <AddToCartModal open={openModal} handleClose={handleCloseModal} />
    </>
  );
};

export default ProductPage;
