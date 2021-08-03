import { connect } from "react-redux";
import Fade from 'react-reveal/Fade';
import Modal from 'react-modal';
import React, { Component } from 'react';
import Zoom from 'react-reveal/Zoom';
// TODO: Make my own Zoom HOC

import { fetchProducts } from "../../actions/productActions";
import { formatCurrency } from '../../util';

import './Products.css';


class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null
    };
  }

  componentDidMount() {
    console.log(this.props);
    // shows that this.props has fetchProducts(), but it doesn't call it in the next line
    // I have a console.log in the function itself that's never triggered
    // works when I take out the 'connect' bit
    // checked: spelling, servers are running, code is identical to teacher's
    this.props.fetchProducts();
    console.log(this.props);
  }

  openModal = product => {
    this.setState({ product });
  }
  closeModal = () => {
    this.setState({ product: null });
  }

  render() {
    const { product } = this.state;
    console.log(this.state);

    const listOfProducts =
      !this.props.products
        ? <div>loading...</div>
        : this.props.products.map(product => (
          <li key={product.id}>
            <div className="product">

              <a
                href={'#' + product._id}
                onClick={() => this.openModal(product)}
              >
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
        ))


    return (
      <div>
        <Fade bottom cascade>
          <ul className="products">
            {listOfProducts}
          </ul>
        </Fade>
        {product &&
          <Modal
            isOpen
            onRequestClose={this.closeModal}
            portalClassName="testing"
          >
            <Zoom style={{backgroundColor: "pink"}}>
              <button className="close-modal" onClick={this.closeModal}>
                close
              </button>

              <div className="product-details">
                <img src={product.image_url} alt={product.title} />
                <div className="product-details-description">
                  <p>
                    <strong>{product.title}</strong>
                  </p>
                  <p>
                    {product.description}
                  </p>
                  <p>
                    <p>Choose from the following{" "}</p>
                    {product.availableSizes.map( size => (
                      <span>
                        {" "}
                        <button className="button">{size}</button>
                      </span>
                    ))}
                  </p>
                </div>
              </div>
            </Zoom>
          </Modal>
        }
      </div>
    );
  }
}

// export default Products;
export default connect(
  (state) => ({ products: state.products.items }),
  {
    fetchProducts,
  }
)(Products);
