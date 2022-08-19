import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart } from '../store/cart';
import AddCartHelper from './AddCartHelper';

const ProductsView = ({ products, cart, lineItems, addToCart }) => {

    return (
        <section className="products-view">
            <ul className="products-list">
                {
                    products.map(product => {
                        const item = lineItems.find(_item => _item.productId === product.id) || {quantity: 1};
                        return (
                            <li key={ product.id }>
                                <div>
                                    <img src={ product.imgUrl } width='240' height='160'/>
                                </div>
                                <AddCartHelper addToCart={ addToCart } product={ product } lineItems={ lineItems }/>
                            </li>
                        )
                    })
                }
            </ul>
        </section>
    )
};
const mapState = state => {
    return {
        products: state.products,
        cart: state.cart,
        lineItems: state.cart.lineItems
    }
};
const mapDispatch = dispatch => {
    return {
        addToCart: (product, quantity) => {
            dispatch(addToCart(product, quantity));
        }
    }
};
export default connect(mapState, mapDispatch)(ProductsView);