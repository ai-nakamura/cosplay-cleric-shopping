import React, { Component } from 'react';
import productsList from "../../Components/Products/products.json";
import Products from '../../Components/Products/Products';

import './Layout.css';
import Filter from '../../Components/Filter/Filter';

export default class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: productsList.productsList,
      type: '',
      sort: ''
    }
  }

  filterProducts = (event) => {
    if (event.target.value === "") {
      this.setState({
        type: event.target.value,
        products: productsList.productsList
      })
    }
    else {
      this.setState({
        type: event.target.value,
        products:productsList.productsList.filter( products =>
          products.type.indexOf(event.target.value) >= 0
        )
      });
    }
  }

  sortProducts = (event) => {
    const sort = event.target.value;
    console.log(event.target.value);

    if (event.target.value === "latest") {
      this.setState({
        products: productsList.productsList
      });
    }
    else {
      this.setState( state => ({
        sort,
        products: this.state.products
          .slice()
          .sort((a, b) => {
            let sortBy = 0
            if (sort === 'lowest') {
              sortBy = a.price > b.price ? 1 : -1
            }
            else if (sort === 'highest') {
              sortBy = a.price < b.price ? 1 : -1
            }
            return sortBy
          })
      }));
    }
  }



  render() {
    return (
      <div className="content">
        <div className="main">
          <Filter
            count={this.state.products.length}
            type={this.state.type}
            sort={this.state.sort}
            filterProducts={this.filterProducts}
            sortProducts={this.sortProducts}
          />
          <Products products={this.state.products}/>
        </div>
        <div className="sidebar">
          Cart Items
        </div>
      </div>
    )
  }
}
