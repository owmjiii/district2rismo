import React, { useEffect, useRef } from 'react'
import { Carousel } from 'bootstrap'
import BaliwagHero from '../images/Baliwag Hero.png'
import BustosHero from '../images/Bustos Hero.png'
import PlaridelHero from '../images/Plaridel Hero.png'
import { Link } from 'react-router-dom'
import Header from '../components/Header.jsx'

function Hero() {
    const carouselRef = useRef(null)

    useEffect(() => {
        const carousel = new Carousel(carouselRef.current, {
            interval: 3000,
            ride: 'carousel',
            pause: false,
        })
        return () => carousel.dispose()
    }, [])

    return (

        <div className="hero">

            <Header />

            <div>
                <div ref={carouselRef} className="carousel slide hero-bg">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img src={BaliwagHero} className="d-block w-100" alt="Baliwag" />
                        </div>
                        <div className="carousel-item">
                            <img src={BustosHero} className="d-block w-100" alt="Bustos" />
                        </div>
                        <div className="carousel-item">
                            <img src={PlaridelHero} className="d-block w-100" alt="Plaridel" />
                        </div>
                    </div>

                </div>
                <div className='dark-overlay'></div>

                <div className='hero-content'>

                    <div className='hero-text d-flex flex-column align-items-center justify-content-center my-5'>
                        <div className='main-text-container'>
                            <h1>
                                Discover Your Next Getaway in
                                <span id='yellow-text-bold'> Bulacan’s 2nd District.</span>
                            </h1>
                        </div>

                        <div className='subtext-container mt-lg-5 mt-2'>
                            <span>
                                Discover refreshing getaways, and exceptional private resort destinations of
                                Bulacan’s 2nd District. Your next memorable escape begins here with District 2rismo.
                            </span>
                        </div>

                        {/* GET STARTED BUTTON */}
                        <Link to="/destination" className="button mt-lg-5 mt-3 d-flex">
                            Get Started <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-arrow-right-short" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8" />
                            </svg>
                        </Link>
                    </div>

                </div>
                
            </div>
            
        </div>
    )
}

export default Hero