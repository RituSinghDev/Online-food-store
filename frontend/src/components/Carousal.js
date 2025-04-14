import React from 'react'
import { Link } from 'react-router-dom'

export default function Carousal() {
    return (
        <div className="hero-carousel">
            <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner" id='carousel'>
                    {/* Hero Overlay Content */}
                    <div className="hero-content position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ zIndex: 10, background: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5))' }}>
                        <div className="text-center text-white px-3">
                            <h1 className="display-3 fw-bold mb-3" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
                                Delicious Food Delivered
                            </h1>
                            <p className="lead mb-4" style={{ maxWidth: '700px', margin: '0 auto', textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
                                Order your favorite meals from the best restaurants in your area.
                                Fast delivery, easy payment, and mouthwatering selections.
                            </p>
                            <div className="d-flex justify-content-center gap-3 mt-3">
                                <Link to="/register" className="btn btn-success btn-lg px-4 py-2">
                                    Get Started
                                </Link>
                                <a href="#food-menu" className="btn btn-outline-light btn-lg px-4 py-2">
                                    Browse Menu
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Search Box */}
                    <div className="search-box position-absolute bottom-0 start-50 translate-middle-x mb-5" style={{ zIndex: 20, width: '90%', maxWidth: '600px' }}>
                        <form className="d-flex">
                            <div className="input-group input-group-lg shadow">
                                <input 
                                    className="form-control border-0" 
                                    type="search" 
                                    placeholder="What are you craving today?" 
                                    aria-label="Search" 
                                />
                                <button className="btn btn-success px-4" type="submit">
                                    <i className="bi bi-search me-2"></i>Find Food
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Carousel Items */}
                    <div className="carousel-item active">
                        <img 
                            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?fm=jpg&q=80&w=3000" 
                            className="d-block w-100" 
                            style={{ height: '600px', objectFit: 'cover', filter: 'brightness(0.8)' }} 
                            alt="Delicious food spread" 
                        />
                    </div>
                    <div className="carousel-item">
                        <img 
                            src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?fm=jpg&q=80&w=3000" 
                            className="d-block w-100" 
                            style={{ height: '600px', objectFit: 'cover', filter: 'brightness(0.8)' }} 
                            alt="Food preparation" 
                        />
                    </div>
                    <div className="carousel-item">
                        <img 
                            src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=3000&fm=jpg" 
                            className="d-block w-100" 
                            style={{ height: '600px', objectFit: 'cover', filter: 'brightness(0.8)' }} 
                            alt="Pizza" 
                        />
                    </div>
                </div>

                {/* Carousel Controls */}
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>

                {/* Carousel Indicators */}
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleControls" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleControls" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleControls" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
            </div>
        </div>
    )
}
