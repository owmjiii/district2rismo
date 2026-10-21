import React from 'react'
import { Link } from 'react-router-dom'

function PlaceCard({ id, image, name, price }) {
    return (
        <Link to={`/resorts/${id}`} className='place-card'>
            <img src={image} alt={name} />
            <h6>{name}</h6>
            <small>₱{price.toFixed(2)} per person</small>
        </Link>
    )
}

export default PlaceCard