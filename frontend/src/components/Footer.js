import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer style={{
      background: 'linear-gradient(to bottom, #f8f9fa, #e9ecef)',
      boxShadow: '0 -10px 15px -3px rgba(0, 0, 0, 0.05)'
    }} className="text-dark py-5 mt-auto">
      <div className="container">
        <div className="row g-4">
          {/* About GoFood */}
          <div className="col-lg-4 col-md-6">
            <div className="mb-4">
              <h3 className="text-success fw-bold mb-0" style={{textShadow: '0 2px 4px rgba(0,0,0,0.1)'}}>
                Go<span className="text-warning" style={{filter: 'brightness(0.9)'}}>Food</span>
              </h3>
              <p className="text-dark mb-0" style={{letterSpacing: '1px', fontWeight: '500'}}>DELICIOUS DELIVERY</p>
            </div>
            <p className="text-dark mb-3" style={{fontSize: '1rem', lineHeight: '1.6'}}>
              We connect you with the best restaurants in your area. Enjoy your favorite meals delivered fresh to your doorstep.
            </p>
            <div className="d-flex gap-2 mb-3">
              <button type="button" className="btn btn-sm btn-success rounded-circle shadow-sm contact-btn">
                <i className="bi bi-telephone-fill text-white"></i>
              </button>
              <a href="mailto:support@gofood.com" className="btn btn-sm btn-success rounded-circle shadow-sm contact-btn">
                <i className="bi bi-envelope-fill text-white"></i>
              </a>
              <button type="button" className="btn btn-sm btn-success rounded-circle shadow-sm contact-btn">
                <i className="bi bi-geo-alt-fill text-white"></i>
              </button>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="col-lg-2 col-md-6 col-sm-6">
            <h5 className="text-dark mb-3 fw-bold section-title">
              Explore
              <span className="title-underline"></span>
            </h5>
            <ul className="list-unstyled footer-links">
              <li className="mb-2">
                <Link to="/" className="text-decoration-none d-flex align-items-center footer-link">
                  <i className="bi bi-chevron-right text-success me-1"></i>
                  <span className="text-dark">Home</span>
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/offers" className="text-decoration-none d-flex align-items-center footer-link">
                  <i className="bi bi-chevron-right text-success me-1"></i>
                  <span className="text-dark">Offers</span>
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/about" className="text-decoration-none d-flex align-items-center footer-link">
                  <i className="bi bi-chevron-right text-success me-1"></i>
                  <span className="text-dark">About Us</span>
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/contact" className="text-decoration-none d-flex align-items-center footer-link">
                  <i className="bi bi-chevron-right text-success me-1"></i>
                  <span className="text-dark">Contact Us</span>
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Customer Support */}
          <div className="col-lg-2 col-md-6 col-sm-6">
            <h5 className="text-dark mb-3 fw-bold section-title">
              Support
              <span className="title-underline"></span>
            </h5>
            <ul className="list-unstyled footer-links">
              <li className="mb-2">
                <Link to="/faq" className="text-decoration-none d-flex align-items-center footer-link">
                  <i className="bi bi-chevron-right text-success me-1"></i>
                  <span className="text-dark">FAQs</span>
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/terms" className="text-decoration-none d-flex align-items-center footer-link">
                  <i className="bi bi-chevron-right text-success me-1"></i>
                  <span className="text-dark">Terms of Service</span>
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/privacy" className="text-decoration-none d-flex align-items-center footer-link">
                  <i className="bi bi-chevron-right text-success me-1"></i>
                  <span className="text-dark">Privacy Policy</span>
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/help" className="text-decoration-none d-flex align-items-center footer-link">
                  <i className="bi bi-chevron-right text-success me-1"></i>
                  <span className="text-dark">Help Center</span>
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Installation */}
          <div className="col-lg-4 col-md-6">
            <h5 className="text-dark mb-3 fw-bold section-title">
              Get GoFood App
              <span className="title-underline"></span>
            </h5>
            <p className="text-dark mb-3" style={{fontSize: '1rem', lineHeight: '1.6'}}>
              Download our mobile app for a better experience and exclusive mobile-only offers.
            </p>
            <div className="d-flex flex-column flex-sm-row gap-2 mb-3">
              <a href="https://play.google.com/store" target="_blank" rel="noopener noreferrer" className="btn app-download-btn text-white" style={{background: 'rgba(40, 167, 69, 0.9)', border: '1px solid rgba(40, 167, 69, 0.4)'}}>
                <i className="bi bi-google-play fs-4 me-2"></i>
                <div className="text-start">
                  <div style={{fontSize: '0.8rem', fontWeight: '500'}}>GET IT ON</div>
                  <div className="fw-bold">Google Play</div>
                </div>
              </a>
              <a href="https://www.apple.com/app-store/" target="_blank" rel="noopener noreferrer" className="btn app-download-btn" style={{background: '#212529', border: '1px solid #212529', color: 'white'}}>
                <i className="bi bi-apple fs-4 me-2"></i>
                <div className="text-start">
                  <div style={{fontSize: '0.8rem', fontWeight: '500'}}>Download on the</div>
                  <div className="fw-bold">App Store</div>
                </div>
              </a>
            </div>
            
            <h5 className="text-dark mb-3 fw-bold section-title">
              Connect With Us
              <span className="title-underline"></span>
            </h5>
            <div className="d-flex gap-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-link">
                <div className="social-icon facebook-bg">
                  <i className="bi bi-facebook fs-5 text-white"></i>
                </div>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link">
                <div className="social-icon instagram-bg">
                  <i className="bi bi-instagram fs-5 text-white"></i>
                </div>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link">
                <div className="social-icon twitter-bg">
                  <i className="bi bi-twitter-x fs-5 text-white"></i>
                </div>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-link">
                <div className="social-icon youtube-bg">
                  <i className="bi bi-youtube fs-5 text-white"></i>
                </div>
              </a>
            </div>
          </div>
        </div>

        <hr className="my-4 gradient-hr" />
        
        <div className="row align-items-center">
          <div className="col-md-6">
            <p className="mb-md-0 text-dark">
              &copy; {currentYear} GoFood, Inc. All rights reserved.
            </p>
          </div>
          <div className="col-md-6">
            <div className="d-flex flex-wrap justify-content-md-end gap-3">
              <img 
                src="https://www.svgrepo.com/show/501861/visa.svg" 
                alt="Visa" 
                height="30" 
                className="payment-icon" 
              />
              <img 
                src="https://www.svgrepo.com/show/501903/mastercard.svg" 
                alt="Mastercard" 
                height="30" 
                className="payment-icon" 
              />
              <img 
                src="https://www.svgrepo.com/show/501858/paypal.svg" 
                alt="PayPal" 
                height="30" 
                className="payment-icon" 
              />
              <img 
                src="https://www.svgrepo.com/show/501874/googlepay.svg" 
                alt="Google Pay" 
                height="30" 
                className="payment-icon" 
              />
              <img 
                src="https://www.svgrepo.com/show/59779/rupee.svg" 
                alt="Cash" 
                height="30" 
                className="payment-icon"
                style={{filter: 'brightness(0.1)'}}
              />
            </div>
          </div>
        </div>
      </div>
      
      <style jsx="true">{`
        .section-title {
          position: relative;
          display: inline-block;
          padding-bottom: 10px;
          font-size: 1.25rem;
          text-shadow: 0 1px 2px rgba(0,0,0,0.1);
        }
        
        .title-underline {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 50px;
          height: 3px;
          background: linear-gradient(90deg, #28a745, #ffc107);
          border-radius: 10px;
        }
        
        .gradient-hr {
          border: none;
          height: 1px;
          background: linear-gradient(to right, rgba(0,0,0,0.03), rgba(0,0,0,0.15), rgba(0,0,0,0.03));
        }
        
        .contact-btn {
          width: 38px;
          height: 38px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          font-size: 1rem;
        }
        
        .contact-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
          background-color: #218838;
        }
        
        .footer-link {
          transition: transform 0.2s ease;
          font-weight: 500;
          font-size: 1rem;
        }
        
        .footer-link:hover {
          transform: translateX(5px);
        }
        
        .footer-link:hover .text-dark {
          color: #198754 !important;
        }
        
        .app-download-btn {
          display: flex;
          align-items: center;
          padding: 0.75rem 1.25rem;
          border-radius: 8px;
          transition: all 0.3s ease;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        
        .app-download-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
          filter: brightness(1.1);
        }
        
        .social-icon {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 6px;
          transition: all 0.3s ease;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
        }
        
        .facebook-bg {
          background: linear-gradient(145deg, rgba(59, 89, 152, 0.8), rgba(59, 89, 152, 1));
        }
        
        .instagram-bg {
          background: linear-gradient(145deg, rgba(195, 42, 163, 0.8), rgba(253, 29, 29, 1));
        }
        
        .twitter-bg {
          background: linear-gradient(145deg, rgba(29, 161, 242, 0.8), rgba(29, 161, 242, 1));
        }
        
        .youtube-bg {
          background: linear-gradient(145deg, rgba(255, 0, 0, 0.8), rgba(255, 0, 0, 1));
        }
        
        .social-icon:hover {
          transform: translateY(-3px) scale(1.05);
          box-shadow: 0 6px 10px rgba(0, 0, 0, 0.25);
          filter: brightness(1.2);
        }
        
        .payment-icon {
          filter: drop-shadow(0px 2px 3px rgba(0, 0, 0, 0.1));
          transition: all 0.3s ease;
          opacity: 0.9;
        }
        
        .payment-icon:hover {
          transform: translateY(-2px);
          opacity: 1;
          filter: drop-shadow(0px 3px 5px rgba(0, 0, 0, 0.2));
        }
      `}</style>
      </footer>
  )
}
