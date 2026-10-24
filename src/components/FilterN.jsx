import { useState } from 'react'

const iconClassesN = {
  'Pool': 'bi-water',
  'Pavilion': 'bi-house',
  'Cottages': 'bi-house',
  'Food available': 'bi-cup-hot',
  'Air-conditioned rooms': 'bi-snow',
  'Air conditioning': 'bi-snow',
  'Kitchen access': 'bi-fire',
  'Family rooms': 'bi-people',
  'Water slides': 'bi-water',
  'Videoke': 'bi-music-note',
  'Event space': 'bi-calendar-event',
  'Event-friendly': 'bi-calendar-event',
  'Whole resort rental': 'bi-house',
  'Swimming pool': 'bi-water',
  'Meeting/event room': 'bi-calendar-event',
  'Garden resort': 'bi-flower1',
  'Family resort': 'bi-people',
  'Events resort': 'bi-calendar-event',
  'Private pool resort': 'bi-water',
  'Private villa': 'bi-house',
  'Vacation house': 'bi-house',
  'Event venue': 'bi-calendar-event',
  'Family hotel': 'bi-people',
  'Budget hotel': 'bi-building',
  'Day tour': 'bi-sun',
  'Overnight stay': 'bi-moon-stars',
  'Event package': 'bi-calendar-event',
  'Breakfast included': 'bi-cup-hot',
  'Beach access': 'bi-sun',
  'Restaurant': 'bi-cup-hot',
  'Showers': 'bi-droplet',
  'Changing rooms': 'bi-door-open',
  'Wi-Fi': 'bi-wifi',
  'Free parking': 'bi-p-circle',
  'Family friendly': 'bi-people',
  'Waterfront': 'bi-water',
  'Kids pool': 'bi-life-preserver',
  'Outdoor dining': 'bi-cup-straw',
  'Garden': 'bi-flower1',
  'Barbecue area': 'bi-fire',
  'Water activities': 'bi-tsunami',
  'First-aid kit': 'bi-bandaid',
  'Smoke alarm': 'bi-alarm',
  'Security cameras (exterior)': 'bi-camera-video',
  'On-site staff': 'bi-person-badge',
  'Instant book': 'bi-calendar-check',
  'Self check-in': 'bi-key',
  'Allows pets': 'bi-heart',
  'Beach resort': 'bi-sun',
  'Island resort': 'bi-tree',
  'Waterpark resort': 'bi-water',
  'Mountain resort': 'bi-tree',
  'Private entrance': 'bi-door-open',
  'Entire property': 'bi-house',
  'Private pool': 'bi-water',
  'Hot tub': 'bi-droplet',
  'Fitness center': 'bi-heart-pulse',
  'Spa': 'bi-droplet',
  'Breakfast available': 'bi-cup-hot',
  'Room service': 'bi-bell',
  'Villa': 'bi-house',
  'Cabin': 'bi-house-door',
  'Cottage': 'bi-house',
  'Bungalow': 'bi-house',
  'Hotel': 'bi-building',
  'Boutique hotel': 'bi-building',
  'Resort hotel': 'bi-building',
  'Aparthotel': 'bi-building',
}
export const FilterN = ({ onClose }) => {
  const [typeN, setTypeN] = useState('Private resort')
  const [priceN, setPriceN] = useState(25000)
  const [maxPriceDraftN, setMaxPriceDraftN] = useState('25000')
  const [minPriceN, setMinPriceN] = useState(200)
  const [minPriceDraftN, setMinPriceDraftN] = useState('200')
  const [choicesN, setChoicesN] = useState({})
  const [roomsN, setRoomsN] = useState(0)
  const [bedsN, setBedsN] = useState(0)
  const commitMinimumPriceN = () => {
    const enteredPriceN = Number(minPriceDraftN)
    const boundedPriceN = Math.min(priceN, Math.max(200, Number.isFinite(enteredPriceN) ? enteredPriceN : 200))
    setMinPriceN(boundedPriceN)
    setMinPriceDraftN(String(boundedPriceN))
  }
  const commitMaximumPriceN = () => {
    const enteredPriceN = Number(maxPriceDraftN)
    const boundedPriceN = Math.max(minPriceN, Math.min(Number.isFinite(enteredPriceN) ? enteredPriceN : minPriceN, 50000))
    setPriceN(boundedPriceN)
    setMaxPriceDraftN(String(boundedPriceN))
  }
  const typesN = ['Private resort', 'Hotel']
  const essentialOptionsN = {
    'Private resort': ['Air-conditioned rooms', 'Pavilion', 'Free parking', 'Kitchen access', 'Showers', 'Changing rooms', 'Wi-Fi'],
    Hotel: ['Air conditioning', 'Wi-Fi', 'Free parking', 'Breakfast available', 'Restaurant', 'Family rooms'],
  }
  const bookingOptionsN = {
    'Private resort': ['Day tour', 'Overnight stay', 'Whole resort rental', 'Event package', 'Instant book', 'Allows pets'],
    Hotel: ['Instant book', 'Self check-in', 'Breakfast included', 'Allows pets'],
  }
  const propertyTypesN = {
    'Private resort': ['Private pool resort', 'Private villa', 'Vacation house', 'Event venue'],
    'Hotel': ['Hotel', 'Resort hotel', 'Family hotel', 'Budget hotel'],
  }
  const featureOptionsN = {
    'Private resort': ['Private pool', 'Whole resort rental', 'Videoke', 'Barbecue area', 'Garden', 'Event-friendly', 'Family friendly'],
    'Hotel': ['Swimming pool', 'Family rooms', 'Meeting/event room', 'Restaurant', 'Breakfast available', 'Room service', 'Fitness center'],
  }
  const filterGroupsN = [
    { title: 'Essentials', key: 'essentials', choices: ['Pool', 'Beach access', 'Restaurant', 'Showers', 'Changing rooms', 'Wi-Fi', 'Free parking'] },
    { title: 'Features', key: 'features', choices: ['Waterfront', 'Kids pool', 'Outdoor dining', 'Garden', 'Barbecue area', 'Water activities', 'Family friendly'] },
    { title: 'Safety', key: 'safety', choices: ['First-aid kit', 'Smoke alarm', 'Security cameras (exterior)', 'On-site staff'] },
    { title: 'Booking options', key: 'booking', choices: ['Instant book', 'Self check-in', 'Allows pets'] },
    { title: 'Property type', key: 'property', choices: ['Beach resort', 'Island resort', 'Waterpark resort', 'Mountain resort'] },
  ]
  const toggleChoiceN = (groupN, choiceN) => {
    setChoicesN((currentN) => {
      const selectedN = currentN[groupN] || []
      return {
        ...currentN,
        [groupN]: selectedN.includes(choiceN)
          ? selectedN.filter((itemN) => itemN !== choiceN)
          : [...selectedN, choiceN],
      }
    })
  }

  return (
    <div className="filter-modalN rounded-5 shadow">
      <header className="filter-headerN d-flex align-items-center justify-content-center border-bottom">
        <h1 className="h6 text-white fw-semibold mb-0">Filters</h1>
        <button className="btn-close position-absolute end-0 me-4" type="button" aria-label="Close filters" onClick={onClose} />
      </header>

      <div className="filter-contentN">
        <h2 className="h6 text-white fw-semibold mb-3">Type of place</h2>
        <div className="filter-type-tabsN d-flex border rounded-4 p-1">
          {typesN.map((itemN) => (
            <button
              key={itemN}
              type="button"
              className={`btn filter-type-buttonN text-white flex-fill ${typeN === itemN ? 'active' : ''}`}
              aria-pressed={typeN === itemN}
              onClick={() => { setTypeN(itemN); setChoicesN((currentN) => ({ ...currentN, property: [], features: [] })) }}
            >
              {itemN}
            </button>
          ))}
        </div>

        <hr className="my-4" />

        <h2 className="h6 text-white fw-semibold mb-1">Price range</h2>
        <p className="text-secondary text-white small mb-0">Trip price, includes all fees</p>

       

        <div className="filter-price-fieldsN mt-2">
          <div className="filter-priceN">
            <label className="filter-captionN" htmlFor="minimum-priceN">Minimum price</label>
            <div className="filter-price-input-wrapN">
              <span aria-hidden="true">&#8369;</span>
                            <input
                id="minimum-priceN"
                className="filter-price-inputN"
                type="number"
                min="200"
                max={priceN}
                value={minPriceDraftN}
                onChange={(eventN) => setMinPriceDraftN(eventN.target.value)}
                onBlur={commitMinimumPriceN}
                onKeyDown={(eventN) => {
                  if (eventN.key === 'Enter') {
                    eventN.preventDefault()
                    commitMinimumPriceN()
                  }
                }}
                aria-label="Minimum price in pesos"
              />
            </div>
          </div>
          <div className="filter-priceN">
            <label className="filter-captionN" htmlFor="maximum-priceN">Maximum price</label>
            <div className="filter-price-input-wrapN">
              <span aria-hidden="true">&#8369;</span>
                            <input
                id="maximum-priceN"
                className="filter-price-inputN"
                type="number"
                value={maxPriceDraftN}
                onChange={(eventN) => setMaxPriceDraftN(eventN.target.value)}
                onKeyDown={(eventN) => {
                  if (eventN.key === 'Enter') {
                    eventN.preventDefault()
                    commitMaximumPriceN()
                  }
                }}
                aria-label="Maximum price in pesos"
              />
            </div>
          </div>
        </div>


        {(typeN === 'Private resort' || typeN === 'Hotel') && (
          <section className="filter-sectionN filter-roomsN">
            <hr className="my-4" />
            <h2 className="h6 text-white fw-semibold mb-3">Rooms and beds</h2>
            {[['Rooms', roomsN, setRoomsN], ['Beds', bedsN, setBedsN]].map(([labelN, countN, setCountN]) => (
              <div className="filter-stepper-rowN" key={labelN}>
                <span>{labelN}</span>
                <div className="filter-stepperN">
                  <button type="button" aria-label={`Remove one ${labelN.toLowerCase()}`} disabled={countN === 0} onClick={() => setCountN((valueN) => Math.max(0, valueN - 1))}>-</button>
                  <span>{countN === 0 ? 'Any' : countN}</span>
                  <button type="button" aria-label={`Add one ${labelN.toLowerCase()}`} onClick={() => setCountN((valueN) => valueN + 1)}>+</button>
                </div>
              </div>
            ))}
          </section>
        )}

        {filterGroupsN.map((groupN) => (
          <section className="filter-sectionN" key={groupN.key}>
            <hr className="my-4" />
            <h2 className="h6 text-white fw-semibold mb-3">{groupN.title}</h2>
            <div className="filter-choice-gridN option-icon-gridN">
              {(({ essentials: essentialOptionsN[typeN], features: featureOptionsN[typeN], booking: bookingOptionsN[typeN], property: propertyTypesN[typeN] })[groupN.key] || groupN.choices).filter((choiceN) => !(groupN.key === 'essentials' && ((choiceN === 'Pool' && typeN === 'Private resort') || (choiceN === 'Restaurant' && typeN === 'Private resort')))).map((choiceN) => {
                const selectedN = (choicesN[groupN.key] || []).includes(choiceN)
                return (
                  <button
                    className={`filter-option-tileN ${selectedN ? 'selected' : ''}`}
                    type="button"
                    aria-pressed={selectedN}
                    key={choiceN}
                    onClick={() => toggleChoiceN(groupN.key, choiceN)}
                  >
                    <i className={`bi ${iconClassesN[choiceN] || 'bi-building'} amenity-iconN`} aria-hidden="true" />
                    <span>{choiceN}</span>
                  </button>
                )
              })}
            </div>
          </section>
        ))}
      </div>
      <footer className="filter-footerN d-flex justify-content-between align-items-center border-top">
        <button className="btn btn-link fw-semibold p-0" type="button" onClick={() => { setTypeN('Private resort'); setPriceN(25000); setMaxPriceDraftN('25000'); setMinPriceN(200); setMinPriceDraftN('200'); setChoicesN({}); setRoomsN(0); setBedsN(0) }}>
          Clear all
        </button>
        <button className="btn btn-dark rounded-3 px-4 py-2 fw-semibold" type="button">
          Show places
        </button>
      </footer>
    </div>
  )
}






























