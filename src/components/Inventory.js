import React from 'react';
import AddProductForm from './AddProductForm';
import base from '../base';

class Inventory extends React.Component {
  constructor() {
    super();
    this.renderInventory = this.renderInventory.bind(this);
    this.renderLogin = this.renderLogin.bind(this);
    this.authenticate = this.authenticate.bind(this);
    this.logout = this.logout.bind(this);
    // this.authHandler = this.authHandler.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      uid: null,
      owner: null
    }
  }

  componentDidMount() {
    base.onAuth((user) => {
      if(user) {
        this.authHandler(null, { user });
      }
    });
  }

  handleChange(e, key) {
    const product = this.props.products[key];
    // take a copy of that Product and update it with the new data
    const updatedProduct = {
      ...product,
      [e.target.name]: e.target.value
    }
    this.props.updateProduct(key, updatedProduct);
  }

  authenticate(provider) {
    console.log(`Trying to log in with ${provider}`);
    base.authWithOAuthPopup(provider, this.authHandler);
  }

  logout() {
    base.unauth();
    this.setState({ uid: null });
  }

  renderLogin() {
    return (
      <nav className="login">
        <h2>Inventory</h2>
        <p>Sign in to manage your store's inventory</p>
        <button className="github" onClick={() => this.authenticate('github')}>Log In with Github</button>
        <button className="facebook" onClick={() => this.authenticate('facebook')} >Log In with Facebook</button>
        <button className="twitter" onClick={() => this.authenticate('twitter')} >Log In with Twitter</button>
      </nav>
    )
  }

  renderInventory(key) {
    const product = this.props.products[key];
    return (
      <div className="fish-edit" key={key}>
        {/* <input type="text" name="name" value={product.name.dk} placeholder="Product Name DK" onChange={(e) => this.handleChange(e, key)} />
        <input type="text" name="name" value={product.name.pl} placeholder="Product Name PL" onChange={(e) => this.handleChange(e, key)} />
        <input type="text" name="name" value={product.name.en} placeholder="Product Name EN" onChange={(e) => this.handleChange(e, key)} /> */}

        {/* <select type="text" name="status" value={product.status} placeholder="Product Status" onChange={(e) => this.handleChange(e, key)}>
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select> */}

        {/* <textarea type="text" name="desc" value={product.desc.dk} placeholder="Product Desc DK" onChange={(e) => this.handleChange(e, key)}></textarea> */}
        {/* <textarea type="text" name="desc" value={product.desc.pl} placeholder="Product Desc PL" onChange={(e) => this.handleChange(e, key)}></textarea> */}
        {/* <textarea type="text" name="desc" value={product.desc.eb} placeholder="Product Desc EN" onChange={(e) => this.handleChange(e, key)}></textarea> */}
        {/* <input type="text" name="image" value={product.image} placeholder="Product Image" onChange={(e) => this.handleChange(e, key)}/> */}
        <div><pre>{JSON.stringify(product)}</pre></div>
        <button onClick={() => this.props.removeProduct(key)}>Remove Product</button>
      </div>
    )
  }

  render() {
    const logout = <button onClick={this.logout}>Log Out!</button>;

    // check if they are no logged in at all
    // if(!this.state.uid) {
    //   return <div>{this.renderLogin()}</div>
    // }

    // Check if they are the owner of the current store
    // if(this.state.uid !== this.state.owner) {
    //   return (
    //     <div>
    //       <p>Sorry you aren't the owner of this store!</p>
    //       {logout}
    //     </div>
    //   )
    // }

    return (
      <div>
        <h2>Inventory</h2>
        {logout}
        {Object.keys(this.props.products).map(this.renderInventory)}
        <AddProductForm addProduct={this.props.addProduct}/>
      </div>
    )
  }
}

export default Inventory;
