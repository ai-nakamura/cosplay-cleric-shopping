import { connect } from "react-redux";
import Fade from 'react-reveal/Fade';
import Modal from 'react-modal';
import React, { Component } from 'react';
import Zoom from 'react-reveal/Zoom';
// TODO: Make my own Zoom

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
    this.props.fetchProducts();
  }

  openModal = product => {
    this.setState({ product });
  }
  closeModal = () => {
    this.setState({ product: null });
  }

  render() {
    const { product } = this.state;

    const listOfProducts =
      !this.props.products
        ? <div>loading...</div>
        : this.props.products.map(product => (
          <li key={product._id}>
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

export default connect(
  state => ({
    products: state.products.filteredItems
  }),
  {
    fetchProducts,
  }
)(Products);
