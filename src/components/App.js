import React from 'react';
import Inventory from './Inventory';
import Product from './Product';
import base from '../base';

class App extends React.Component {
  constructor() {
    super();

    this.addProduct = this.addProduct.bind(this);
    this.removeProduct = this.removeProduct.bind(this);
    this.updateProduct = this.updateProduct.bind(this);

    // getinitialState
    this.state = {
      products: {}
    };
  }
  componentWillMount(){
      this.ref = base.syncState(`/`, {
        context: this,
        state: 'products'
      })
  }
  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  addProduct(product) {
    // update our state
    const products = {...this.state.products};
    const timestamp = Date.now();
    products[`product-${timestamp}`] = product;
    this.setState({ products });
  }

  updateProduct(key, updatedProduct) {
    const products = {...this.state.products};
    products[key] = updatedProduct;
    this.setState({ products });
  }

  removeProduct(key) {
    const products = {...this.state.products};
    products[key] = null;
    this.setState({ products });
  }
  render() {
    return (
      <div className="product-page">
        <div className="menu">
          <ul className="list-of-products">
            {
              Object
                .keys(this.state.products)
                .map(key => <Product key={key} index={key} details={this.state.products[key]}/>)
            }
          </ul>
        </div>
        <Inventory
          addProduct={this.addProduct}
          removeProduct={this.removeProduct}
          products={this.state.products}
          updateProduct={this.updateProduct}
        />
        { console.log(this.state.products)}
      </div>
    )
  }
}

export default App;