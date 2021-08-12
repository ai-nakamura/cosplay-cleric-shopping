import React, { Component } from 'react';
import { connect } from "react-redux";

import {
  filterProducts,
  sortProducts
} from "../../actions/productActions";

import './Filter.css';


class Filter extends Component {

  render() {
    const {
      type,
      size, sort, products, filteredProducts,
      filterProducts, sortProducts
    } = this.props;

    console.log(this.props);
    if (!filteredProducts) {
      return <div>loading...</div>;
    }
    return (
      <div className="filter">
        <div className="filter-result">{filteredProducts.length} Products</div>

        <div className="filter-sort">
          Order{" "}
          <select
            value={size}
            onChange={e => sortProducts(filteredProducts, e.target.value)}>
            <option value="latest">Latest</option>
            <option value="lowest">Lowest</option>
            <option value="highest">Highest</option>
          </select>
        </div>

        <div className="filter-type">
          Filter{" "}
          <select
            value={type}
            onChange={e => filterProducts(products, e.target.value)}>
            <option value="">All</option>
            <option value="teatowel">Tea Towel</option>
            <option value="dicebag">Dice Bag</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>
    );
  };
}

export default connect(
  state => ({
    size: state.products.size,
    sort: state.products.sort,
    products: state.products.items,
    filteredProducts: state.products.filteredItems
  }),
  {
    filterProducts,
    sortProducts
  }
)(Filter);
