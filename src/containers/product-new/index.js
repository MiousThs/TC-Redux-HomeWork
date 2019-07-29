import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addNewProduct } from '../../actions/products.action';

class ProductCreation extends Component{
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            price: 0,
            available: 0
        }
        this.submit = this.submit.bind(this);
    }
    submit(e) {
        e.preventDefault();
        console.log(this.props.products);
        this.props.addNewProduct({
            name: this.state.name,
            price: this.state.price,
            available: this.state.available
        });
        this.props.history.push('/products');
    }

    render() {
        return (
            <div className="product-creation">
                <form className="product-form" onSubmit={ this.submit }>
                    <div>
                        <h2>Product name:</h2>
                        <input type="text" onChange={ (e) => { this.setState({name: e.target.value}) } } />
                    </div>
                    <div>
                        <h2>Product price:</h2>
                        <input type="number" min='0' onChange={ (e) => { this.setState({price: +e.target.value}) } } />
                    </div>
                    <div>
                        <h2>Product amount:</h2>
                        <input type="number" min='0' onChange={ (e) => { this.setState({available: +e.target.value}) } }/>
                    </div>
                    <button>Add</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => ({...state})
const mapDispatchToProps = dispatch => ({
    addNewProduct: payload => dispatch(addNewProduct(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductCreation);