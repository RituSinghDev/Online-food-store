import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHideNav, setIsHideNav] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Determine if navbar should be hidden (scrolling down) or shown (scrolling up)
      if (currentScrollY > lastScrollY && currentScrollY > 300) {
        setIsHideNav(true);
      } else {
        setIsHideNav(false);
      }
      
      // Determine if navbar should have shadow and background change
      if (currentScrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  const cartItemCount = cartItems ? cartItems.reduce((acc, item) => acc + (item.quantity || 0), 0) : 0;

  // Use detection for backdrop filter support
  const supportsBackdropFilter = CSS.supports && 
    (CSS.supports('backdrop-filter', 'blur(8px)') || 
     CSS.supports('-webkit-backdrop-filter', 'blur(8px)'));

  return (
    <nav 
      className={`navbar navbar-expand-lg navbar-dark fixed-top transition-all ${isScrolled ? 'scrolled' : ''} ${isHideNav ? 'navbar-hidden' : ''}`} 
      style={{ 
        transition: 'all 0.3s ease',
        background: isScrolled 
          ? 'linear-gradient(90deg, rgba(40, 167, 69, 0.98) 0%, rgba(32, 201, 151, 0.98) 100%)' 
          : 'linear-gradient(90deg, rgba(40, 167, 69, 0.9) 0%, rgba(32, 201, 151, 0.9) 100%)',
        backdropFilter: supportsBackdropFilter ? 'blur(8px)' : undefined,
        WebkitBackdropFilter: supportsBackdropFilter ? 'blur(8px)' : undefined,
        borderBottom: isScrolled ? '1px solid rgba(255,255,255,0.2)' : 'none',
        padding: isScrolled ? '0.5rem 1rem' : '1rem',
        transform: isHideNav ? 'translateY(-100%)' : 'translateY(0)',
        boxShadow: isScrolled ? '0 4px 12px rgba(0, 0, 0, 0.1)' : 'none'
      }}
    >
      <div className="container">
        <Link 
          className="navbar-brand fw-bold d-flex align-items-center" 
          to="/"
        >
          <div className="me-2">
            <svg width="35" height="35" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#FFC107" stroke="#FFC107" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
    <div>
            <span className="d-flex flex-column">
              <span className="fs-3" style={{lineHeight: '1', textShadow: '1px 1px 2px rgba(0,0,0,0.2)'}}>
                Go<span className="text-warning">Food</span>
              </span>
              <span className="navbar-tagline text-white-50" style={{fontSize: '0.7rem', letterSpacing: '1px', marginTop: '-5px'}}>DELICIOUS DELIVERY</span>
            </span>
          </div>
          </Link>
        
          <button
          className="navbar-toggler border-0"
            type="button"
          onClick={handleNavCollapse}
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
          aria-expanded={!isNavCollapsed ? true : false}
            aria-label="Toggle navigation"
          style={{
            background: 'rgba(255,255,255,0.2)',
            padding: '0.5rem',
          }}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        
        <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item mx-1">
              <Link 
                className={`nav-link ${isActive('/')} nav-btn px-3`} 
                to="/"
              >
                <i className="bi bi-house-fill me-1"></i>Home
                </Link>
              </li>
              
              {user ? (
                <>
                <li className="nav-item mx-1">
                  <Link 
                    className={`nav-link ${isActive('/my-orders')} nav-btn px-3`} 
                    to="/my-orders"
                  >
                    <i className="bi bi-bag-check-fill me-1"></i>My Orders
                    </Link>
                  </li>
                <li className="nav-item mx-1">
                  <Link 
                    className={`nav-link position-relative ${isActive('/cart')} nav-btn px-3`} 
                    to="/cart"
                  >
                    <i className="bi bi-cart3"></i> Cart
                    {cartItemCount > 0 && (
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning text-dark" 
                            style={{boxShadow: '0 2px 5px rgba(0,0,0,0.2)', fontSize: '0.65rem'}}
                      >
                        {cartItemCount}
                        </span>
                      )}
                    </Link>
                  </li>
                <li className="nav-item dropdown mx-1">
                    <Link
                    className="nav-link dropdown-toggle d-flex align-items-center nav-btn px-3"
                      to="#"
                      id="navbarDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                    <div className="avatar-container me-2">
                      <div className="avatar" style={{
                        background: 'rgba(255,255,255,0.95)',
                        color: '#198754',
                        borderRadius: '50%',
                        width: '32px',
                        height: '32px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                        border: '2px solid rgba(255,255,255,0.8)',
                        overflow: 'hidden'
                      }}>
                        <i className="bi bi-person-fill fs-5"></i>
                      </div>
                    </div>
                    <span className="username-text">{user.name || 'User'}</span>
                  </Link>
                  <ul className="dropdown-menu dropdown-menu-end shadow-lg" 
                      aria-labelledby="navbarDropdown" 
                      style={{
                        borderTop: '3px solid #ffc107',
                        borderRadius: '0 0 8px 8px',
                        marginTop: '8px',
                        minWidth: '200px'
                      }}
                  >
                    <div className="p-3 border-bottom">
                      <div className="d-flex align-items-center">
                        <div className="me-3" style={{
                          background: 'rgba(40, 167, 69, 0.1)',
                          color: '#198754',
                          borderRadius: '50%',
                          width: '40px',
                          height: '40px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <i className="bi bi-person-fill fs-4"></i>
                        </div>
                        <div>
                          <div className="fw-bold">{user.name || 'User'}</div>
                          <div className="text-muted small">{user.email || 'No email provided'}</div>
                        </div>
                      </div>
                    </div>
                    <li>
                      <Link className="dropdown-item py-2" to="/profile">
                        <i className="bi bi-gear me-2 text-success"></i>Profile Settings
                    </Link>
                    </li>
                      <li>
                      <Link className="dropdown-item py-2" to="/my-orders">
                        <i className="bi bi-clock-history me-2 text-success"></i>Order History
                        </Link>
                      </li>
                      <li>
                      <Link className="dropdown-item py-2" to="/addresses">
                        <i className="bi bi-geo-alt me-2 text-success"></i>Saved Addresses
                        </Link>
                      </li>
                    <li><hr className="dropdown-divider" /></li>
                    <li>
                      <button className="dropdown-item py-2 d-flex align-items-center justify-content-between" onClick={handleLogout}>
                        <span><i className="bi bi-box-arrow-right me-2 text-danger"></i>Logout</span>
                        <i className="bi bi-arrow-right-short text-muted"></i>
                      </button>
                    </li>
                    </ul>
                  </li>
                </>
              ) : (
                <>
                <li className="nav-item mx-1">
                  <Link 
                    className={`nav-link ${isActive('/login')} nav-btn px-3`} 
                    to="/login"
                  >
                    <i className="bi bi-box-arrow-in-right me-1"></i>Login
                    </Link>
                  </li>
                <li className="nav-item ms-1">
                  <Link className="btn btn-light btn-sm px-4 py-2 text-success fw-bold" 
                        to="/register" 
                        style={{
                          borderRadius: '50px',
                          boxShadow: '0 3px 6px rgba(0,0,0,0.1)',
                          transition: 'all 0.3s ease'
                        }}
                  >
                    <i className="bi bi-person-plus me-1"></i>Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
  );
};

export default Navbar;
