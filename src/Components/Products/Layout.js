import React, { Component } from 'react';
import productsList from "./products.json";
import Products from './Products';

import './Layout.css';

export default class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: productsList.productsList,
      size: '',
      sort: ''
    }
  }

  render() {
    return (
      <div className="content">
        <div className="main">
          <Products products={this.state.products}/>
        </div>
        <div className="sidebar">
          Cart Items
        </div>
      </div>
    )
  }
}
