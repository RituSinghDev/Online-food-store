import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

// Predefined fallback images for different food categories
const fallbackImages = {
    default: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=60",
    pizza: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=500&q=60",
    burger: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=60",
    pasta: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&w=500&q=60",
    rice: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=500&q=60",
    dessert: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=500&q=60",
    drink: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=500&q=60",
    indian: "https://images.unsplash.com/photo-1585937421612-70a008356c36?auto=format&fit=crop&w=500&q=60",
    chinese: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=500&q=60"
};

// Function to get a better image based on food name
const getFoodImage = (foodItem) => {
    // If already has a valid image URL that's not a placeholder, use it
    if (foodItem.image && 
        typeof foodItem.image === 'string' && 
        !foodItem.image.includes('placeholder') && 
        !foodItem.image.includes('undefined')) {
        return foodItem.image;
    }
    
    const name = foodItem.name ? foodItem.name.toLowerCase() : '';
    const category = foodItem.category ? foodItem.category.toLowerCase() : '';
    
    // Check for specific food types in the name
    if (name.includes('pizza')) return fallbackImages.pizza;
    if (name.includes('burger')) return fallbackImages.burger;
    if (name.includes('pasta')) return fallbackImages.pasta;
    if (name.includes('rice')) return fallbackImages.rice;
    if (name.includes('cake') || name.includes('dessert') || name.includes('sweet')) return fallbackImages.dessert;
    if (name.includes('drink') || name.includes('beverage') || name.includes('juice') || name.includes('soda')) return fallbackImages.drink;
    
    // Check by category
    if (category.includes('pizza')) return fallbackImages.pizza;
    if (category.includes('burger')) return fallbackImages.burger;
    if (category.includes('pasta')) return fallbackImages.pasta;
    if (category.includes('rice')) return fallbackImages.rice;
    if (category.includes('dessert')) return fallbackImages.dessert;
    if (category.includes('drink') || category.includes('beverage')) return fallbackImages.drink;
    if (category.includes('indian')) return fallbackImages.indian;
    if (category.includes('chinese')) return fallbackImages.chinese;
    
    // If no matches, use default image
    return fallbackImages.default;
};

