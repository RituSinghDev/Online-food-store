import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { motion } from 'framer-motion';

export default function FoodItem() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  
  const [foodItem, setFoodItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loadingCart, setLoadingCart] = useState(false);
  const [selectedImgIndex, setSelectedImgIndex] = useState(0);
  const [successMessage, setSuccessMessage] = useState(null);
  
  const sizeOptions = [
    { name: "Small", price: 0 },
    { name: "Medium", price: 50 },
    { name: "Large", price: 100 }
  ];
  
  // Mock additional images for demo purposes
  const additionalImages = [
    "https://source.unsplash.com/random/400x300/?food",
    "https://source.unsplash.com/random/400x300/?restaurant",
    "https://source.unsplash.com/random/400x300/?cuisine"
  ];

  // Product features
  const features = [
    { icon: "bi-fire", text: "Fresh ingredients" },
    { icon: "bi-heart", text: "Healthy options" },
    { icon: "bi-clock", text: "Quick delivery" },
    { icon: "bi-star", text: "Customer favorite" }
  ];
  
  useEffect(() => {
    const fetchFoodItem = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`/api/food-items/${id}`);
        
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        setFoodItem(data);
        
        // Set default size
        if (data.options && data.options.length > 0) {
          setSize(Object.keys(data.options[0])[0]);
        }
      } catch (err) {
        console.error("Error fetching food item:", err);
        setError("Failed to load food details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchFoodItem();
    
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, [id]);
  
  const handleQuantityChange = (amount) => {
    let newVal = quantity + amount;
    if (newVal < 1) newVal = 1;
    if (newVal > 10) newVal = 10;
    setQuantity(newVal);
  };
  
  const finalPrice = foodItem && foodItem.options && foodItem.options[0] && size
    ? quantity * (parseInt(foodItem.options[0][size]) || 0)
    : 0;
  
  const handleAddToCart = async () => {
    if (!foodItem || !size) return;
    
    setLoadingCart(true);
    
    try {
      await addToCart(
        foodItem._id,
        foodItem.name,
        finalPrice / quantity,
        size,
        quantity,
        foodItem.img
      );
      
      // Show success message
      setSuccessMessage("Item added to your cart!");
      setTimeout(() => setSuccessMessage(null), 3000);
      
    } catch (error) {
      console.error("Error adding to cart:", error);
    } finally {
      setLoadingCart(false);
    }
  };
  
  if (loading) {
    return (
      <div className="container mt-5 pt-5 text-center" style={{minHeight: "70vh"}}>
        <div className="spinner-grow text-success" role="status" style={{width: "3rem", height: "3rem"}}>
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3 text-dark fw-medium">Loading delicious details...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="container mt-5 pt-5 text-center" style={{minHeight: "70vh"}}>
        <div className="alert alert-danger p-4 shadow-sm rounded-4" role="alert">
          <i className="bi bi-exclamation-triangle-fill me-2 fs-4"></i>
          <span className="fs-5">{error}</span>
        </div>
        <button 
          className="btn btn-outline-dark mt-3 px-4 py-2" 
          onClick={() => navigate(-1)}
        >
          <i className="bi bi-arrow-left me-2"></i> Go Back
        </button>
      </div>
    );
  }
  
  if (!foodItem) {
    return (
      <div className="container mt-5 pt-5 text-center" style={{minHeight: "70vh"}}>
        <div className="alert alert-warning p-4 shadow-sm rounded-4" role="alert">
          <i className="bi bi-question-circle-fill me-2 fs-4"></i>
          <span className="fs-5">Food item not found</span>
        </div>
        <button 
          className="btn btn-outline-dark mt-3 px-4 py-2" 
          onClick={() => navigate(-1)}
        >
          <i className="bi bi-arrow-left me-2"></i> Go Back
        </button>
      </div>
    );
  }
  
  return (
    <div className="min-vh-100 py-5 bg-light">
      <div className="container py-4">
        {successMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="alert alert-success rounded-4 shadow-sm position-fixed top-0 start-50 translate-middle-x mt-4 p-3 d-flex align-items-center"
            style={{ zIndex: 1050, maxWidth: "90%", width: "400px" }}
          >
            <i className="bi bi-check-circle-fill text-success me-2 fs-4"></i>
            <span>{successMessage}</span>
          </motion.div>
        )}
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="row g-5"
        >
          {/* Left Column - Images */}
          <div className="col-lg-6">
            <div className="position-relative mb-4">
              <motion.img 
                src={foodItem.img || "https://via.placeholder.com/600x400?text=Food+Image"}
                className="img-fluid rounded-4 shadow-sm"
            alt={foodItem.name} 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                style={{ width: '100%', height: '400px', objectFit: 'cover' }}
              />
              
              <div className="position-absolute bottom-0 start-0 mb-3 ms-3">
                <span className="badge bg-success rounded-pill px-3 py-2 fs-6 fw-normal shadow-sm">
                  <i className="bi bi-star-fill me-1"></i>
                  {(Math.random() * 2 + 3).toFixed(1)} ({Math.floor(Math.random() * 500 + 100)})
                </span>
              </div>
        </div>
        
            <div className="d-flex gap-2 mb-4 overflow-auto pb-2" style={{maxWidth: '100%'}}>
              {[foodItem.img, ...additionalImages].map((img, index) => (
                <motion.div 
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`thumbnail-wrapper ${selectedImgIndex === index ? 'selected' : ''}`}
                  onClick={() => setSelectedImgIndex(index)}
                >
                  <img 
                    src={img} 
                    alt={`${foodItem.name} view ${index+1}`}
                    className="img-thumbnail"
                    style={{
                      width: '80px', 
                      height: '80px', 
                      objectFit: 'cover',
                      cursor: 'pointer',
                      border: selectedImgIndex === index ? '2px solid #28a745' : '2px solid transparent'
                    }}
                  />
                </motion.div>
              ))}
          </div>
          
            <div className="d-flex justify-content-center mt-4 flex-wrap gap-3">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="feature-badge d-flex align-items-center bg-white rounded-pill px-3 py-2 shadow-sm"
                >
                  <i className={`bi ${feature.icon} text-success me-2`}></i>
                  <span className="text-dark fw-medium" style={{fontSize: "0.9rem"}}>
                    {feature.text}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Right Column - Details */}
          <div className="col-lg-6">
            <div className="card border-0 shadow-sm rounded-4 h-100">
              <div className="card-body p-4 p-lg-5">
                <nav aria-label="breadcrumb" className="mb-3">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="/" className="text-decoration-none">Home</a></li>
                    <li className="breadcrumb-item"><a href="/menu" className="text-decoration-none">Menu</a></li>
                    <li className="breadcrumb-item active" aria-current="page">{foodItem.CategoryName}</li>
                  </ol>
                </nav>
                
                <motion.h1 
                  className="display-5 fw-bold mb-2 text-dark"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                >
                  {foodItem.name}
                </motion.h1>
                
                <motion.p
                  className="fs-5 text-dark"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  {foodItem.description || "A delicious dish prepared with the finest ingredients, bursting with flavor and served to perfection."}
                </motion.p>
                
                <motion.div 
                  className="mb-4 mt-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <h2 className="fs-3 fw-bold mb-3 text-dark">
                    <i className="bi bi-currency-rupee me-1"></i>
                    {finalPrice}
                  </h2>
                  
                  <div className="d-flex align-items-center mb-3">
                    <span className="badge bg-success me-2">Free Delivery</span>
                    <span className="text-success">
                      <i className="bi bi-clock me-1"></i> 30-45 min
                    </span>
                  </div>
                </motion.div>
                
                <motion.div
                  className="mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <h5 className="mb-3 fw-bold">Size Options</h5>
                  <div className="d-flex flex-wrap gap-2">
                    {sizeOptions.map((option) => (
                      <motion.div
                        key={option.name}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSize(option.name.toLowerCase())}
                        className={`size-option px-4 py-3 rounded-3 ${
                          size === option.name.toLowerCase() ? 'selected' : ''
                        }`}
                        style={{
                          cursor: 'pointer',
                          border: size === option.name.toLowerCase() 
                            ? '2px solid #28a745' 
                            : '2px solid #dee2e6',
                          background: size === option.name.toLowerCase() 
                            ? 'rgba(40, 167, 69, 0.1)' 
                            : 'white'
                        }}
                      >
                        <div className="text-center">
                          <div className="fw-bold text-dark">{option.name}</div>
                          <div className="small text-dark">
                            {option.price > 0 ? `+₹${option.price}` : 'Base Price'}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
                
                <motion.div
                  className="mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <h5 className="mb-3 fw-bold">Quantity</h5>
                  <div className="quantity-selector d-flex align-items-center">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="btn btn-outline-success rounded-circle"
                      onClick={() => handleQuantityChange(-1)}
                      disabled={quantity <= 1}
                      style={{ width: '40px', height: '40px' }}
                    >
                      <i className="bi bi-dash"></i>
                    </motion.button>
                    
                    <span className="mx-4 fw-bold fs-4">{quantity}</span>
                    
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="btn btn-outline-success rounded-circle"
                      onClick={() => handleQuantityChange(1)}
                      disabled={quantity >= 10}
                      style={{ width: '40px', height: '40px' }}
                    >
                      <i className="bi bi-plus"></i>
                    </motion.button>
              </div>
                </motion.div>
                
                <motion.div 
                  className="d-grid gap-2 d-md-flex mt-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="btn btn-success btn-lg flex-grow-1 py-3 fs-5"
                    onClick={handleAddToCart}
                    disabled={loadingCart}
                  >
                    {loadingCart ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Adding...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-cart-plus me-2"></i>
                        Add to Cart
                      </>
                    )}
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="btn btn-outline-dark btn-lg py-3"
                    onClick={() => navigate(-1)}
                  >
                    Continue Shopping
                  </motion.button>
                </motion.div>
                
                <hr className="my-4" />
                
                <div className="d-flex justify-content-between">
                  <div className="text-center">
                    <div className="text-secondary mb-1">
                      <i className="bi bi-shield-check fs-4 text-success"></i>
                    </div>
                    <div className="fw-medium small">Quality Assured</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-secondary mb-1">
                      <i className="bi bi-truck fs-4 text-success"></i>
                    </div>
                    <div className="fw-medium small">Free Delivery</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-secondary mb-1">
                      <i className="bi bi-arrow-return-left fs-4 text-success"></i>
                    </div>
                    <div className="fw-medium small">Easy Returns</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Recommended Section */}
        <motion.div
          className="mt-5 pt-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <h3 className="fw-bold mb-4">You Might Also Like</h3>
          
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
            {[1, 2, 3, 4].map((item) => (
              <div className="col" key={item}>
                <motion.div 
                  className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden"
                  whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
                >
                  <img 
                    src={`https://source.unsplash.com/random/300x200/?food,dish,${item}`} 
                    className="card-img-top"
                    alt="Food recommendation"
                    style={{ height: '180px', objectFit: 'cover' }}
                  />
                  <div className="card-body">
                    <h5 className="card-title fw-bold">Recommended Dish {item}</h5>
                    <p className="card-text text-success fw-medium">₹{Math.floor(Math.random() * 300) + 100}</p>
                    <button className="btn btn-sm btn-outline-success mt-2">
                      <i className="bi bi-eye me-1"></i> View Details
            </button>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
      
      <style jsx="true">{`
        .thumbnail-wrapper.selected::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 50%;
          transform: translateX(-50%);
          width: 8px;
          height: 8px;
          background-color: #28a745;
          border-radius: 50%;
        }
        
        .thumbnail-wrapper {
          position: relative;
        }
        
        .feature-badge {
          transition: all 0.3s ease;
        }
        
        .feature-badge:hover {
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        
        .size-option {
          transition: all 0.2s ease;
        }
        
        .size-option:hover:not(.selected) {
          border-color: #adb5bd !important;
        }
      `}</style>
    </div>
  );
} 