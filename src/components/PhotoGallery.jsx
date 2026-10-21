function PhotoGallery({ images }) {
    return (
        <div className='gallery'>
            {images.slice(0, 5).map((src, i) => (
                <img key={i} src={src} alt={`Photo ${i + 1}`} />
            ))}
        </div>
    )
}

export default PhotoGallery