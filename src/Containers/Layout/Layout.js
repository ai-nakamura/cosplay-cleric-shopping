import React, { Component } from 'react';

import Cart from '../../Components/Cart/Cart';
import Filter from '../../Components/Filter/Filter';
import Products from '../../Components/Products/Products';
import productsList from "../../Components/Products/products.json";

import './Layout.css';

export default class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: productsList.productsList,
      type: '',
      sort: '',
      cartItems: localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : []
    }
  }

  /* addToCart
   *
   * Add an item to the cart
   * If an item is already in the cart, increase the count
   * rather than add the item a second time
   * Also saves items to locaalstorage to persist across page refresh
   */
  addToCart = product => {
    const cartItems = this.state.cartItems.slice();
    let alreadyInCart = false;

    // check if we already have the item in the cart. If yes increase count
    cartItems.forEach( item => {
      if (item.id === product.id) {
        item.count++;
        alreadyInCart = true;
      }
    });

    // If we don't have it in the cart, add it to cartItems with count 1
    if (!alreadyInCart) {
      cartItems.push({
        ...product,
        count: 1
      });
    }

    // Save to setState and localstorage
    this.setState({
      cartItems: cartItems
    });
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }

  /* removeFromCart
   *
   * Remove an item from the cart by filtering out by product id
   */
  removeFromCart = product => {
    const cartItems = this.state.cartItems.slice();
    const cartItems_filtered = cartItems.filter( x => x.id !== product.id );
    this.setState({
      cartItems: cartItems_filtered
    });
    localStorage.setItem("cartItems", JSON.stringify(cartItems_filtered));
  }


  /* createOrder
   *
   * Put together the final order
   */
  createOrder = order => {
    alert("Place order for " + order.name);
  }


  render() {
    return (
      <div className="content">
        <div className="main">
          <Filter/>
          <Products
            products={this.state.products}
            addToCart={this.addToCart}
          />
        </div>
        <div className="sidebar">
          <Cart
            cartItems={this.state.cartItems}
            removeFromCart={this.removeFromCart}
            createOrder={this.createOrder}
          />
        </div>
      </div>
    )
  }
}
