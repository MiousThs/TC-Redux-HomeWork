import React, {Component} from 'react';
import {connect} from 'react-redux';
import { addOneItemToCart, removeOneItemFromCart, removeFromCart } from '../../actions/cart.actions';

import './cart.css';

export class Cart extends Component {
  constructor(props) {
    super(props);
    this.plusButton = this.plusButton.bind(this);
    this.minusButton = this.minusButton.bind(this);
    this.showSummary = this.showSummary.bind(this);
  }

  plusButton = (i) => {
    if (this.props.products.filter(e => e.name === i.name)[0].available > 0) {
      return (<button onClick={ (e) => { this.props.addOneItemToCart(i.name)} }>+1</button>);
    }
    return;
  }

  minusButton = (i) => {
    if (this.props.inCart.filter(e => e.name === i.name)[0].amount > 1) {
      return (<button onClick={ (e) => { this.props.removeOneItemFromCart(i.name)} }>-1</button>);
    }
    return;
  }

  showSummary(e) {
    e.preventDefault();
    let summary = this.props.inCart.slice().reduce((acc, curr) => {
      return (acc + (curr.price * curr.amount));
    }, 0);
    alert(`Congratulations! You've spent ${summary}$`)
  }

  render() {
    return (!this.props.inCart.length) ? <p>No items yet</p> :
    (
      <div className="cart-wrapper">
        {this.props.inCart.map((i, index) => {return (
        <div className="App-cart" key={ index }>
          <div>
            <p>{ i.name }</p>
          </div>
          <div className="cart-btns">
            <p>{ i.amount }</p>
            { this.plusButton(i) }
            { this.minusButton(i) }
            <button onClick={ e => this.props.removeFromCart(i.name) }>delete</button>
          </div>
        </div>
      )} )}
      <button onClick={ this.showSummary }>Next</button>
    </div>)
  }
}

const mapStateToProps = state => ({...state});
const mapDispatchToProps = dispatch => ({
  addOneItemToCart: (target) => dispatch(addOneItemToCart(target)),
  removeOneItemFromCart: (target) => dispatch(removeOneItemFromCart(target)),
  removeFromCart: target => dispatch(removeFromCart(target))
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
