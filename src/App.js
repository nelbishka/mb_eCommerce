import React, { useState, useEffect } from 'react'
import {commerce} from './library/commerce.js'
import {Products, Navbar, Cart, Checkout} from './components/index.js'
import { Routes, Route } from 'react-router-dom'

 
const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(null)
  const [order, setOrder] = useState({})
  const [errorMessage, setErrorMessage] = useState('')
  
  const fetchProducts = async () => {
    const {data} = await commerce.products.list();

    setProducts(data);
  }

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  }

  const handleAddToCart = async (productId, quantity) => {
    setCart(await commerce.cart.add(productId, quantity));
  }

  const handleUpdateCartQty = async (productId, quantity) => {
    const response = await commerce.cart.update(productId, { quantity });

    setCart(response);
  };

  const handleRemoveFromCart = async (productId) => {
    const response = await commerce.cart.remove(productId);

    setCart(response);
  };

  const handleEmptyCart = async () => {
    const response = await commerce.cart.empty();
    
    setCart(response);
  };

  const refreshCart = async () => {
    try {
      console.log("Refreshing cart...");
      const newCart = await commerce.cart.refresh();
      console.log("New Cart:", newCart);
      setCart(newCart);
    } catch (error) {
      console.error("Error refreshing cart:", error);
    }
  }
  
  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const response = await fetch('http://localhost:5000/capture-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ checkoutToken: checkoutTokenId, newOrder }),
      });
  
      if (!response.ok) {
        throw new Error(`Unsuccessful response (${response.status}): ${response.statusText}`);
      }
  
      const result = await response.json();
      setOrder(newOrder)
      console.log('Capture checkout response:', result); // Log successful response
      return result;
    } catch (error) {
      console.error('Error capturing checkout:', error); // Log any errors
      throw error;
    }
  };
  
  useEffect(()=>{
    fetchProducts();
    fetchCart();
  },[]);

  return (
    
      <div>
        <Navbar totalItems={cart?.total_items || 0} />
        <Routes>
          <Route exact path='/' element={<Products products = {products} onAddToCart = {handleAddToCart}/>} />
          <Route exact path='/cart' element={<Cart 
            cart={cart} 
              handleUpdateCartQty={handleUpdateCartQty}
              handleRemoveFromCart={handleRemoveFromCart}
              handleEmptyCart={handleEmptyCart}
            />} 
          />
          <Route exact path='/checkout' 
          element={
          <Checkout  
            cart={cart}
            order={order}
            onCaptureCheckout={handleCaptureCheckout}
            error={errorMessage}
             />} />
        </Routes>
      </div>
  )
}

export default App