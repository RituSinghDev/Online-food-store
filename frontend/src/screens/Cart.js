import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';

const Cart = () => {
  const { cartItems, cartTotal, removeFromCart, updateQuantity, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Redirect to login if not authenticated
  const handleCheckout = () => {
    if (!user) {
      navigate('/login');
    } else {
      navigate('/checkout');
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        staggerChildren: 0.1
      } 
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-vh-100 py-5" style={{background: 'linear-gradient(135deg, #f8f9fa, #ffffff)'}}>
        <div className="container">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4 text-center"
          >
            <h2 className="display-6 fw-bold text-dark mb-1">Your Cart</h2>
            <div className="mx-auto" style={{width: '50px', height: '4px', background: 'linear-gradient(90deg, #28a745, #ffc107)', marginTop: '15px', borderRadius: '2px'}}></div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="card shadow-sm border-0 rounded-4 p-5 text-center"
          >
            <div className="my-4">
              <i className="bi bi-cart-x text-muted" style={{fontSize: '5rem'}}></i>
              <h3 className="mt-4 text-dark">Your Cart is Empty</h3>
              <p className="text-dark mt-3">Looks like you haven't added any items to your cart yet.</p>
              <Link to="/" className="btn btn-success mt-3 px-4 py-2 shadow-sm hover-scale">
                <i className="bi bi-arrow-left me-2"></i>
                Continue Shopping
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-vh-100 py-5" style={{background: 'linear-gradient(135deg, #f8f9fa, #ffffff)'}}>
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4 text-center text-md-start"
        >
          <h2 className="display-6 fw-bold text-dark mb-1">Your Cart</h2>
          <p className="text-dark mb-0">Review and modify your selected items before checkout</p>
          <div style={{width: '50px', height: '4px', background: 'linear-gradient(90deg, #28a745, #ffc107)', marginTop: '15px', borderRadius: '2px'}}></div>
        </motion.div>
        
        <div className="row g-4">
          <div className="col-lg-8">
            <motion.div 
              className="card shadow-sm border-0 rounded-4 overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="card-header bg-white border-0 py-3">
                <div className="d-flex align-items-center">
                  <i className="bi bi-cart3 text-success fs-4 me-2"></i>
                  <h5 className="mb-0 text-dark">Cart Items ({cartItems.reduce((acc, item) => acc + item.quantity, 0)})</h5>
                </div>
              </div>
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-hover mb-0">
                    <thead className="table-light">
                      <tr>
                        <th className="ps-4">Item</th>
                        <th>Size</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                        <th className="text-center">Action</th>
                      </tr>
                    </thead>
                    <motion.tbody
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      {cartItems.map((item, index) => (
                        <motion.tr 
                          key={`${item._id}-${item.size}`}
                          variants={itemVariants}
                          className="align-middle"
                        >
                          <td>
                            <div className="d-flex align-items-center ps-3">
                              <div className="food-image-container me-3">
                                <img 
                                  src={item.image} 
                                  alt={item.name} 
                                  className="rounded-3 food-image" 
                                  style={{ height: '60px', width: '60px', objectFit: 'cover' }}
                                  onError={(e) => {
                                    e.target.src = 'https://via.placeholder.com/60x60?text=Food';
                                  }}
                                />
                              </div>
                              <div>
                                <h6 className="mb-0 text-dark fw-semibold">{item.name}</h6>
                                <p className="mb-0 text-muted small">{item.description ? item.description.substring(0, 30) + '...' : ''}</p>
                              </div>
                            </div>
                          </td>
                          <td>
                            <span className="badge rounded-pill" style={{
                              backgroundColor: 'rgba(40, 167, 69, 0.1)', 
                              color: '#28a745',
                              padding: '6px 12px',
                              fontWeight: '500'
                            }}>
                              {item.size}
                            </span>
                          </td>
                          <td className="fw-medium">₹{item.price}/-</td>
                          <td>
                            <div className="quantity-selector d-flex align-items-center">
                              <button 
                                className="btn btn-sm btn-outline-secondary quantity-btn"
                                onClick={() => updateQuantity(item._id, item.size, Math.max(1, item.quantity - 1))}
                                disabled={item.quantity <= 1}
                              >
                                <i className="bi bi-dash"></i>
                              </button>
                              <span className="quantity-display mx-2">{item.quantity}</span>
                              <button 
                                className="btn btn-sm btn-outline-secondary quantity-btn"
                                onClick={() => updateQuantity(item._id, item.size, Math.min(10, item.quantity + 1))}
                                disabled={item.quantity >= 10}
                              >
                                <i className="bi bi-plus"></i>
                              </button>
                            </div>
                          </td>
                          <td className="fw-semibold text-success">₹{item.price * item.quantity}/-</td>
                          <td className="text-center">
                            <motion.button 
                              className="btn btn-outline-danger btn-sm remove-btn"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => removeFromCart(item._id, item.size)}
                            >
                              <i className="bi bi-trash"></i>
                            </motion.button>
                          </td>
                        </motion.tr>
                      ))}
                    </motion.tbody>
                  </table>
                </div>
              </div>
              <div className="card-footer bg-white py-3 border-0">
                <div className="d-flex justify-content-between align-items-center">
                  <motion.button 
                    className="btn btn-outline-danger"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={clearCart}
                  >
                    <i className="bi bi-trash me-2"></i>
                    Clear Cart
                  </motion.button>
                  <Link to="/" className="btn btn-outline-success">
                    <i className="bi bi-plus-circle me-2"></i>
                    Add More Items
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
          
          <div className="col-lg-4">
            <motion.div 
              className="card shadow-sm border-0 rounded-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="card-header bg-white border-0 py-3">
                <div className="d-flex align-items-center">
                  <i className="bi bi-receipt text-success fs-4 me-2"></i>
                  <h5 className="mb-0 text-dark">Order Summary</h5>
                </div>
              </div>
              <div className="card-body">
                <div className="summary-item d-flex justify-content-between mb-3">
                  <span className="text-dark">Items Subtotal:</span>
                  <span className="fw-medium">₹{cartTotal}/-</span>
                </div>
                
                <div className="summary-item d-flex justify-content-between mb-3">
                  <div>
                    <span className="text-dark">Delivery Fee:</span>
                    <small className="text-muted d-block">Standard Delivery</small>
                  </div>
                  <span className="fw-medium">₹40/-</span>
                </div>
                
                <div className="promo-code mb-3 mt-4">
                  <div className="input-group">
                    <input type="text" className="form-control" placeholder="Promo Code" />
                    <button className="btn btn-outline-success" type="button">Apply</button>
                  </div>
                </div>
                
                <hr className="my-4" />
                
                <div className="summary-total d-flex justify-content-between align-items-center mb-4">
                  <span className="fw-bold text-dark">Total Amount:</span>
                  <span className="fw-bold fs-5 text-success">₹{cartTotal + 40}/-</span>
                </div>
                
                <motion.button 
                  className="btn btn-success w-100 py-3 fw-medium checkout-btn"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleCheckout}
                >
                  <i className="bi bi-credit-card me-2"></i>
                  Proceed to Checkout
                </motion.button>
                
                <div className="mt-4">
                  <div className="secure-checkout text-center">
                    <div className="d-flex align-items-center justify-content-center mb-2">
                      <i className="bi bi-shield-lock-fill text-success me-2"></i>
                      <span className="text-muted small">Secure Checkout</span>
                    </div>
                    <div className="payment-methods">
                      <img src="https://www.svgrepo.com/show/501861/visa.svg" alt="Visa" height="25" className="me-2 payment-icon" />
                      <img src="https://www.svgrepo.com/show/501903/mastercard.svg" alt="Mastercard" height="25" className="me-2 payment-icon" />
                      <img src="https://www.svgrepo.com/show/501858/paypal.svg" alt="PayPal" height="25" className="me-2 payment-icon" />
                      <img src="https://www.svgrepo.com/show/59779/rupee.svg" alt="Cash" height="25" className="payment-icon" style={{filter: 'brightness(0.4)'}} />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <style jsx="true">{`
        .food-image-container {
          overflow: hidden;
          border-radius: 8px;
          transition: all 0.3s ease;
        }
        
        .food-image-container:hover {
          transform: scale(1.05);
        }
        
        .quantity-btn {
          width: 30px;
          height: 30px;
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 6px;
        }
        
        .quantity-selector {
          width: 120px;
        }
        
        .quantity-display {
          width: 30px;
          text-align: center;
          font-weight: 500;
        }
        
        .remove-btn {
          transition: all 0.3s ease;
          border-radius: 50%;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
        }
        
        .remove-btn:hover {
          background-color: #dc3545;
          color: white;
        }
        
        .summary-item small {
          font-size: 0.8rem;
        }
        
        .payment-icon {
          opacity: 0.7;
          transition: all 0.3s ease;
        }
        
        .payment-icon:hover {
          opacity: 1;
        }
        
        .checkout-btn {
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(40, 167, 69, 0.2);
        }
        
        .hover-scale {
          transition: transform 0.3s ease;
        }
        
        .hover-scale:hover {
          transform: scale(1.05);
        }
      `}</style>
    </div>
  );
};

export default Cart; 