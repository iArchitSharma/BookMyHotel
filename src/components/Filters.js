import React from 'react';

const Filters = ({ onFilter, onSort }) => {
  return (
    <div>
      <input
        type="text"
        placeholder="Filter by name"
        onChange={(e) => onFilter(e.target.value)} 
      />
      <select onChange={(e) => onSort(e.target.value)}>
        <option value="price_asc">Price Low to High</option>
        <option value="price_desc">Price High to Low</option>
      </select>
    </div>
  );
};

export default Filters;