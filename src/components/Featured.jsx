import React from 'react'
import FeaturedCards from '../components/FeaturedCards'
import { Link } from 'react-router-dom'

function Featured() {
    return (
        <div className='featured-container d-flex flex-column align-items-center justify-content-center my-5'>

            <div className='title-container'>
                <h1>Discover <span id='yellow-text-bold'>most popular destination </span>
                    across every municipality in the district.</h1>
            </div>

            <div className='w-75 my-4 row g-3'>
                <div className='col-12 col-md-4'><FeaturedCards /></div>
                <div className='col-12 col-md-4'><FeaturedCards /></div>
                <div className='col-12 col-md-4'><FeaturedCards /></div>
            </div>

            <div>
                <Link to="/destination" className='view-more'>View more destination</Link>
            </div>

        </div>
    )
}

export default Featured