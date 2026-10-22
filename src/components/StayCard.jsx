function StayCard({ image, name, capacity, price }) {
    return (
        <div className='cottage-card'>
            <img src={image} alt={name} />
            <h4>{name}</h4>
            <small>{capacity} person • {typeof price === 'number' ? `₱${price.toLocaleString()}` : price}</small>
        </div>
    )
}

export default StayCard