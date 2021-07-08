import React, { Component } from 'react';

import { formatCurrency } from '../../util';

import './Cart.css';

class Cart extends Component {

  constructor(props) {
    super(props);
    this.state = {
      cartItems: []
    }
  }



  render() {
    const cartItems = this.props.cartItems;

    let cart_header =
      <div className="cart cart-header">
        Cart is empty
      </div>

    if (cartItems.length !== 0) {
      cart_header =
        <div className="cart cart-header">
          You have {cartItems.length}
          {cartItems.length === 1 ? " item " : " items "}
          in the cart{" "}
        </div>
    }


    let cart_items =
      <div className="cart">
        <ul className="cart-items">
          {cartItems.map(item => (
            <li key={item.id}>

              <div>
                <img src={item.image_url} alt={item.title}/>
              </div>

              <div>
                {item.title}
              </div>

              <div className="right">
                {formatCurrency(item.price)} x {item.count}{" "}

                <button  className="button"
                  onClick={() => this.props.removeFromCart(item)}>
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

    {console.log(cartItems)}
    let cart_total = cartItems.length !== 0 &&
      <div className="cart">
        <div className="total">
          <div>
            Total:{" "}
            {formatCurrency(
              cartItems.reduce( (a, c) => a + (c.price * c.count), 0 )
            )}
          </div>
          <button className="button primary">Buy</button>
        </div>
      </div>


    return (
      <>
        <div>
          {cart_header}
        </div>
        <div>
          {cart_items}
        </div>
        <div>
          {cart_total}
        </div>
      </>
    );
  }
}

export default Cart;