import React, {Component} from 'react';
import {connect} from 'react-redux';

import './product-list.css';
import { addItemToCart } from '../../actions/cart.actions';
import { sortByName, sortByPrice, sortByAvailability } from '../../actions/products.action';

export class ProductList extends Component {
  constructor(props) {
    super(props);

    this.addToCart = this.addToCart.bind(this);
    this.sort = this.sort.bind(this);
  }

  componentWillMount() {
    this.props.sortByName();
  }

  sort(e) {
    switch (e.target.value) {
      case 'byName':
        this.props.sortByName();
        break;
      case 'byPrice':
        this.props.sortByPrice();
        break;
      case 'byAvailability':
        this.props.sortByAvailability();
        break;
      default:
        break
    }
  }


  renderProducts() {
    return (
      <div>
        <select name="sortSelect" onChange={ this.sort } defaultValue="byName">
          <option value="byName">Sort by name</option>
          <option value="byPrice">Sort by price</option>
          <option value="byAvailability">Sort by availability</option>
        </select>
        { this.props.products.map((i, index) => (
            <div className="product_list_item" key={index}>
              <p>{i.name}</p>
              <p>Price: {i.price}</p>
              <p>{i.available > 0 ? 'In stock' : 'Sold out'}</p>
              { !!i.available && <button className="add-to-cart-btn" onClick={() => this.addToCart(i.name)}>Add to card</button>}
            </div>
          ))}
      </div>
    )
  }

  addToCart(target) {
    this.props.addItemToCart(target);
  }

  render() {
    return (<div className="App-product_list">
      {this.renderProducts()}
    </div>);
  }
}

const mapStateToProps = state => ({...state});
const mapDispatchToProps = dispatch => ({
  addItemToCart: (target) => dispatch(addItemToCart(target)),
  sortByName: () => dispatch(sortByName()),
  sortByPrice: () => dispatch(sortByPrice()),
  sortByAvailability: () => dispatch(sortByAvailability())
})

export default connect(mapStateToProps,mapDispatchToProps)(ProductList);