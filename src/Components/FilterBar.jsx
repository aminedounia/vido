import React from 'react';

export default function FilterBar({ activeCategory, setActiveCategory }) {
const categories = [
  { key: "Backgrounds", value: "backgrounds" },
  { key: "Fashion", value: "fashion" },
  { key: "Nature", value: "nature" },
  { key: "Science", value: "science" },
  { key: "Education", value: "education" },
  { key: "Feelings", value: "feelings" },
  { key: "Health", value: "health" },
  { key: "People", value: "people" },
  { key: "Religion", value: "religion" },
  { key: "Places", value: "places" },
  { key: "Animals", value: "animals" },
  { key: "Industry", value: "industry" },
  { key: "Computer", value: "computer" },
  { key: "Food", value: "food" },
  { key: "Sports", value: "sports" },
  { key: "Transportation", value: "transportation" },
  { key: "Travel", value: "travel" },
  { key: "Buildings", value: "buildings" },
  { key: "Business", value: "business" },
  { key: "Music", value: "music" }
];


  return (
    <div style={{ width: '100%', maxWidth: '90vw', overflow: 'hidden', backgroundColor: '#fff' }}>
      <div className="hide-scrollbar" style={{ 
          display: 'flex', gap: '10px', padding: '10px 15px', overflowX: 'auto', whiteSpace: 'nowrap',
          msOverflowStyle: 'none', scrollbarWidth: 'none'
        }}>
        <style>{`.hide-scrollbar::-webkit-scrollbar { display: none; }`}</style>

        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setActiveCategory(cat.value)}
            className={`btn btn-sm rounded-pill px-3 fw-medium ${
              activeCategory === cat.value ? 'btn-danger' : 'btn-light border'
            }`}
            style={{ flex: '0 0 auto', fontSize: '0.85rem' }}
          >
            {cat.key}
          </button>
        ))}
      </div>
    </div>
  );
}