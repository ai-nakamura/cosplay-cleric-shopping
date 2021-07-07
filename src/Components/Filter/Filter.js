import React from 'react';

import './Filter.css';


export default function Filter(products) {

  return <div className="filter">
    <div className="filter-result">{products.count} Products</div>

    <div className="filter-sort">
      Order{" "}
      <select value={products.size} onChange={products.sortProducts}>
        <option value="latest">Latest</option>
        <option value="lowest">Lowest</option>
        <option value="highest">Highest</option>
      </select>
    </div>

    <div className="filter-size">
      Filter{" "}
      <select value={products.type} onChange={products.filterProducts}>
        <option value="">All</option>
        <option value="teatowel">Tea Towel</option>
        <option value="dicebag">Dice Bag</option>
        <option value="other">Other</option>
      </select>
    </div>
  </div>
}
