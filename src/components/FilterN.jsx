import { useState } from 'react'

const filterGroupsN = [
  { title: 'Amenities', key: 'amenities', choices: ['Private Swimming Pool', 'Adult Pool', 'Kiddie Pool', 'Water Slides', 'Jacuzzi / Hot Tub', 'Outdoor Shower', 'Diving Pool'] },
  { title: 'Accommodation & Comfort', key: 'comfort', choices: ['Air-Conditioned Rooms', 'Bedrooms', 'Private Bathroom', 'Bunk Beds', 'Extra Mattresses'] },
  { title: 'Living Area', key: 'living', choices: ['Living Room', 'Kitchen', 'Refrigerator', 'Dining Area', 'Wi-Fi'] },
  { title: 'Cooking & Entertainment', key: 'entertainment', choices: ['Grilling Area', 'Outdoor Kitchen', 'Videoke / Karaoke', 'Smart TV', 'Board Games'] },
  { title: 'Group & Event Facilities', key: 'events', choices: ['Function Hall', 'Covered Pavilion', 'Outdoor Event Space', 'Tables and Chairs', 'Basketball Court', 'Volleyball Court'] },
  { title: 'Convenience & Safety', key: 'safety', choices: ['Private Parking', 'Caretaker / On-Site Staff', 'CCTV', 'Pet-Friendly Area'] },
]
export const FilterN = ({ onClose }) => {
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

  const clearAllN = () => {
    setPriceN(25000)
    setMaxPriceDraftN('25000')
    setMinPriceN(200)
    setMinPriceDraftN('200')
    setChoicesN({})
    setRoomsN(0)
    setBedsN(0)
  }

  return (
    <div className="filter-modalN rounded-5 shadow">
      <header className="filter-headerN d-flex align-items-center justify-content-center border-bottom">
        <h1 className="h6 text-white fw-semibold mb-0">Filters</h1>
        <button className="btn-close position-absolute end-0 me-4" type="button" aria-label="Close filters" onClick={onClose} />
      </header>

      <div className="filter-contentN">
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
                onBlur={commitMaximumPriceN}
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

        {filterGroupsN.map((groupN) => (
          <section className="filter-sectionN" key={groupN.key}>
            <hr className="my-4" />
            <h2 className="h6 text-white fw-semibold mb-3">{groupN.title}</h2>
            <div className="filter-choice-gridN option-icon-gridN">
              {groupN.choices.map((choiceN) => {
                const selectedN = (choicesN[groupN.key] || []).includes(choiceN)
                return (
                  <button
                    key={choiceN}
                    className={`filter-option-tileN ${selectedN ? 'selected' : ''}`}
                    type="button"
                    aria-pressed={selectedN}
                    onClick={() => toggleChoiceN(groupN.key, choiceN)}
                  >
                    <span>{choiceN}</span>
                  </button>
                )
              })}
            </div>
          </section>
        ))}
      </div>
      <footer className="filter-footerN d-flex justify-content-between align-items-center border-top">
        <button className="btn btn-link fw-semibold p-0" type="button" onClick={clearAllN}>Clear all</button>
        <button className="btn btn-dark rounded-3 px-4 py-2 fw-semibold" type="button">Show places</button>
      </footer>
    </div>
  )
}

