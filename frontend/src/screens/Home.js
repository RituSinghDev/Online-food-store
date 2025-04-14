import React, { useState, useEffect } from 'react';
import Card from '../components/Card'
import Carousal from '../components/Carousal'
import { motion } from 'framer-motion';

export default function Home() {
    const [foodItems, setFoodItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    useEffect(() => {
        const fetchFoodItems = async () => {
            try {
                const response = await fetch('/api/food-items');
                const data = await response.json();
                
                if (!response.ok) {
                    throw new Error('Failed to fetch food items');
                }
                
                setFoodItems(data);
                
                // Extract unique categories
                const uniqueCategories = ['All', ...new Set(data.map(item => item.category))];
                setCategories(uniqueCategories);
                
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };
        
        fetchFoodItems();
    }, []);

    const filteredItems = foodItems.filter(item => {
        // Filter by search term
        const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase()) || 
                              item.description.toLowerCase().includes(search.toLowerCase());
        
        // Filter by category
        const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
        
        return matchesSearch && matchesCategory;
    });

    // Features data
    const features = [
        {
            icon: 'bi-clock',
            title: 'Fast Delivery',
            description: 'We deliver your food hot and fresh within 30 minutes',
            color: 'success'
        },
        {
            icon: 'bi-credit-card',
            title: 'Easy Payment',
            description: 'Multiple secure payment options available',
            color: 'primary'
        },
        {
            icon: 'bi-tags',
            title: 'Best Offers',
            description: 'Exclusive deals and discounts on your favorite food',
            color: 'warning'
        },
        {
            icon: 'bi-shield-check',
            title: 'Quality Assured',
            description: 'We partner with only the best restaurants in town',
            color: 'danger'
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1, 
            transition: { 
                staggerChildren: 0.2
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

    return (
        <div className="home-container">
            {/* Hero Section */}
            <div>
                <Carousal />
            </div>
            
            {/* Features Section */}
            <div className="py-5" style={{backgroundColor: '#f8f9fa'}}>
                <div className="container">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="text-center mb-5"
                    >
                        <span className="badge bg-success px-3 py-2 mb-2">Why Choose Us</span>
                        <h2 className="display-5 fw-bold text-dark">Delivering Happiness to Your Doorstep</h2>
                        <p className="lead text-dark mt-2" style={{fontWeight: 500}}>Fast, Fresh and Reliable Food Delivery</p>
                        <div className="mx-auto" style={{width: '50px', height: '4px', background: 'linear-gradient(90deg, #28a745, #ffc107)', marginTop: '15px', borderRadius: '2px'}}></div>
                    </motion.div>
                    
                    <motion.div 
                        className="row g-4"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {features.map((feature, index) => (
                            <motion.div 
                                className="col-md-6 col-lg-3" 
                                key={index}
                                variants={itemVariants}
                            >
                                <div className="card border-0 h-100 shadow-sm feature-card">
                                    <div className="card-body text-center py-4">
                                        <div className={`rounded-circle bg-${feature.color} bg-opacity-10 p-3 d-inline-flex mb-3 icon-container`}>
                                            <i className={`bi ${feature.icon} text-${feature.color} fs-2`}></i>
                                        </div>
                                        <h4 className="card-title fw-bold text-dark">{feature.title}</h4>
                                        <p className="card-text text-dark">{feature.description}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
            
            {/* Food Menu Section */}
            <div id="food-menu" className="py-5" style={{background: 'linear-gradient(135deg, #ffffff, #f8f9fa)'}}>
                <div className="container">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="text-center mb-5"
                    >
                        <span className="badge bg-success px-3 py-2 mb-2">Our Menu</span>
                        <h2 className="display-5 fw-bold text-dark">Discover Delicious Food</h2>
                        <p className="lead text-dark" style={{fontWeight: 500}}>Find your favorite dishes from our extensive collection</p>
                        <div className="mx-auto" style={{width: '50px', height: '4px', background: 'linear-gradient(90deg, #28a745, #ffc107)', marginTop: '15px', borderRadius: '2px'}}></div>
                    </motion.div>
                    
                    <motion.div 
                        className="row mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                    <div className="col-md-8">
                            <div className="input-group shadow-sm">
                                <span className="input-group-text bg-white border-end-0">
                                    <i className="bi bi-search text-success"></i>
                                </span>
                        <input
                            type="text"
                                    className="form-control border-start-0"
                            placeholder="Search for food items..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                            </div>
                    </div>
                    <div className="col-md-4">
                        <select 
                                className="form-select shadow-sm"
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                            {categories.map(category => (
                                <option key={category} value={category}>{category}</option>
                            ))}
                        </select>
                    </div>
                    </motion.div>
                
                {loading ? (
                        <div className="text-center py-5">
                            <div className="spinner-grow text-success" role="status" style={{width: '3rem', height: '3rem'}}>
                            <span className="visually-hidden">Loading...</span>
                            </div>
                            <p className="mt-3 text-dark">Loading delicious options...</p>
                    </div>
                ) : error ? (
                        <div className="alert alert-danger shadow-sm" role="alert">
                            <i className="bi bi-exclamation-triangle-fill me-2"></i> {error}
                    </div>
                ) : (
                        <>
                            <motion.div 
                                className="d-flex justify-content-between align-items-center mb-4 p-3 bg-white rounded shadow-sm"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                                viewport={{ once: true }}
                            >
                                <div>
                                    <h3 className="mb-0 d-flex align-items-center text-dark">
                                        {selectedCategory === 'All' ? (
                                            <>
                                                <i className="bi bi-grid-3x3-gap-fill me-2 text-success"></i>
                                                All Food Items
                                            </>
                                        ) : (
                                            <>
                                                <i className="bi bi-collection me-2 text-success"></i>
                                                {selectedCategory}
                                            </>
                                        )}
                                    </h3>
                                    <p className="text-dark mb-0 mt-1" style={{fontWeight: 500}}>Find the perfect dish for your cravings</p>
                                </div>
                                <span className="badge bg-success rounded-pill fs-6 px-3 py-2">
                                    {filteredItems.length} items
                                </span>
                            </motion.div>
                            
                            <motion.div 
                                className="row g-4"
                                variants={containerVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                            >
                                {filteredItems.length > 0 ? (
                                    filteredItems.map(item => (
                                        <motion.div 
                                            key={item._id} 
                                            className="col-md-6 col-lg-4 mb-4"
                                            variants={itemVariants}
                                        >
                                            <Card foodItem={item} />
                                        </motion.div>
                            ))
                        ) : (
                                    <div className="col-12 text-center py-5">
                                        <i className="bi bi-search" style={{fontSize: '3rem', color: '#212529'}}></i>
                                        <p className="h5 mt-3 text-dark">No food items found. Try a different search.</p>
                                        <button 
                                            className="btn btn-outline-success mt-3 shadow-sm"
                                            onClick={() => {
                                                setSearch('');
                                                setSelectedCategory('All');
                                            }}
                                        >
                                            <i className="bi bi-arrow-counterclockwise me-2"></i>
                                            Reset Filters
                                        </button>
                            </div>
                        )}
                            </motion.div>
                        </>
                    )}
                </div>
            </div>
            
            {/* Testimonials Section */}
            <div className="py-5" style={{background: 'linear-gradient(135deg, #f8f9fa, #ffffff)'}}>
                <div className="container">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="text-center mb-5"
                    >
                        <span className="badge bg-success px-3 py-2 mb-2">Testimonials</span>
                        <h2 className="display-5 fw-bold text-dark">What Our Customers Say</h2>
                        <div className="mx-auto" style={{width: '50px', height: '4px', background: 'linear-gradient(90deg, #28a745, #ffc107)', marginTop: '15px', borderRadius: '2px'}}></div>
                    </motion.div>
                    
                    <motion.div 
                        className="row g-4"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {[
                            {
                                name: "Priya Singh",
                                role: "Regular Customer",
                                image: "https://randomuser.me/api/portraits/women/44.jpg",
                                text: "GoFood has revolutionized how I order food. The delivery is always on time and the food arrives hot and fresh!"
                            },
                            {
                                name: "Rahul Sharma",
                                role: "Food Blogger",
                                image: "https://randomuser.me/api/portraits/men/32.jpg",
                                text: "As a food blogger, I've tried many delivery services. GoFood stands out with their quality, variety and customer service."
                            },
                            {
                                name: "Ananya Patel",
                                role: "Busy Professional",
                                image: "https://randomuser.me/api/portraits/women/68.jpg",
                                text: "With my hectic schedule, GoFood has been a lifesaver. The app is easy to use and their delivery is lightning fast!"
                            }
                        ].map((testimonial, index) => (
                            <motion.div 
                                className="col-md-4" 
                                key={index}
                                variants={itemVariants}
                            >
                                <div className="card h-100 border-0 shadow-sm testimonial-card">
                                    <div className="card-body p-4">
                                        <div className="d-flex justify-content-between mb-4">
                                            <div className="d-flex">
                                                <img src={testimonial.image} alt={testimonial.name} className="rounded-circle me-3" width="60" height="60" />
                                                <div>
                                                    <h5 className="mb-1 text-dark">{testimonial.name}</h5>
                                                    <p className="text-dark mb-0 small" style={{opacity: 0.8}}>{testimonial.role}</p>
                                                </div>
                                            </div>
                                            <div className="text-warning">
                                                <i className="bi bi-star-fill"></i>
                                                <i className="bi bi-star-fill"></i>
                                                <i className="bi bi-star-fill"></i>
                                                <i className="bi bi-star-fill"></i>
                                                <i className="bi bi-star-fill"></i>
                                            </div>
                                        </div>
                                        <p className="card-text text-dark">{testimonial.text}</p>
                                        <div className="text-end text-success">
                                            <i className="bi bi-quote fs-1 opacity-25"></i>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                    </div>
            </div>
            
            <style jsx="true">{`
                .feature-card {
                    transition: all 0.3s ease;
                    border-radius: 12px;
                    overflow: hidden;
                }
                
                .feature-card:hover {
                    transform: translateY(-10px);
                    box-shadow: 0 10px 20px rgba(0,0,0,0.1) !important;
                }
                
                .icon-container {
                    transition: all 0.3s ease;
                }
                
                .feature-card:hover .icon-container {
                    transform: scale(1.1);
                }
                
                .testimonial-card {
                    transition: all 0.3s ease;
                    border-radius: 12px;
                }
                
                .testimonial-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 10px 20px rgba(0,0,0,0.1) !important;
                }
            `}</style>
        </div>
    )
}
