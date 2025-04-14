import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';

const MyOrders = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState('date-desc');
  const [filterStatus, setFilterStatus] = useState('all');
  
  useEffect(() => {
    // Redirect if not logged in
    if (!user) {
      navigate('/login');
      return;
    }
    
    const fetchOrders = async () => {
      try {
        const response = await fetch('/api/orders/myorders', {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        });
        
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch orders');
        }
        
        setOrders(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    
    fetchOrders();
  }, [user, navigate]);
  
  const handleCancelOrder = async (orderId) => {
    if (window.confirm('Are you sure you want to cancel this order?')) {
      try {
        const response = await fetch(`/api/orders/${orderId}/cancel`, {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        });
        
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.message || 'Failed to cancel order');
        }
        
        // Update the orders state
        setOrders(orders.map(order => 
          order._id === orderId ? { ...order, status: 'Cancelled' } : order
        ));
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

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Pending':
        return 'bi-hourglass-split';
      case 'Processing':
        return 'bi-truck';
      case 'Delivered':
        return 'bi-check-circle-fill';
      case 'Cancelled':
        return 'bi-x-circle-fill';
      default:
        return 'bi-question-circle';
    }
  };
  
  const getSortedAndFilteredOrders = () => {
    let filteredOrders = [...orders];
    
    // Apply status filter
    if (filterStatus !== 'all') {
      filteredOrders = filteredOrders.filter(order => order.status === filterStatus);
    }
    
    // Apply sorting
    switch (sortBy) {
      case 'date-desc':
        return filteredOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      case 'date-asc':
        return filteredOrders.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      case 'amount-desc':
        return filteredOrders.sort((a, b) => b.totalAmount - a.totalAmount);
      case 'amount-asc':
        return filteredOrders.sort((a, b) => a.totalAmount - b.totalAmount);
      default:
        return filteredOrders;
    }
  };

  const sortedAndFilteredOrders = getSortedAndFilteredOrders();
  
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
  
  if (loading) {
    return (
      <div className="container min-vh-100 d-flex justify-content-center align-items-center">
        <div className="text-center">
          <div className="spinner-grow text-success" style={{width: '3rem', height: '3rem'}} role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-dark">Loading your orders...</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger shadow-sm" role="alert">
          <i className="bi bi-exclamation-triangle-fill me-2"></i>
          {error}
        </div>
        <div className="text-center mt-4">
          <button 
            className="btn btn-success" 
            onClick={() => window.location.reload()}
          >
            <i className="bi bi-arrow-clockwise me-2"></i> Try Again
          </button>
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
          <h2 className="display-6 fw-bold text-dark mb-1">My Orders</h2>
          <p className="text-dark mb-0">Track and manage all your food orders in one place</p>
          <div style={{width: '50px', height: '4px', background: 'linear-gradient(90deg, #28a745, #ffc107)', marginTop: '15px', borderRadius: '2px'}}></div>
        </motion.div>
        
        {orders.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="card shadow-sm border-0 rounded-4 p-5 text-center"
          >
            <div className="my-4">
              <i className="bi bi-bag text-muted" style={{fontSize: '5rem'}}></i>
              <h3 className="mt-4 text-dark">No Orders Found</h3>
              <p className="text-dark mt-3">You haven't placed any orders yet. Explore our menu and place your first order!</p>
              <Link to="/" className="btn btn-success mt-3 px-4 py-2 shadow-sm">
                <i className="bi bi-cart-plus me-2"></i>
                Start Shopping
              </Link>
            </div>
          </motion.div>
        ) : (
          <>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="card shadow-sm border-0 rounded-4 p-3 mb-4"
            >
              <div className="row align-items-center">
                <div className="col-md-4 mb-3 mb-md-0">
                  <div className="d-flex align-items-center">
                    <i className="bi bi-funnel-fill text-success me-2"></i>
                    <label htmlFor="filterStatus" className="form-label mb-0 me-2 text-dark">Filter:</label>
                    <select 
                      id="filterStatus"
                      className="form-select shadow-sm"
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                    >
                      <option value="all">All Orders</option>
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-4 mb-3 mb-md-0">
                  <div className="d-flex align-items-center">
                    <i className="bi bi-sort-down text-success me-2"></i>
                    <label htmlFor="sortBy" className="form-label mb-0 me-2 text-dark">Sort by:</label>
                    <select 
                      id="sortBy"
                      className="form-select shadow-sm"
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                    >
                      <option value="date-desc">Newest First</option>
                      <option value="date-asc">Oldest First</option>
                      <option value="amount-desc">Amount (High to Low)</option>
                      <option value="amount-asc">Amount (Low to High)</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-4 text-md-end">
                  <p className="mb-0 text-dark">
                    <span className="badge bg-success rounded-pill">{sortedAndFilteredOrders.length}</span> orders found
                  </p>
                </div>
              </div>
            </motion.div>
        
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="row"
            >
              {sortedAndFilteredOrders.map(order => (
                <motion.div 
                  key={order._id} 
                  variants={itemVariants} 
                  className="col-md-12 mb-4"
                >
                  <div className="card shadow-sm border-0 rounded-4 hover-card">
                    <div className="card-header bg-white border-0 pt-3 pb-0">
                      <div className="row align-items-center">
                        <div className="col-md-7 mb-2 mb-md-0">
                          <div className="d-flex align-items-center">
                            <div className="order-icon-container me-3">
                              <i className="bi bi-bag-check text-success fs-3"></i>
                            </div>
                            <div>
                              <h5 className="mb-0 text-dark">Order #{order._id.substr(-6)}</h5>
                              <p className="mb-0 text-muted small">
                                <i className="bi bi-calendar-event me-1"></i>
                                {new Date(order.createdAt).toLocaleDateString('en-US', { 
                                  year: 'numeric', 
                                  month: 'short', 
                                  day: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-5 text-md-end">
                          <div className="order-status-badge" title={`Order Status: ${order.status}`}>
                            <span className={`badge ${getStatusBadgeClass(order.status)} px-3 py-2`}>
                              <i className={`bi ${getStatusIcon(order.status)} me-1`}></i>
                              {order.status}
                            </span>
                          </div>
                        </div>
                      </div>
                      <hr />
                    </div>
                    
                    <div className="card-body pb-2">
                      <div className="row">
                        <div className="col-lg-8 mb-4 mb-lg-0">
                          <h6 className="fw-bold text-dark mb-3">
                            <i className="bi bi-cart3 text-success me-2"></i>
                            Order Items
                          </h6>
                          <div className="table-responsive order-items-table">
                            <table className="table table-sm">
                              <thead className="table-light">
                                <tr>
                                  <th>Item</th>
                                  <th>Size</th>
                                  <th className="text-center">Qty</th>
                                  <th className="text-end">Price</th>
                                </tr>
                              </thead>
                              <tbody>
                                {order.items.map((item, index) => (
                                  <tr key={index}>
                                    <td>
                                      <div className="d-flex align-items-center">
                                        <span className="food-dot me-2" style={{
                                          background: ["#FFC107", "#28A745", "#17A2B8", "#DC3545"][index % 4]
                                        }}></span>
                                        <span className="fw-medium text-dark">{item.foodItem.name}</span>
                                      </div>
                                    </td>
                                    <td>{item.size}</td>
                                    <td className="text-center">{item.quantity}</td>
                                    <td className="text-end fw-medium">₹{item.price}/-</td>
                                  </tr>
                                ))}
                                <tr className="table-light">
                                  <td colSpan="3" className="text-end fw-bold">Total Amount:</td>
                                  <td className="text-end fw-bold text-success">₹{order.totalAmount}/-</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                        
                        <div className="col-lg-4">
                          <h6 className="fw-bold text-dark mb-3">
                            <i className="bi bi-info-circle text-success me-2"></i>
                            Delivery Details
                          </h6>
                          <div className="delivery-details p-3 bg-light rounded-3">
                            <p className="mb-2">
                              <i className="bi bi-geo-alt-fill text-success me-2"></i>
                              <span className="text-dark">{order.deliveryAddress}</span>
                            </p>
                            <p className="mb-2">
                              <i className="bi bi-credit-card text-success me-2"></i>
                              <span className="text-dark">{order.paymentMethod}</span>
                            </p>
                            {order.paymentId && (
                              <p className="mb-0">
                                <i className="bi bi-receipt text-success me-2"></i>
                                <span className="text-muted small">#{order.paymentId}</span>
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="card-footer bg-white border-0 pt-0">
                      <hr />
                      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
                        <div className="d-flex mb-3 mb-md-0">
                          <Link 
                            to={`/order/${order._id}`} 
                            className="btn btn-outline-success me-2 shadow-sm"
                          >
                            <i className="bi bi-eye me-1"></i>
                            View Details
                          </Link>
                          
                          {order.status === 'Delivered' && (
                            <button className="btn btn-outline-primary shadow-sm">
                              <i className="bi bi-star me-1"></i>
                              Rate Order
                            </button>
                          )}
                        </div>
                        
                        {order.status === 'Pending' && (
                          <button
                            className="btn btn-outline-danger shadow-sm"
                            onClick={() => handleCancelOrder(order._id)}
                          >
                            <i className="bi bi-x-circle me-1"></i>
                            Cancel Order
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </>
        )}
      </div>
      <style jsx="true">{`
        .hover-card {
          transition: all 0.3s ease;
          overflow: hidden;
        }
        
        .hover-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.08) !important;
        }
        
        .order-icon-container {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background-color: rgba(40, 167, 69, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .order-status-badge {
          display: inline-block;
          transition: all 0.3s ease;
        }
        
        .order-status-badge:hover {
          transform: translateY(-2px);
        }
        
        .food-dot {
          display: inline-block;
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }
        
        .delivery-details {
          background-color: rgba(248, 249, 250, 0.8);
          border-left: 3px solid #28a745;
        }
        
        .form-select {
          border-radius: 8px;
          border-color: #dee2e6;
        }
        
        .form-select:focus {
          border-color: #28a745;
          box-shadow: 0 0 0 0.25rem rgba(40, 167, 69, 0.25);
        }
        
        .badge {
          font-weight: 500;
          letter-spacing: 0.5px;
        }
      `}</style>
    </div>
  );
};

export default MyOrders; 