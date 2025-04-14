import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';

const Checkout = () => {
  const { cartItems, cartTotal, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    deliveryAddress: user ? user.address : '',
    paymentMethod: 'Cash on Delivery'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    // Redirect if not logged in or cart is empty
    if (!user) {
      navigate('/login');
    } else if (cartItems.length === 0) {
      navigate('/cart');
    }
  }, [user, cartItems, navigate]);
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      // Prepare items array for API
      const items = cartItems.map(item => ({
        foodItem: item._id,
        quantity: item.quantity,
        size: item.size,
        price: item.price
      }));
      
      const orderData = {
        items,
        totalAmount: cartTotal + 40, // Total + delivery
        deliveryAddress: formData.deliveryAddress,
        paymentMethod: formData.paymentMethod
      };
      
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify(orderData)
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to place order');
      }
      
      // Clear cart and redirect to order success
      clearCart();
      navigate(`/order/${data._id}`);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="container mt-5 mb-5">
      <div className="row">
        <div className="col-md-8">
          <div className="card shadow">
            <div className="card-body">
              <h3 className="card-title mb-4">Checkout</h3>
              
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <h5>Delivery Information</h5>
                  <div className="mb-3">
                    <label htmlFor="deliveryAddress" className="form-label">
                      Delivery Address
                    </label>
                    <textarea
                      className="form-control"
                      id="deliveryAddress"
                      rows="3"
                      value={formData.deliveryAddress}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>
                </div>
                
                <div className="mb-4">
                  <h5>Payment Method</h5>
                  <div className="form-check mb-2">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="paymentMethod"
                      id="paymentMethod"
                      value="Cash on Delivery"
                      checked={formData.paymentMethod === 'Cash on Delivery'}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="paymentMethod">
                      Cash on Delivery
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="paymentMethod"
                      id="paymentMethod"
                      value="Online Payment"
                      checked={formData.paymentMethod === 'Online Payment'}
                      onChange={handleChange}
                      disabled
                    />
                    <label className="form-check-label" htmlFor="paymentMethod">
                      Online Payment (Coming Soon)
                    </label>
                  </div>
                </div>
                
                <div className="d-grid gap-2">
                  <button
                    type="submit"
                    className="btn btn-success"
                    disabled={loading}
                  >
                    {loading ? 'Processing...' : 'Place Order'}
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => navigate('/cart')}
                  >
                    Back to Cart
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        
        <div className="col-md-4">
          <div className="card shadow">
            <div className="card-body">
              <h5 className="card-title">Order Summary</h5>
              <hr />
              
              {cartItems.map((item) => (
                <div key={`${item._id}-${item.size}`} className="d-flex justify-content-between mb-2">
                  <span>
                    {item.name} ({item.size}) x {item.quantity}
                  </span>
                  <span>₹{item.price * item.quantity}/-</span>
                </div>
              ))}
              
              <hr />
              
              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal:</span>
                <span>₹{cartTotal}/-</span>
              </div>
              
              <div className="d-flex justify-content-between mb-2">
                <span>Delivery:</span>
                <span>₹40/-</span>
              </div>
              
              <hr />
              <div className="d-flex justify-content-between mb-3">
                <strong>Total:</strong>
                <strong>₹{cartTotal + 40}/-</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout; 