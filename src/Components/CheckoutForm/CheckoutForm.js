import React, { useState } from 'react';

import './CheckoutForm.css';

const CheckoutForm = props => {
  let [ email, setEmail ] = useState('');
  let [ name, setName ] = useState('');
  let [ address, setAddress ] = useState('');

  return(
    <form onSubmit={e => props.createOrder(e, email, name, address)}>
      <ul className="form-container">

        <li>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={email}
            required
            onChange={e => setEmail(e.target.value)}
          />
        </li>

        <li>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={name}
            required
            onChange={e => setName(e.target.value)}
          />
        </li>

        <li>
          <label>Address</label>
          <input
            type="text"
            name="address"
            value={address}
            required
            onChange={e => setAddress(e.target.value)}
          />
        </li>

        <li>
          <button className="button primary"
            type="submit"
          >
            Checkout
          </button>
        </li>
      </ul>
    </form>
  );
}

export default CheckoutForm;