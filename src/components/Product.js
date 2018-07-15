import React from 'react';

class Product extends React.Component {
  render() {
    const  details  = this.props.details;
    return (
      <li className="menu-product">
        
          {JSON.stringify(details.name)}
         
      </li>
    )
  }
}

export default Product;
