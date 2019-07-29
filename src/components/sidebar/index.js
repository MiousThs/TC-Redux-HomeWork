import React from 'react';
import { BrowserRouter as Router ,Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import './sidebar.css';

// export const SideBar = (props) => {
//   return (<div className="App-sidebar">
//     <nav className="App-sidebar-nav">
//       <a onClick={() => props.changeNavigation('product-list')}>Product list</a>
//       <a onClick={() => props.changeNavigation('cart')}>Cart</a>
//     </nav>
//   </div>);
// };

export const SideBar = () => {
  return (
    <Router>
      <div className="App-sidebar">
        <nav className="App-sidebar-nav">
          <ul>
            <li>
              <Link to="/cart" activeClassName="active">Cart</Link>
            </li>
            <li>
              <Link to="/products">Product list</Link>
            </li>
          </ul>
        </nav>
      </div>
    </Router>);
};

export default withRouter(connect(mapStateToProps, {})(SideBar));