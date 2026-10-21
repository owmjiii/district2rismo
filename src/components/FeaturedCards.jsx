import React from 'react'
import BaliwagFeatured from '../images/Baliwag Featured.png'
import { Link } from 'react-router-dom'

function FeaturedCards({ image, name, town, desc, link }) {
    return (
        <div className='card-container'>

            <img src={BaliwagFeatured} alt="" />

            <div className='card-info px-3 py-2 d-flex flex-column gap-2'>
                <div>
                    <h3>Fabian's Azzure Private Resort</h3>
                    <h5>Baliwag, Bulacan</h5>
                </div>

                <div>
                    <span>Fabian’s Azzure Private Resort offers a relaxing private
                        getaway, perfect for family gatherings, barkada outings,
                        and memorable celebrations.</span>
                </div>

                <Link to="/destination" className="button my-2 my-sm-1">
                    Explore
                </Link>

            </div>
        </div>
    )
}

export default FeaturedCards