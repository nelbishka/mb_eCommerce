import React, { useState, useEffect } from 'react'
import { Products, Navbar, Cart, Checkout } from './components/index.js'
import { Routes, Route } from 'react-router-dom'
import { CartProvider, useCart } from './components/Cart/CartContext.jsx';
import nike from './assets/nike-authentic.jpeg'


const App = () => {
  const [products, setProducts] = useState([]);
  // const [cart, setCart] = useState(null)
  // const [order, setOrder] = useState({})
  const [errorMessage, setErrorMessage] = useState('')
  const {cartItems} = useCart();
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const fetchProducts = async () => {
    const mockProducts = [
      {
        id: 'prod-1',
        name: 'Nike Origjinale',
        price: { raw: 129.99, formatted_with_code: 'ALL 129.99' },
        description: 'A comfy modern chair.',
        image: nike,
      },
      {
        id: 'prod-2',
        name: 'Vintage Lamp',
        price: { raw: 89.99, formatted_with_code: 'ALL 89.99' },
        description: 'A stylish vintage lamp.',
        image: { url: 'https://via.placeholder.com/300' },
      },
      {
        id: 'prod-2',
        name: 'Vintage Lamp',
        price: { raw: 89.99, formatted_with_code: 'ALL 89.99' },
        description: 'A stylish vintage lamp.',
        image: { url: 'https://via.placeholder.com/300' },
      },
      {
        id: 'prod-2',
        name: 'Vintage Lamp',
        price: { raw: 89.99, formatted_with_code: 'ALL 89.99' },
        description: 'A stylish vintage lamp.',
        image: { url: 'https://via.placeholder.com/300' },
      },
      {
        id: 'prod-2',
        name: 'Vintage Lamp',
        price: { raw: 89.99, formatted_with_code: 'ALL 89.99' },
        description: 'A stylish vintage lamp.',
        image: { url: 'https://via.placeholder.com/300' },
      },
      {
        id: 'prod-2',
        name: 'Vintage Lamp',
        price: { raw: 89.99, formatted_with_code: 'ALL 89.99' },
        description: 'A stylish vintage lamp.',
        image: { url: 'https://via.placeholder.com/300' },
      },
      {
        id: 'prod-2',
        name: 'Vintage Lamp',
        price: { raw: 89.99, formatted_with_code: 'ALL 89.99' },
        description: 'A stylish vintage lamp.',
        image: { url: 'https://via.placeholder.com/300' },
      },
      {
        id: 'prod-2',
        name: 'Vintage Lamp',
        price: { raw: 89.99, formatted_with_code: 'ALL 89.99' },
        description: 'A stylish vintage lamp.',
        image: { url: 'https://via.placeholder.com/300' },
      },
      {
        id: 'prod-2',
        name: 'Vintage Lamp',
        price: { raw: 89.99, formatted_with_code: 'ALL 89.99' },
        description: 'A stylish vintage lamp.',
        image: { url: 'https://via.placeholder.com/300' },
      },
      {
        id: 'prod-2',
        name: 'Vintage Lamp',
        price: { raw: 89.99, formatted_with_code: 'ALL 89.99' },
        description: 'A stylish vintage lamp.',
        image: { url: 'https://via.placeholder.com/300' },
      },
      {
        id: 'prod-2',
        name: 'Vintage Lamp',
        price: { raw: 89.99, formatted_with_code: 'ALL 89.99' },
        description: 'A stylish vintage lamp.',
        image: { url: 'https://via.placeholder.com/300' },
      },

    ];
    setProducts(mockProducts);
  }

  // const fetchCart = async () => {
  //   setCart(await commerce.cart.retrieve());
  // }

  // const handleAddToCart = async (productId, quantity) => {
  //   setCart(await commerce.cart.add(productId, quantity));
  // }

  // const handleUpdateCartQty = async (productId, quantity) => {
  //   const response = await commerce.cart.update(productId, { quantity });

  //   setCart(response);
  // };

  // const handleRemoveFromCart = async (productId) => {
  //   const response = await commerce.cart.remove(productId);

  //   setCart(response);
  // };

  // const handleEmptyCart = async () => {
  //   const response = await commerce.cart.empty();

  //   setCart(response);
  // };

  // const refreshCart = async () => {
  //   try {
  //     console.log("Refreshing cart...");
  //     const newCart = await commerce.cart.refresh();
  //     console.log("New Cart:", newCart);
  //     setCart(newCart);
  //   } catch (error) {
  //     console.error("Error refreshing cart:", error);
  //   }
  // }

  // const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
  //   try {
  //     const response = await fetch('https://ecommerceserver-875ceb902d32.herokuapp.com/capture-checkout', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ checkoutToken: checkoutTokenId, newOrder }),
  //     });

  //     if (!response.ok) {
  //       throw new Error(`Unsuccessful response (${response.status}): ${response.statusText}`);
  //     }

  //     const result = await response.json();
  //     setOrder(newOrder)
  //     console.log('Capture checkout response:', result);
  //     await refreshCart();
  //     return result;
  //   } catch (error) {
  //     setErrorMessage(error)
  //     console.error('Error capturing checkout:', error);
  //     throw error;
  //   }
  // };

  useEffect(() => {
    fetchProducts();
    // fetchCart();
  }, []);

  return (
    <CartProvider>
    <div>
    <Navbar totalItems={totalItems} />
    <Routes>
      <Route
        exact
        path="/"
        element={<Products products={products} />}
      />

      <Route path="/checkout" element={<Checkout />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
  </div>
    </CartProvider>


    // <div>
    //   <Navbar totalItems={cart?.total_items || 0} />
    //   <Routes>
    //     <Route exact path='/' element={<Products products={products} onAddToCart={handleAddToCart} />} />
    //     <Route path="/cart" element={
    //       <div style={{ padding: '2rem', textAlign: 'center' }}>
    //         <button className="snipcart-checkout snipcart-summary">
    //           <strong>Cart:</strong> <span className="snipcart-total-price"></span>
    //         </button>
    //       </div>
    //     } />

    //     {/* <Route exact path='/checkout'
    //       element={
    //         <Checkout
    //           cart={cart}
    //           order={order}
    //           onCaptureCheckout={handleCaptureCheckout}
    //           error={errorMessage}
    //         />} /> */}
    //   </Routes>
    // </div>
  )
}

export default App