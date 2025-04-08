import React from 'react';
import { Card, CardMedia, CardContent, CardActions, Typography, Button } from '@mui/material';
import { useCart } from '../../Cart/CartContext';

const Product = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <Card>
      <CardMedia image={product.image.url} title={product.name} style={{ height: 260 }} />
      <CardContent>
        <Typography variant="h5">{product.name}</Typography>
        <Typography variant="h6">{product.price.formatted_with_code}</Typography>
      </CardContent>
      <CardActions>
        <Button variant="contained" color="primary" onClick={() => addToCart(product)}>
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default Product;
