import React from 'react';
import { formatPrice } from '../helpers';

class Product extends React.Component {
  render() {
    const  details  = this.props.details;
    return (
      <li className="menu-product">
        
          {details.name.dk}
         
      </li>
    )
  }
}

export default Product;
