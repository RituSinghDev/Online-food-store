import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    }, 1500);
  };
  
  // FAQ data
  const faqs = [
    {
      question: "How do I track my order?",
      answer: "You can track your order in real-time by going to 'My Orders' section in your account dashboard. There you'll find all your orders with their current status."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit and debit cards, UPI, net banking, and cash on delivery. All payment methods are secure and encrypted."
    },
    {
      question: "How long does delivery take?",
      answer: "Typical delivery times range from 30-45 minutes depending on your location and order volume. During peak hours, it might take slightly longer."
    },
    {
      question: "Is there a minimum order value?",
      answer: "Yes, the minimum order value is ₹100. Orders below this value will have an additional small order fee applied."
    },
    {
      question: "How can I cancel my order?",
      answer: "You can cancel your order within 5 minutes of placing it without any charges. After that, cancellation charges may apply if preparation has begun."
    }
  ];
  
  const [activeQuestion, setActiveQuestion] = useState(null);
  
  const toggleQuestion = (index) => {
    if (activeQuestion === index) {
      setActiveQuestion(null);
    } else {
      setActiveQuestion(index);
    }
  };
  
  return (
    <div className="min-vh-100 py-5" style={{background: 'linear-gradient(135deg, #f8f9fa, #ffffff)'}}>
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-5"
        >
          <h1 className="display-4 fw-bold text-dark mb-2">Contact Us</h1>
          <p className="lead text-dark mb-0" style={{fontSize: "1.2rem"}}>We're here to help and answer any questions you might have</p>
          <div className="mx-auto" style={{width: '100px', height: '5px', background: 'linear-gradient(90deg, #28a745, #ffc107)', marginTop: '20px', borderRadius: '2px'}}></div>
        </motion.div>
        
        <div className="row g-4">
          <div className="col-lg-4">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="card shadow-sm border-0 rounded-4 h-100"
            >
              <div className="card-body p-4">
                <h4 className="card-title mb-4 text-dark fw-bold" style={{fontSize: "1.4rem"}}>
                  <i className="bi bi-info-circle-fill text-success me-2"></i>
                  Contact Information
                </h4>
                
                <div className="contact-info">
                  <div className="d-flex mb-4">
                    <div className="contact-icon-wrapper me-3">
                      <i className="bi bi-geo-alt-fill text-success fs-4"></i>
                    </div>
                    <div>
                      <h6 className="mb-1 text-dark fw-bold">Our Location</h6>
                      <p className="mb-0 text-dark" style={{fontSize: "1rem"}}>
                        123 Food Street, Flavor District<br />
                        Mumbai, Maharashtra 400001
                      </p>
                    </div>
                  </div>
                  
                  <div className="d-flex mb-4">
                    <div className="contact-icon-wrapper me-3">
                      <i className="bi bi-telephone-fill text-success fs-4"></i>
                    </div>
                    <div>
                      <h6 className="mb-1 text-dark fw-bold">Call Us</h6>
                      <p className="mb-0">
                        <a href="tel:+911234567890" className="text-dark text-decoration-none fw-medium" style={{fontSize: "1rem"}}>
                          +91 1234 567 890
                        </a>
                      </p>
                      <p className="mb-0 text-dark small">
                        (Mon-Sat, 10AM-8PM)
                      </p>
                    </div>
                  </div>
                  
                  <div className="d-flex mb-4">
                    <div className="contact-icon-wrapper me-3">
                      <i className="bi bi-envelope-fill text-success fs-4"></i>
                    </div>
                    <div>
                      <h6 className="mb-1 text-dark fw-bold">Email Us</h6>
                      <p className="mb-0">
                        <a href="mailto:support@gofood.com" className="text-dark text-decoration-none fw-medium" style={{fontSize: "1rem"}}>
                          support@gofood.com
                        </a>
                      </p>
                      <p className="mb-0 text-dark small">
                        (We respond within 24 hours)
                      </p>
                    </div>
                  </div>
                </div>
                
                <hr className="my-4" style={{height: "2px", opacity: "0.1"}} />
                
                <h5 className="mb-3 text-dark fw-bold">Follow Us</h5>
                <div className="social-links">
                  <a href="https://facebook.com/gofood" target="_blank" rel="noopener noreferrer" className="social-link">
                    <i className="bi bi-facebook"></i>
                  </a>
                  <a href="https://instagram.com/gofood" target="_blank" rel="noopener noreferrer" className="social-link">
                    <i className="bi bi-instagram"></i>
                  </a>
                  <a href="https://twitter.com/gofood" target="_blank" rel="noopener noreferrer" className="social-link">
                    <i className="bi bi-twitter"></i>
                  </a>
                  <a href="https://youtube.com/gofood" target="_blank" rel="noopener noreferrer" className="social-link">
                    <i className="bi bi-youtube"></i>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
          
          <div className="col-lg-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="card shadow-sm border-0 rounded-4"
            >
              <div className="card-body p-4 p-lg-5">
                <h4 className="card-title mb-4 text-dark fw-bold" style={{fontSize: "1.4rem"}}>
                  <i className="bi bi-chat-dots-fill text-success me-2"></i>
                  Send Us a Message
                </h4>
                
                {submitted ? (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="alert alert-success" 
                    role="alert"
                  >
                    <div className="d-flex align-items-center">
                      <i className="bi bi-check-circle-fill me-2 fs-4"></i>
                      <div>
                        <h5 className="alert-heading mb-1">Thank You!</h5>
                        <p className="mb-0">Your message has been sent successfully. We'll get back to you soon!</p>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label htmlFor="name" className="form-label text-dark fw-medium" style={{fontSize: "1.05rem"}}>Full Name</label>
                        <div className="input-group input-group-lg">
                          <span className="input-group-text bg-light border-end-0">
                            <i className="bi bi-person text-success"></i>
                          </span>
                          <input
                            type="text"
                            className="form-control border-start-0"
                            id="name"
                            placeholder="Your Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="col-md-6">
                        <label htmlFor="email" className="form-label text-dark fw-medium" style={{fontSize: "1.05rem"}}>Email Address</label>
                        <div className="input-group input-group-lg">
                          <span className="input-group-text bg-light border-end-0">
                            <i className="bi bi-envelope text-success"></i>
                          </span>
                          <input
                            type="email"
                            className="form-control border-start-0"
                            id="email"
                            placeholder="your.email@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="col-12">
                        <label htmlFor="subject" className="form-label text-dark fw-medium" style={{fontSize: "1.05rem"}}>Subject</label>
                        <div className="input-group input-group-lg">
                          <span className="input-group-text bg-light border-end-0">
                            <i className="bi bi-chat-left-text text-success"></i>
                          </span>
                          <input
                            type="text"
                            className="form-control border-start-0"
                            id="subject"
                            placeholder="How can we help you?"
                            value={formData.subject}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="col-12">
                        <label htmlFor="message" className="form-label text-dark fw-medium" style={{fontSize: "1.05rem"}}>Your Message</label>
                        <div className="input-group input-group-lg">
                          <span className="input-group-text bg-light border-end-0">
                            <i className="bi bi-pencil text-success"></i>
                          </span>
                          <textarea
                            className="form-control border-start-0"
                            id="message"
                            rows="5"
                            placeholder="Tell us more about your query or feedback..."
                            value={formData.message}
                            onChange={handleChange}
                            required
                          ></textarea>
                        </div>
                      </div>
                      
                      <div className="col-12 mt-4">
                        <motion.button
                          type="submit"
                          className="btn btn-success px-4 py-3 fs-5 fw-medium"
                          disabled={loading}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          {loading ? (
                            <>
                              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                              Sending...
                            </>
                          ) : (
                            <>
                              <i className="bi bi-send me-2"></i>
                              Send Message
                            </>
                          )}
                        </motion.button>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-5"
        >
          <div className="text-center mb-4">
            <h2 className="fw-bold text-dark" style={{fontSize: "2rem"}}>Frequently Asked Questions</h2>
            <p className="text-dark" style={{fontSize: "1.1rem"}}>Find quick answers to common questions</p>
          </div>
          
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="faq-accordion">
                {faqs.map((faq, index) => (
                  <div key={index} className="faq-item card shadow-sm border-0 rounded-3 mb-3">
                    <div 
                      className="card-header bg-white border-0 py-3 px-4"
                      onClick={() => toggleQuestion(index)}
                      style={{ cursor: 'pointer' }}
                    >
                      <div className="d-flex justify-content-between align-items-center">
                        <h5 className="mb-0 text-dark fw-bold">{faq.question}</h5>
                        <i className={`bi bi-chevron-${activeQuestion === index ? 'up' : 'down'} text-success fs-5`}></i>
                      </div>
                    </div>
                    {activeQuestion === index && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="card-body px-4 pb-4 pt-0"
                      >
                        <hr className="mt-0 mb-3" />
                        <p className="text-dark mb-0" style={{fontSize: "1.05rem"}}>{faq.answer}</p>
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-5"
        >
          <div className="card shadow-sm border-0 rounded-4 overflow-hidden">
            <div className="row g-0">
              <div className="col-md-4">
                <div className="p-4 h-100 d-flex flex-column justify-content-center" style={{background: 'rgba(40, 167, 69, 0.05)'}}>
                  <h4 className="text-dark fw-bold mb-3">Visit Our Store</h4>
                  <p className="text-dark mb-4" style={{fontSize: "1.05rem"}}>We'd love to see you in person! Visit our store for a delightful experience.</p>
                  <div>
                    <p className="mb-1 text-dark fw-medium" style={{fontSize: "1.05rem"}}><i className="bi bi-clock me-2 text-success"></i>Opening Hours:</p>
                    <p className="mb-0 ms-4 text-dark">Mon - Sat: 10AM - 10PM</p>
                    <p className="mb-0 ms-4 text-dark">Sun: 11AM - 9PM</p>
                  </div>
                </div>
              </div>
              <div className="col-md-8">
                <div className="map-container" style={{ height: '350px' }}>
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.1160984602!2d72.73717595202662!3d19.08219851141554!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1654875880095!5m2!1sen!2sin" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen="" 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="GoFood Location Map"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      
      <style jsx="true">{`
        .contact-icon-wrapper {
          width: 50px;
          height: 50px;
          background-color: rgba(40, 167, 69, 0.15);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        }
        
        .social-links {
          display: flex;
          gap: 15px;
        }
        
        .social-link {
          width: 45px;
          height: 45px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: rgba(40, 167, 69, 0.15);
          color: #218838;
          border-radius: 50%;
          font-size: 1.3rem;
          transition: all 0.3s ease;
          text-decoration: none;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        }
        
        .social-link:hover {
          background-color: #28a745;
          color: white;
          transform: translateY(-3px);
          box-shadow: 0 6px 10px rgba(40, 167, 69, 0.2);
        }
        
        .social-link:focus {
          outline: none;
          box-shadow: 0 0 0 3px rgba(40, 167, 69, 0.4);
        }
        
        .input-group-text {
          background-color: #f8f9fa;
          border-width: 2px;
          font-size: 1.1rem;
        }
        
        .form-control {
          border-width: 2px;
          font-size: 1.1rem;
          padding: 0.6rem 1rem;
        }
        
        .form-control:focus {
          border-color: #28a745;
          box-shadow: 0 0 0 0.25rem rgba(40, 167, 69, 0.25);
        }
        
        .faq-item {
          transition: all 0.3s ease;
          border: 2px solid transparent !important;
        }
        
        .faq-item:hover {
          transform: translateY(-2px);
          border-color: rgba(40, 167, 69, 0.1) !important;
        }
        
        .faq-item:focus-within {
          border-color: #28a745 !important;
          box-shadow: 0 0 0 0.2rem rgba(40, 167, 69, 0.25);
        }
        
        .card {
          box-shadow: 0 8px 24px rgba(0,0,0,0.08) !important;
        }
        
        @media (max-width: 768px) {
          .contact-info {
            margin-bottom: 2rem;
          }
          
          .map-container {
            height: 250px;
          }
        }
      `}</style>
    </div>
  );
};

export default Contact; 