export default function Card({ foodItem }) {
    const { addToCart } = useContext(CartContext);
    const [size, setSize] = useState('');
    const [qty, setQty] = useState(1);
    const [isHovered, setIsHovered] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const [liked, setLiked] = useState(false);
    
    useEffect(() => {
        if (foodItem && foodItem.name) {
            setImageUrl(getFoodImage(foodItem));
        }
    }, [foodItem]);

    const priceOptions = foodItem && foodItem.options && foodItem.options[0] ? Object.keys(foodItem.options[0]) : [];

    const handleAddToCart = () => {
        if (priceOptions.length > 0 && !size) {
            alert('Please select a size');
            return;
        }
        
        let price = 0;
        if (foodItem.options && foodItem.options[0] && size) {
            price = parseInt(foodItem.options[0][size]);
        } else if (foodItem.price) {
            price = parseInt(foodItem.price);
        }
        
        if (isNaN(price) || price <= 0) {
            alert('Invalid price. Please try again.');
            return;
        }
        
        addToCart({
            _id: foodItem._id || '',
            name: foodItem.name || 'Unknown Item',
            price: price,
            image: imageUrl
        }, size, qty);
    };
    
    const handleImageError = () => {
        setImageUrl(fallbackImages.default);
    };

    if (!foodItem) {
        return null; // Don't render anything if no food item is provided
    }

    return (
        <div 
            className="food-card card border-0 shadow-sm h-100 overflow-hidden"
            style={{
                borderRadius: '12px',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                transform: isHovered ? 'translateY(-5px)' : 'none',
                boxShadow: isHovered ? '0 10px 20px rgba(0,0,0,0.1)' : '0 4px 8px rgba(0,0,0,0.05)',
                maxWidth: '350px',
                margin: '0 auto',
                height: '460px' // Fixed height for consistent card size
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="position-relative overflow-hidden" style={{ height: "180px" }}>
                <img 
                    src={imageUrl} 
                    className="card-img-top w-100 h-100" 
                    alt={foodItem.name || 'Food item'} 
                    style={{ 
                        objectFit: "cover",
                        transition: 'transform 0.5s ease',
                        transform: isHovered ? 'scale(1.05)' : 'scale(1)'
                    }}
                    onError={handleImageError}
                />
                <div className="img-overlay position-absolute top-0 start-0 w-100 h-100"
                    style={{
                        background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 40%)',
                    }}>
                </div>
                
                <div className="position-absolute top-0 start-0 w-100 p-2 d-flex justify-content-between">
                    {foodItem.category && (
                        <span className="badge bg-light text-dark rounded-pill px-2 py-1" 
                            style={{
                                fontWeight: '500',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                fontSize: '0.7rem'
                            }}>
                            {foodItem.category}
                        </span>
                    )}
                    
                    {foodItem.hasOwnProperty('veg') && (
                        <span 
                            className={`badge ${
                                foodItem.veg ? 'bg-success' : 'bg-danger'
                            } rounded-pill px-2 py-1`}
                            style={{
                                fontWeight: '500',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                fontSize: '0.7rem'
                            }}
                        >
                            {foodItem.veg ? 'Veg' : 'Non-Veg'}
                        </span>
                    )}
                </div>
                
                <button 
                    className="position-absolute top-0 end-0 m-2 btn btn-light rounded-circle p-1 shadow-sm"
                    style={{
                        width: '30px',
                        height: '30px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'transform 0.2s',
                        transform: liked ? 'scale(1.1)' : 'scale(1)',
                        zIndex: 10,
                        fontSize: '0.8rem'
                    }}
                    onClick={(e) => {
                        e.preventDefault();
                        setLiked(!liked);
                    }}
                >
                    {liked ? 
                        <i className="bi bi-heart-fill text-danger"></i> :
                        <i className="bi bi-heart text-muted"></i>
                    }
                </button>
                
                <div className="position-absolute bottom-0 start-0 w-100 p-2">
                    <h6 className="card-title text-white mb-0" style={{textShadow: '0 1px 3px rgba(0,0,0,0.3)'}}>
                        {foodItem.name || 'Unnamed Item'}
                    </h6>
                </div>
            </div>
            
            <div className="card-body pt-3 pb-3 d-flex flex-column" style={{ height: '280px' }}>
                <div className="d-flex justify-content-between align-items-center mb-2">
                    <h6 className="text-success d-flex align-items-center mb-0 fw-bold">
                        <i className="bi bi-currency-rupee"></i>
                        {foodItem.price || 0}
                    </h6>
                    
                    <div className="d-flex align-items-center">
                        <div className="ratings">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <i key={star} className={`bi bi-star-fill ${star <= 4 ? 'text-warning' : 'text-muted'}`} style={{fontSize: '0.7rem'}}></i>
                            ))}
                        </div>
                        <span className="ms-1 text-muted" style={{fontSize: '0.75rem'}}>4.0</span>
                    </div>
                </div>
                
                <p className="card-text text-muted mb-3" style={{ 
                    fontSize: '0.8rem', 
                    height: "36px", 
                    overflow: "hidden",
                    display: "-webkit-box",
                    WebkitLineClamp: "2",
                    WebkitBoxOrient: "vertical"
                }}>
                    {foodItem.description || 'No description available'}
                </p>
                
                <div className="row g-2 mb-3">
                    <div className="col-6">
                            <select 
                            className='form-select form-select-sm bg-light' 
                                value={qty} 
                            onChange={(e) => setQty(parseInt(e.target.value) || 1)}
                            style={{borderColor: '#e9ecef', fontSize: '0.8rem'}}
                            >
                                {Array.from(Array(6), (e, i) => {
                                    return (
                                    <option key={i + 1} value={i + 1}>{i + 1} Qty</option>
                                    )
                                })}
                            </select>
                    </div>

                    {priceOptions.length > 0 && (
                        <div className="col-6">
                            <select 
                                className='form-select form-select-sm bg-light' 
                                value={size}
                                onChange={(e) => setSize(e.target.value)}
                                style={{borderColor: '#e9ecef', fontSize: '0.8rem'}}
                            >
                                <option value="">Size</option>
                                {priceOptions.map(option => (
                                    <option key={option} value={option}>{option}</option>
                                ))}
                            </select>
                        </div>
                    )}
                        </div>

                <div className="d-grid gap-2 mt-auto">
                                <button 
                        className="btn btn-success py-1"
                                    onClick={handleAddToCart}
                        disabled={!foodItem.price}
                        style={{
                            borderRadius: '6px',
                            transition: 'all 0.2s',
                            boxShadow: isHovered ? '0 4px 8px rgba(40, 167, 69, 0.3)' : 'none',
                            fontSize: '0.85rem'
                        }}
                    >
                        <i className="bi bi-cart-plus me-1"></i>Add to Cart
                                </button>
                    
                                <Link 
                        to={`/food/${foodItem._id || ''}`} 
                        className="btn btn-outline-secondary py-1"
                        style={{
                            borderRadius: '6px',
                            fontSize: '0.85rem'
                        }}
                    >
                        <i className="bi bi-info-circle me-1"></i>View Details
                                </Link>
                </div>
            </div>
        </div>
    );
}
