import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
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
        <div className="col-md-10">
          <div className="card border-0 shadow-lg overflow-hidden" style={{borderRadius: '16px'}}>
            <div className="row g-0">
              {/* Left side - Food image */}
              <div className="col-lg-6 d-none d-lg-block position-relative">
                <div
                  className="h-100 w-100"
                  style={{
                    background: 'linear-gradient(rgba(40, 167, 69, 0.85), rgba(32, 201, 151, 0.85)), url("https://images.unsplash.com/photo-1565299585323-38d6b0865b47?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  <div className="d-flex flex-column justify-content-center align-items-center h-100 p-4 text-white">
                    <div className="text-center mb-4">
                      <div className="d-inline-block mb-3">
                        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#FFC107" stroke="#FFC107" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <h2 className="fw-bold display-5">Go<span className="text-warning">Food</span></h2>
                      <p className="text-white-50 mb-0" style={{letterSpacing: '2px'}}>DELICIOUS DELIVERY</p>
                    </div>
                    <h3 className="fw-light mb-4 text-center">Delicious food delivered to your doorstep</h3>
                    <div className="d-flex justify-content-center w-100">
                      <div className="bg-white bg-opacity-25 p-3 rounded-4 mb-4 text-center" style={{backdropFilter: 'blur(10px)'}}>
                        <p className="mb-0">
                          "The food was delicious and arrived hot! Excellent service."
                        </p>
                        <div className="mt-2 text-warning">
                          <i className="bi bi-star-fill mx-1"></i>
                          <i className="bi bi-star-fill mx-1"></i>
                          <i className="bi bi-star-fill mx-1"></i>
                          <i className="bi bi-star-fill mx-1"></i>
                          <i className="bi bi-star-fill mx-1"></i>
                        </div>
                        <p className="small mt-1 mb-0 text-white-50">- Happy Customer</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Right side - Login form */}
              <div className="col-lg-6">
                <div className="card-body p-lg-5 p-4">
                  <div className="text-center d-lg-none mb-4">
                    <h2 className="fw-bold text-success">Go<span className="text-warning">Food</span></h2>
                    <p className="text-muted mb-4" style={{letterSpacing: '2px'}}>DELICIOUS DELIVERY</p>
                  </div>
                  
                  <h2 className="text-center mb-2">Welcome Back!</h2>
                  <p className="text-center text-muted mb-4">Please login to your account</p>
                  
                  {error && (
                    <div className="alert alert-danger d-flex align-items-center" role="alert">
                      <i className="bi bi-exclamation-circle-fill me-2"></i>
                      <div>{error}</div>
                    </div>
                  )}
                  
                  <form onSubmit={handleSubmit}>
                    <div className="mb-4">
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
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <div className="d-flex justify-content-between align-items-center">
                        <label htmlFor="password" className="form-label mb-0">
                          Password
                        </label>
                        <Link to="/forgot-password" className="text-decoration-none small text-success">
                          Forgot Password?
                        </Link>
                      </div>
                      <div className="input-group mt-2">
                        <span className="input-group-text bg-light border-end-0">
                          <i className="bi bi-lock-fill text-success"></i>
                        </span>
                        <input
                          type="password"
                          className="form-control border-start-0 ps-0"
                          id="password"
                          placeholder="Enter your password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    
                    <button
                      type="submit"
                      className="btn btn-success w-100 py-3 mt-3 fw-bold"
                      disabled={loading}
                      style={{
                        borderRadius: '8px',
                        boxShadow: '0 4px 12px rgba(40, 167, 69, 0.3)'
                      }}
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Logging in...
                        </>
                      ) : (
                        'Login'
                      )}
                    </button>
                    
                    <div className="d-flex align-items-center my-4">
                      <div className="flex-grow-1 border-bottom"></div>
                      <div className="px-3 text-muted small">OR</div>
                      <div className="flex-grow-1 border-bottom"></div>
                    </div>
                    
                    <div className="row g-2">
                      <div className="col-6">
                        <button type="button" className="btn btn-outline-secondary w-100" disabled>
                          <i className="bi bi-google me-2"></i>Google
                        </button>
                      </div>
                      <div className="col-6">
                        <button type="button" className="btn btn-outline-secondary w-100" disabled>
                          <i className="bi bi-facebook me-2"></i>Facebook
                        </button>
                      </div>
                    </div>
                  </form>
                  
                  <div className="mt-4 text-center">
                    <p className="mb-0">
                      Don't have an account?{' '}
                      <Link to="/register" className="text-success fw-bold text-decoration-none">
                        Register Now
                      </Link>
                    </p>
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

export default Login;
