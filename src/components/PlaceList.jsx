import React, { useRef, useState } from 'react'
import PlaceCard from './PlaceCard'

function PlaceList({ town, places }) {
    const rowRef = useRef(null)
    const [open, setOpen] = useState(true)

    const scroll = (dir) => {
        rowRef.current.scrollBy({ left: dir * 400, behavior: 'smooth' })
    }

    return (
        <section className='place-list'>
            <button className='place-list-title' onClick={() => setOpen(!open)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                    className={`chevron${open ? '' : ' closed'}`} viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708" />
                </svg>
                <h2>{town}</h2>
            </button>

            {open && (
                <div className='place-list-body'>
                    <button className='arrow-btn' onClick={() => scroll(-1)} aria-label='Previous'>‹</button>

                    <div className='place-row' ref={rowRef}>
                        {places.map(p => <PlaceCard key={p.id} {...p} />)}
                    </div>

                    <button className='arrow-btn' onClick={() => scroll(1)} aria-label='Next'>›</button>
                </div>
            )}
        </section>
    )
}

export default PlaceList