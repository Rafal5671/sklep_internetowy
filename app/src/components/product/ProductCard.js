import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
} from "@mui/material";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import AddToCartModal from "../cart/AddToCartModal";
import { useCart } from "../cart/CartContext";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const handleImageClick = () => {
    navigate(`/product/${product.id}`);
  };

  const [hover, setHover] = useState(false);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const addToCartHandler = () => {
    addToCart(product);
    handleOpen();
  };

  return (
    <>
      <Card
        elevation={hover ? 8 : 1}
        sx={{
          position: "relative",
          overflow: "hidden",
          transition: "elevation 0.3s",
          backgroundColor:"ffffff"
        }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <CardActionArea onClick={handleImageClick}>
          <CardMedia
            component="img"
            sx={{
              height: 150,
              width: 1,
              objectFit: "contain",
            }}
            image={product.image}
            alt={product.productName}
          />
        </CardActionArea>
        <CardContent
          sx={{
            height: 150,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Typography
            gutterBottom
            variant="h7"
            component="div"
            sx={{
              textAlign: "left",
              hyphens: "auto",
              wordBreak: "break-word",
              overflowWrap: "break-word",
            }}
          >
            {product.productName}
          </Typography>
          {product.quantity > 0 ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                mt: 1,
              }}
            >
              {product.cutPrice && (
                <Typography
                  variant="body2"
                  component="div"
                  sx={{
                    textDecoration: "line-through",
                    color: "gray",
                    marginRight: "10px",
                  }}
                >
                  {product.cutPrice} zł
                </Typography>
              )}
              <Typography
                variant="h6"
                component="div"
                sx={{
                  fontWeight: "bold",
                }}
              >
                {product.price} zł
              </Typography>
            </Box>
          ) : (
            <Typography
              variant="h6"
              component="div"
              sx={{
                fontWeight: "bold",
                color: "red",
              }}
            >
              Produkt niedostępny
            </Typography>
          )}
        </CardContent>
        {hover && product.quantity > 0 && (
          <Box
            sx={{
              position: "absolute",
              bottom: 16,
              right: 16,
              zIndex: 1000,
            }}
          >
            <Button
              variant="outlined"
              sx={{
                borderColor: "green",
                borderWidth: 2,
                color: "green",
                "&:hover": {
                  backgroundColor: "green",
                  color: "white",
                  borderColor: "green",
                },
              }}
              size="small"
              onClick={addToCartHandler}
            >
              <AddShoppingCartIcon />
            </Button>
          </Box>
        )}
      </Card>
      <AddToCartModal open={open} handleClose={handleClose} />
    </>
  );
};

export default ProductCard;
