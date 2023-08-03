import React from 'react';
import './FilterComponent.css';

const FilterComponent = ({ categories, category, setCatagory, price, setPrice }) => {
    
  return (
    <div className="filter-container">
      <div className="filter-section">
        <label htmlFor="category">Select Category:</label>
        <select id="category" value={category? category: "All"} onChange={(e) => setCatagory(e.target.value)} >
          <option value="All">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className="filter-section">
        <label htmlFor="price-range">Price Range:{price}</label>
        <input
          type="range"
          id="price-range"
          min={0}
          max={300}
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <span>${price}</span>
      </div>
    </div>
  );
};

export default FilterComponent;
