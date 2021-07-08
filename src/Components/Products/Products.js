import React, { Component } from 'react';

import { formatCurrency } from '../../util';

import './Products.css'


export default class Products extends Component {

  render() {

  const listOfProducts =
    this.props.products.map(product => (
        <li key={product.id}>
          <div className="product">

            <a href={'#' + product._id}>
              <img src={product.image_url} alt={product.title}/>
              <p>{product.title}</p>
            </a>

            <div className="product-price">
              <div>{formatCurrency(product.price)}</div>

              <button
                className="button primary"
                onClick={() => this.props.addToCart(product)}>
                Add to Cart
              </button>
            </div>
          </div>
        </li>
      )
    )

    return (
      <div>
        <ul className="products">
          {listOfProducts}
        </ul>
      </div>
    );
  }
}
