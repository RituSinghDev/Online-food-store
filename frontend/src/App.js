import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';

// Context Providers
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Screens
import Home from './screens/Home';
import Login from './screens/Login';
import Register from './screens/Register';
import FoodItem from './screens/FoodItem';
import Cart from './screens/Cart';
import Checkout from './screens/Checkout';
import MyOrders from './screens/MyOrders';
import OrderDetails from './screens/OrderDetails';
import Profile from './screens/Profile';
import Contact from './screens/Contact';

// ScrollToTop component to scroll to the top when navigating
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <ScrollToTop />
          <div className="App d-flex flex-column min-vh-100">
            <Navbar />
            <main className="flex-grow-1 main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/food/:id" element={<FoodItem />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/my-orders" element={<MyOrders />} />
                <Route path="/order/:id" element={<OrderDetails />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/addresses" element={<Profile />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
