import React, { Component } from 'react';
import Fade from 'react-reveal/Fade';

import CheckoutForm from '../CheckoutForm/CheckoutForm';
import { formatCurrency } from '../../util';

import './Cart.css';

class Cart extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showCheckout: false
    }
  }

  createOrder = (e, email, name, address) => {
    e.preventDefault();
    this.props.createOrder({email, name, address});
  }


  render() {
    const cartItems = this.props.cartItems;


    // cart header
    let cart_header =
      <div className="cart cart-header">
        Cart is empty
      </div>

    if (cartItems.length !== 0) {
      cart_header =
        <div className="cart cart-header">
          You have {cartItems.length}
          {cartItems.length === 1 ? " item " : " items "}
          in your cart{" "}
        </div>
    }


    // cart items
    let cart_items =
      <Fade left cascade>
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
      </Fade>


    // cart total
    let cart_total = cartItems.length !== 0 &&
      <div className="total">
        <div>
          Total:{" "}
          {formatCurrency(
            cartItems.reduce( (a, c) => a + (c.price * c.count), 0 )
          )}
        </div>
        <button className="button primary"
          onClick={() => {
            this.setState({ showCheckout: true });
          }}>
          Buy
        </button>
      </div>


    return (
      <div className="cart">
        <div>
          {cart_header}
        </div>
        <div>
          {cart_items}
        </div>
        <div>
          {cart_total}
        </div>
        <div>
          {this.state.showCheckout &&
            <CheckoutForm className="close-modal"
              createOrder={this.createOrder}
            />
          }
        </div>
      </div>
    );
  }
}

export default Cart;