import React, { Component } from 'react';

import Cart from '../../Components/Cart/Cart';
import Filter from '../../Components/Filter/Filter';
import productsList from "../../Components/Products/products.json";
import Products from '../../Components/Products/Products';

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

  /* filterProducts
   * Filter products by the item types
   */
  filterProducts = event => {
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

  /* sortProducts
   *
   * Sort products according to lowest or highest prices,
   * or by latest addition to products
   */
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
            if      (sort === 'lowest')  {sortBy = a.price > b.price ? 1 : -1}
            else if (sort === 'highest') {sortBy = a.price < b.price ? 1 : -1}
            return sortBy
          })
      }));
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
    localStorage.setItem("cartItems", JSON.stringify(this.state.cartItems));
  }

  /* removeFromCart
   *
   * Remove an item from the cart by filtering out by product id
   * TODO: Make it so if there's more than one item of the type
   *  to be removed, decrease count instead of removing whole item
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
          <Filter
            count={this.state.products.length}
            type={this.state.type}
            sort={this.state.sort}
            filterProducts={this.filterProducts}
            sortProducts={this.sortProducts}
          />
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
