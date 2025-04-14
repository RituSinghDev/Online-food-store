import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';

const Profile = () => {
  const { user, login } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  
  useEffect(() => {
    // Redirect if not logged in
    if (!user) {
      navigate('/login');
      return;
    }
    
    // Populate form with user data
    setFormData({
      name: user.name || '',
      email: user.email || '',
      address: user.address || '',
      phone: user.phone || '',
      password: '',
      confirmPassword: ''
    });
  }, [user, navigate]);
  
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
    setSuccess(false);
    
    // Check if passwords match
    if (formData.password && formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }
    
    try {
      // Prepare update data (only include password if provided)
      const updateData = {
        name: formData.name,
        email: formData.email,
        address: formData.address,
        phone: formData.phone
      };
      
      if (formData.password) {
        updateData.password = formData.password;
      }
      
      const response = await fetch('/api/users/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify(updateData)
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to update profile');
      }
      
      // Update user in context and localStorage
      login(data);
      setSuccess(true);
      
      // Reset password fields
      setFormData({
        ...formData,
        password: '',
        confirmPassword: ''
      });

      // Auto-hide success message after 3 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-vh-100 py-5" style={{background: 'linear-gradient(135deg, #f8f9fa, #ffffff)'}}>
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4 text-center text-md-start"
        >
          <h2 className="display-6 fw-bold text-dark mb-1">My Account</h2>
          <p className="text-dark mb-0">Manage your personal information and preferences</p>
          <div style={{width: '50px', height: '4px', background: 'linear-gradient(90deg, #28a745, #ffc107)', marginTop: '15px', borderRadius: '2px'}}></div>
        </motion.div>
        
        <div className="row g-4">
          <div className="col-lg-3">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="card shadow-sm border-0 rounded-4 profile-sidebar">
                <div className="card-body p-0">
                  <div className="text-center p-4 border-bottom profile-header" style={{background: 'rgba(40, 167, 69, 0.05)'}}>
                    <div className="avatar mb-3">
                      <div className="avatar-image">
                        {user?.name && (
                          <span className="avatar-text">
                            {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                          </span>
                        )}
                      </div>
                    </div>
                    <h5 className="mb-1 text-dark">{user?.name}</h5>
                    <p className="mb-0 text-muted small">{user?.email}</p>
                  </div>
                  
                  <div className="menu-links p-2">
                    <button 
                      className={`menu-link ${activeTab === 'profile' ? 'active' : ''}`}
                      onClick={() => setActiveTab('profile')}
                    >
                      <i className="bi bi-person-fill text-success me-2"></i>
                      Profile Information
                    </button>
                    <button 
                      className={`menu-link ${activeTab === 'security' ? 'active' : ''}`}
                      onClick={() => setActiveTab('security')}
                    >
                      <i className="bi bi-shield-lock-fill text-success me-2"></i>
                      Security
                    </button>
                    <button 
                      className={`menu-link ${activeTab === 'addresses' ? 'active' : ''}`}
                      onClick={() => setActiveTab('addresses')}
                    >
                      <i className="bi bi-geo-alt-fill text-success me-2"></i>
                      Addresses
                    </button>
                    <button className="menu-link" onClick={() => navigate('/my-orders')}>
                      <i className="bi bi-bag-fill text-success me-2"></i>
                      My Orders
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          
          <div className="col-lg-9">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="card shadow-sm border-0 rounded-4"
            >
              <div className="card-body p-4 p-lg-5">
                {error && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="alert alert-danger d-flex align-items-center" 
                    role="alert"
                  >
                    <i className="bi bi-exclamation-triangle-fill me-2"></i>
                    <div>{error}</div>
                  </motion.div>
                )}
                
                {success && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="alert alert-success d-flex align-items-center" 
                    role="alert"
                  >
                    <i className="bi bi-check-circle-fill me-2"></i>
                    <div>Profile updated successfully!</div>
                  </motion.div>
                )}
                
                {activeTab === 'profile' && (
                  <div>
                    <div className="section-header d-flex align-items-center mb-4">
                      <i className="bi bi-person-fill text-success fs-4 me-2"></i>
                      <h4 className="text-dark mb-0">Profile Information</h4>
                    </div>
                    
                    <form onSubmit={handleSubmit}>
                      <div className="row g-3">
                        <div className="col-md-6">
                          <label htmlFor="name" className="form-label fw-medium text-dark">
                            Full Name
                          </label>
                          <div className="input-group">
                            <span className="input-group-text bg-light border-end-0">
                              <i className="bi bi-person text-success"></i>
                            </span>
                            <input
                              type="text"
                              className="form-control border-start-0 ps-0"
                              id="name"
                              value={formData.name}
                              onChange={handleChange}
                              required
                              placeholder="Enter your full name"
                            />
                          </div>
                        </div>
                        
                        <div className="col-md-6">
                          <label htmlFor="email" className="form-label fw-medium text-dark">
                            Email Address
                          </label>
                          <div className="input-group">
                            <span className="input-group-text bg-light border-end-0">
                              <i className="bi bi-envelope text-success"></i>
                            </span>
                            <input
                              type="email"
                              className="form-control border-start-0 ps-0"
                              id="email"
                              value={formData.email}
                              onChange={handleChange}
                              required
                              placeholder="Enter your email"
                            />
                          </div>
                        </div>
                        
                        <div className="col-md-6">
                          <label htmlFor="phone" className="form-label fw-medium text-dark">
                            Phone Number
                          </label>
                          <div className="input-group">
                            <span className="input-group-text bg-light border-end-0">
                              <i className="bi bi-telephone text-success"></i>
                            </span>
                            <input
                              type="text"
                              className="form-control border-start-0 ps-0"
                              id="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              required
                              placeholder="Enter your phone number"
                            />
                          </div>
                        </div>
                        
                        <div className="col-12">
                          <label htmlFor="address" className="form-label fw-medium text-dark">
                            Address
                          </label>
                          <div className="input-group">
                            <span className="input-group-text bg-light border-end-0">
                              <i className="bi bi-geo-alt text-success"></i>
                            </span>
                            <textarea
                              className="form-control border-start-0 ps-0"
                              id="address"
                              rows="3"
                              value={formData.address}
                              onChange={handleChange}
                              required
                              placeholder="Enter your address"
                            ></textarea>
                          </div>
                        </div>
                        
                        <div className="col-12 mt-4">
                          <motion.button
                            type="submit"
                            className="btn btn-success py-2 px-4"
                            disabled={loading}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                          >
                            {loading ? (
                              <>
                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                Updating...
                              </>
                            ) : (
                              <>
                                <i className="bi bi-check-circle me-2"></i>
                                Save Changes
                              </>
                            )}
                          </motion.button>
                        </div>
                      </div>
                    </form>
                  </div>
                )}
                
                {activeTab === 'security' && (
                  <div>
                    <div className="section-header d-flex align-items-center mb-4">
                      <i className="bi bi-shield-lock-fill text-success fs-4 me-2"></i>
                      <h4 className="text-dark mb-0">Security Settings</h4>
                    </div>
                    
                    <form onSubmit={handleSubmit}>
                      <div className="row g-3">
                        <div className="col-md-6">
                          <label htmlFor="password" className="form-label fw-medium text-dark">
                            New Password
                          </label>
                          <div className="input-group">
                            <span className="input-group-text bg-light border-end-0">
                              <i className="bi bi-key text-success"></i>
                            </span>
                            <input
                              type="password"
                              className="form-control border-start-0 ps-0"
                              id="password"
                              value={formData.password}
                              onChange={handleChange}
                              placeholder="Enter new password"
                            />
                          </div>
                          <small className="text-muted">Leave blank to keep current password</small>
                        </div>
                        
                        <div className="col-md-6">
                          <label htmlFor="confirmPassword" className="form-label fw-medium text-dark">
                            Confirm New Password
                          </label>
                          <div className="input-group">
                            <span className="input-group-text bg-light border-end-0">
                              <i className="bi bi-key-fill text-success"></i>
                            </span>
                            <input
                              type="password"
                              className="form-control border-start-0 ps-0"
                              id="confirmPassword"
                              value={formData.confirmPassword}
                              onChange={handleChange}
                              placeholder="Confirm new password"
                            />
                          </div>
                        </div>
                        
                        <div className="col-12 mt-4">
                          <motion.button
                            type="submit"
                            className="btn btn-success py-2 px-4"
                            disabled={loading}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                          >
                            {loading ? (
                              <>
                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                Updating...
                              </>
                            ) : (
                              <>
                                <i className="bi bi-check-circle me-2"></i>
                                Update Password
                              </>
                            )}
                          </motion.button>
                        </div>
                      </div>
                    </form>
                  </div>
                )}
                
                {activeTab === 'addresses' && (
                  <div>
                    <div className="section-header d-flex align-items-center mb-4">
                      <i className="bi bi-geo-alt-fill text-success fs-4 me-2"></i>
                      <h4 className="text-dark mb-0">Saved Addresses</h4>
                    </div>
                    
                    <div className="address-card bg-light p-3 rounded-3 mb-3 border-start border-success border-3">
                      <div className="d-flex justify-content-between align-items-start">
                        <div>
                          <div className="fw-bold text-dark mb-1">Home</div>
                          <div className="text-dark">{formData.address || 'No address saved yet'}</div>
                          <div className="text-muted small mt-1">{formData.phone}</div>
                        </div>
                        <div>
                          <span className="badge bg-success">Default</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="d-flex mt-4">
                      <button className="btn btn-outline-success">
                        <i className="bi bi-plus-circle me-2"></i>
                        Add New Address
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <style jsx="true">{`
        .avatar {
          display: inline-block;
        }
        
        .avatar-image {
          width: 90px;
          height: 90px;
          border-radius: 50%;
          background: linear-gradient(145deg, #28a745, #218838);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 2rem;
          font-weight: 600;
          box-shadow: 0 5px 15px rgba(40, 167, 69, 0.3);
        }
        
        .profile-header {
          border-top-left-radius: 1rem;
          border-top-right-radius: 1rem;
        }
        
        .menu-links {
          display: flex;
          flex-direction: column;
          padding: 0.5rem;
        }
        
        .menu-link {
          display: flex;
          align-items: center;
          padding: 0.75rem 1rem;
          border-radius: 0.5rem;
          background: transparent;
          border: none;
          margin-bottom: 0.25rem;
          text-align: left;
          font-weight: 500;
          color: #212529;
          transition: all 0.2s ease;
        }
        
        .menu-link:hover {
          background: rgba(40, 167, 69, 0.08);
          transform: translateX(3px);
        }
        
        .menu-link.active {
          background: rgba(40, 167, 69, 0.1);
          color: #28a745;
          font-weight: 600;
        }
        
        .input-group-text {
          border-radius: 8px 0 0 8px;
        }
        
        .form-control {
          border-radius: 0 8px 8px 0;
        }
        
        .address-card {
          transition: all 0.3s ease;
        }
        
        .address-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
        }
        
        @media (max-width: 992px) {
          .profile-sidebar {
            margin-bottom: 1.5rem;
          }
          
          .menu-links {
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: center;
          }
          
          .menu-link {
            margin-right: 0.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Profile; 