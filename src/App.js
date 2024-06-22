import React, { useState, useEffect } from 'react'
import {commerce} from './library/commerce'
import {Products, Navbar, Cart} from './components'
import { Routes, Route } from 'react-router-dom'

 
const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(null)
  
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

  
  useEffect(()=>{
    fetchProducts();
    fetchCart();
  },[]);

  

  return (
    
      <div>
        <Navbar totalItems={cart?.total_items || 0} />
        <Routes>
          <Route path='/' element={<Products products = {products} onAddToCart = {handleAddToCart}/>} />
          <Route path='/cart' element={<Cart 
            cart={cart} 
              handleUpdateCartQty={handleUpdateCartQty}
              handleRemoveFromCart={handleRemoveFromCart}
              handleEmptyCart={handleEmptyCart}
            />} 
          />
        </Routes>
      </div>
    
    
  )
}

export default App