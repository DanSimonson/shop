import React, { Component } from 'react';
import './App.css';
import Products from './components/Products';
import Basket from './components/Basket'
import axios from 'axios';
import { Provider } from 'react-redux'
import store from './store'
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cartItems: [],
      products: [],
      isLoading: false,
      noData: 'loading...'
    }
  }
  componentWillMount() {
    this.getData()
  }
  getData = () => {
    axios.get('http://localhost:4000/products')
      .then((response) => {
        // handle success
        console.log(response);
        this.setState({
          products: response.data
        }, () => {
          this.setState({ isLoading: true })
        })
      })
      .catch((error) => {
        // handle error
        console.log(error);
      })
    if (localStorage.getItem('cartItems')) {
      this.setState({
        cartItems: JSON.parse(localStorage.getItem('cartItems'))
      })
    }
  }
  handleAddToCart = (e, product) => {
    this.setState(state => {
      const cartItems = state.cartItems;
      let productAlreadyInCart = false;

      cartItems.forEach(cp => {
        if (cp.id === product.id) {
          cp.count += 1;
          productAlreadyInCart = true;
        }
      });

      if (!productAlreadyInCart) {
        cartItems.push({ ...product, count: 1 });
      }
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      return { cartItems: cartItems };
    });
  }
  handleRemoveFromCart = (e, item) => {
    this.setState(state => {
      const cartItems = this.state.cartItems.filter(el => el.id !== item.id)
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      return { cartItems: cartItems }
    })
  }

  render() {
    return (
      <Provider store={store}>
        <div className="container">
          <h1>Ecommerce Shopping Cart Application</h1>
          <hr />
          <div className='row'>
            <div className="col-md-8">
              {this.state.isLoading ? <Products products={this.state.products} handleAddToCart={this.handleAddToCart} /> : this.state.noData}
            </div>
            <div className="col-md-4">
              <Basket cartItems={this.state.cartItems} handleRemoveFromCart={this.handleRemoveFromCart} />
            </div>
          </div>
        </div>
      </Provider>
    );
  }
}

export default App;
