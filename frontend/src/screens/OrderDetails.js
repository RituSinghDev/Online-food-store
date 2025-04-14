import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const OrderDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    // Redirect if not logged in
    if (!user) {
      navigate('/login');
      return;
    }
    
    const fetchOrderDetails = async () => {
      try {
        const response = await fetch(`/api/orders/${id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        });
        
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch order details');
        }
        
        setOrder(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    
    fetchOrderDetails();
  }, [id, user, navigate]);
  
  const handleCancelOrder = async () => {
    if (window.confirm('Are you sure you want to cancel this order?')) {
      try {
        const response = await fetch(`/api/orders/${id}/cancel`, {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        });
        
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.message || 'Failed to cancel order');
        }
        
        // Update order status
        setOrder({ ...order, status: 'Cancelled' });
      } catch (error) {
        alert(error.message);
      }
    }
  };
  
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-warning';
      case 'Processing':
        return 'bg-info';
      case 'Delivered':
        return 'bg-success';
      case 'Cancelled':
        return 'bg-danger';
      default:
        return 'bg-secondary';
    }
  };
  
  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
        <button
          className="btn btn-primary"
          onClick={() => navigate('/my-orders')}
        >
          Back to My Orders
        </button>
      </div>
    );
  }
  
  if (!order) {
    return (
      <div className="container mt-5">
        <div className="alert alert-info" role="alert">
          Order not found.
        </div>
        <button
          className="btn btn-primary"
          onClick={() => navigate('/my-orders')}
        >
          Back to My Orders
        </button>
      </div>
    );
  }
  
  return (
    <div className="container mt-5 mb-5">
      <h2 className="mb-4">Order Details</h2>
      
      <div className="row">
        <div className="col-md-8">
          <div className="card shadow mb-4">
            <div className="card-header bg-light">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Order #{order._id}</h5>
                <span className={`badge ${getStatusBadgeClass(order.status)}`}>
                  {order.status}
                </span>
              </div>
            </div>
            
            <div className="card-body">
              <div className="mb-4">
                <h6 className="fw-bold">Order Date</h6>
                <p>{new Date(order.createdAt).toLocaleString()}</p>
              </div>
              
              <div className="mb-4">
                <h6 className="fw-bold">Delivery Address</h6>
                <p>{order.deliveryAddress}</p>
              </div>
              
              <div className="mb-4">
                <h6 className="fw-bold">Payment Method</h6>
                <p>{order.paymentMethod}</p>
              </div>
              
              {order.status === 'Pending' && (
                <div className="d-grid">
                  <button
                    className="btn btn-outline-danger"
                    onClick={handleCancelOrder}
                  >
                    Cancel Order
                  </button>
                </div>
              )}
            </div>
          </div>
          
          <div className="card shadow">
            <div className="card-header bg-light">
              <h5 className="mb-0">Order Items</h5>
            </div>
            
            <div className="card-body">
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th>Size</th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.items.map((item, index) => (
                      <tr key={index}>
                        <td>
                          <div className="d-flex align-items-center">
                            {item.foodItem.image && (
                              <img
                                src={item.foodItem.image}
                                alt={item.foodItem.name}
                                className="me-2"
                                style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                              />
                            )}
                            <span>{item.foodItem.name}</span>
                          </div>
                        </td>
                        <td>{item.size}</td>
                        <td>{item.quantity}</td>
                        <td>₹{item.price}/-</td>
                        <td>₹{item.price * item.quantity}/-</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-md-4">
          <div className="card shadow">
            <div className="card-header bg-light">
              <h5 className="mb-0">Order Summary</h5>
            </div>
            
            <div className="card-body">
              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal:</span>
                <span>₹{order.totalAmount - 40}/-</span>
              </div>
              
              <div className="d-flex justify-content-between mb-2">
                <span>Delivery:</span>
                <span>₹40/-</span>
              </div>
              
              <hr />
              
              <div className="d-flex justify-content-between mb-3">
                <strong>Total:</strong>
                <strong>₹{order.totalAmount}/-</strong>
              </div>
              
              <div className="d-grid mt-4">
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => navigate('/my-orders')}
                >
                  Back to My Orders
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails; 