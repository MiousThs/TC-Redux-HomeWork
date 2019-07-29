import React, {Component} from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';


import Cart from './containers/cart';
import ProductList from './containers/product-list';
import ProductCreation from './containers/product-new';
import { fetchData } from './actions/data.action';

import './App.css';

class App extends Component {

  componentDidMount() {
    this.props.dispatch(fetchData());
  }

  render() {

    if (this.props.loading) {
      <div>Loading...</div>
    }

    if (this.props.error) {
      <div>{ this.props.error.message }</div>
    }

    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <div className="App-header-title">
              <Link to="/products">
                <h1 className="App-title">My simple shop</h1>
              </Link>
            </div>
            <div className="App-header-cart">
              <Link to="/products/new"><button>New product</button></Link>
              <div className="cart-amount">
                <Link to="/cart">
                  <h1>Cart:</h1>
                </Link>
                <h1> { this.props.inCart.length }</h1>
              </div>
            </div>
          </header>
          <div className="App-wrapper">
            <div className="App-sidebar">
              <nav className="App-sidebar-nav">
                <ul>
                  <li>
                    <NavLink to="/cart" activeClassName="selected" className="navLinks">Cart</NavLink>
                  </li>
                  <li>
                    <NavLink to="/products" activeClassName="selected" className="navLinks">Product list</NavLink>
                  </li>
                </ul>
              </nav>
            </div>
            <Route path="/cart" component={ Cart } />
            <Route exact path="/products" component={ ProductList } />
            <Route path="/products/new" component={ ProductCreation } />
          </div>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => ({ ...state });

export default connect(mapStateToProps)(App);