import React from 'react'
import NavBar from '../components/NavBar.jsx'
import PlaceList from '../components/PlaceList.jsx'
import Sample from '../images/Baliwag Featured.png'
import Footer from '../components/Footer.jsx'
import { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import { FilterN } from '../components/FilterN.jsx'

const resorts = [
    { id: 1, town: 'Baliwag, Bulacan', name: 'Lorem Ipsum', price: 350, image: Sample },
    { id: 2, town: 'Baliwag, Bulacan', name: 'Lorem Ipsum', price: 350, image: Sample },
    { id: 3, town: 'Baliwag, Bulacan', name: 'Lorem Ipsum', price: 350, image: Sample },
    { id: 4, town: 'Baliwag, Bulacan', name: 'Lorem Ipsum', price: 350, image: Sample },
    { id: 5, town: 'Baliwag, Bulacan', name: 'Lorem Ipsum', price: 350, image: Sample },
    { id: 6, town: 'Baliwag, Bulacan', name: 'Lorem Ipsum', price: 350, image: Sample },
    { id: 7, town: 'Baliwag, Bulacan', name: 'Lorem Ipsum', price: 350, image: Sample },
    { id: 8, town: 'Baliwag, Bulacan', name: 'Lorem Ipsum', price: 350, image: Sample },
    { id: 9, town: 'Bustos, Bulacan', name: 'Lorem Ipsum', price: 350, image: Sample },
    { id: 10, town: 'Plaridel, Bulacan', name: 'Lorem Ipsum', price: 350, image: Sample },
]
function Destinations() {
    const [showFilter, setShowFilter] = useState(false)

    const towns = [...new Set(resorts.map(r => r.town))]

    return (
        <div>
            <div className="destinations-page">

                <NavBar />

                <div className='dest-parent-container mx-3 d-flex justify-content-between gap-3'>

                    <button className="filter d-flex align-items-center gap-1" aria-label="Filter" onClick={() => setShowFilter(true)} >
                        <span className='filter-text'>Filter</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-sliders" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M11.5 2a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M9.05 3a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0V3zM4.5 7a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M2.05 8a2.5 2.5 0 0 1 4.9 0H16v1H6.95a2.5 2.5 0 0 1-4.9 0H0V8zm9.45 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3m-2.45 1a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0v-1z" />
                        </svg>
                    </button>

                    <div className='search-wrapper d-flex align-items-center'>
                        <input className='search-bar' type="text" placeholder='Search Destination' />
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                        </svg>
                    </div>
                    <Modal show={showFilter}onHide={() => setShowFilter(false)} centered contentClassName="bg-transparent border-0">
                        <Modal.Body className="p-0">
                            <FilterN onClose={() => setShowFilter(false)} />
                        </Modal.Body>
                    </Modal>

                </div>

                <div className='mx-3'>
                    {towns.map(town => (
                        <PlaceList
                            key={town}
                            town={town}
                            places={resorts.filter(r => r.town === town)}
                        />
                    ))}
                </div>

            </div>
            <Footer />
        </div>
    )
}

export default Destinations