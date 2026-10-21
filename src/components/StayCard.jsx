function StayCard({ image, name, capacity, price }) {
    return (
        <div className='cottage-card'>
            <img src={image} alt={name} />
            <h4>{name}</h4>
            <small>{capacity} person • ₱{price.toLocaleString()}</small>
        </div>
    )
}

export default StayCard