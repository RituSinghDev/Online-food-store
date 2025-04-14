import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
    phone: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const { login, user } = useContext(AuthContext);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect if already logged in
    if (user) {
      navigate('/');
    }
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
    
    try {
      const response = await fetch('/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }
      
      login(data);
      navigate('/');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5 mt-4">
      <div className="row justify-content-center">
        <div className="col-md-10 col-lg-9">
          <div className="card border-0 shadow-lg overflow-hidden" style={{borderRadius: '16px', maxWidth: '1000px', margin: '0 auto'}}>
            <div className="row g-0">
              {/* Left side - Registration form */}
              <div className="col-lg-6 order-lg-1 order-2">
                <div className="card-body p-4">
                  <div className="text-center d-lg-none mb-4">
                    <h2 className="fw-bold text-success">Go<span className="text-warning">Food</span></h2>
                    <p className="text-muted mb-4" style={{letterSpacing: '2px'}}>DELICIOUS DELIVERY</p>
                  </div>
                  
                  <h2 className="text-center mb-2">Create an Account</h2>
                  <p className="text-center text-muted mb-4">Join GoFood and enjoy delicious meals</p>
                  
                  {error && (
                    <div className="alert alert-danger d-flex align-items-center" role="alert">
                      <i className="bi bi-exclamation-circle-fill me-2"></i>
                      <div>{error}</div>
                    </div>
                  )}
                  
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">
                        Full Name
                      </label>
                      <div className="input-group">
                        <span className="input-group-text bg-light border-end-0">
                          <i className="bi bi-person-fill text-success"></i>
                        </span>
                        <input
                          type="text"
                          className="form-control border-start-0 ps-0"
                          id="name"
                          placeholder="Enter your full name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">
                        Email Address
                      </label>
                      <div className="input-group">
                        <span className="input-group-text bg-light border-end-0">
                          <i className="bi bi-envelope-fill text-success"></i>
                        </span>
                        <input
                          type="email"
                          className="form-control border-start-0 ps-0"
                          id="email"
                          placeholder="name@example.com"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <label htmlFor="password" className="form-label">
                        Password
                      </label>
                      <div className="input-group">
                        <span className="input-group-text bg-light border-end-0">
                          <i className="bi bi-lock-fill text-success"></i>
                        </span>
                        <input
                          type="password"
                          className="form-control border-start-0 ps-0"
                          id="password"
                          placeholder="Create a password (min. 6 characters)"
                          value={formData.password}
                          onChange={handleChange}
                          required
                          minLength="6"
                        />
                      </div>
                      <div className="form-text small">Password must be at least 6 characters long</div>
                    </div>
                    
                    <div className="mb-3">
                      <label htmlFor="address" className="form-label">
                        Delivery Address
                      </label>
                      <div className="input-group">
                        <span className="input-group-text bg-light border-end-0">
                          <i className="bi bi-geo-alt-fill text-success"></i>
                        </span>
                        <textarea
                          className="form-control border-start-0 ps-0"
                          id="address"
                          placeholder="Enter your delivery address"
                          value={formData.address}
                          onChange={handleChange}
                          rows="2"
                          required
                        ></textarea>
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <label htmlFor="phone" className="form-label">
                        Phone Number
                      </label>
                      <div className="input-group">
                        <span className="input-group-text bg-light border-end-0">
                          <i className="bi bi-telephone-fill text-success"></i>
                        </span>
                        <input
                          type="text"
                          className="form-control border-start-0 ps-0"
                          id="phone"
                          placeholder="Enter your phone number"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    
                    <button
                      type="submit"
                      className="btn btn-success w-100 py-2 mt-2 fw-bold"
                      disabled={loading}
                      style={{
                        borderRadius: '8px',
                        boxShadow: '0 4px 12px rgba(40, 167, 69, 0.3)'
                      }}
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Creating Account...
                        </>
                      ) : (
                        'Create Account'
                      )}
                    </button>
                    
                    <div className="mt-3 text-center">
                      <p className="mb-0 small">
                        Already have an account?{' '}
                        <Link to="/login" className="text-success fw-bold text-decoration-none">
                          Login Here
                        </Link>
                      </p>
                    </div>
                  </form>
                </div>
              </div>
              
              {/* Right side - Food image */}
              <div className="col-lg-6 d-none d-lg-block position-relative order-lg-2 order-1">
                <div
                  className="h-100 w-100"
                  style={{
                    background: 'linear-gradient(rgba(40, 167, 69, 0.85), rgba(32, 201, 151, 0.85)), url("https://images.unsplash.com/photo-1559847844-5315695dadae?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  <div className="d-flex flex-column justify-content-center align-items-center h-100 p-4 text-white">
                    <div className="text-center mb-3">
                      <div className="d-inline-block mb-2">
                        <svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#FFC107" stroke="#FFC107" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <h2 className="fw-bold display-6">Go<span className="text-warning">Food</span></h2>
                      <p className="text-white-50 mb-0 small" style={{letterSpacing: '2px'}}>DELICIOUS DELIVERY</p>
                    </div>
                    <h4 className="fw-light mb-3 text-center">Join our community of food lovers</h4>
                    
                    <div className="bg-white bg-opacity-25 p-3 rounded-3 mb-3 text-center" style={{backdropFilter: 'blur(10px)'}}>
                      <h6 className="mb-2">Benefits of joining:</h6>
                      <ul className="list-unstyled text-start mb-0 small">
                        <li className="mb-1">
                          <i className="bi bi-check-circle-fill text-warning me-2"></i> 
                          Fast delivery to your doorstep
                        </li>
                        <li className="mb-1">
                          <i className="bi bi-check-circle-fill text-warning me-2"></i> 
                          Wide variety of restaurants
                        </li>
                        <li className="mb-1">
                          <i className="bi bi-check-circle-fill text-warning me-2"></i> 
                          Exclusive offers and discounts
                        </li>
                        <li className="mb-1">
                          <i className="bi bi-check-circle-fill text-warning me-2"></i> 
                          Save your favorite meals
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register; 