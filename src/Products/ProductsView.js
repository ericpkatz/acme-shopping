import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateCart } from '../store/cart';
import AddCartHelper from './AddCartHelper';
//new product button wll enable form on side
const ProductsView = ({ products, auth, lineItems, addToCart }) => {
    const openForm = () => {
        document.getElementById("main-app").style.marginRight = '350px';
        document.getElementById('product-form').style.width = '300px';
    }
    return (
        <section id="products" className="main">
            {
                auth.isAdmin ?
                <button onClick={() => openForm()} className='open-form-btn'>&#9776; Add New Product</button>
                : null
            }
            <ul className="products-list">
                {
                    products.map(product => {
                        return (
                            <li key={ product.id } className="product">
                                <div>
                                    <img src={ product.imgUrl } width='100%' height='50%'/>
                                    <Link to={`/products/${product.id}`}>{ product.name }</Link><br />
                                    ${ product.price }<br />
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
        auth: state.auth,
        products: state.products,
        lineItems: state.cart.lineItems
    }
};
const mapDispatch = dispatch => {
    return {
        addToCart: (product, quantity) => {
            dispatch(updateCart(product, quantity));
        }
    }
};
export default connect(mapState, mapDispatch)(ProductsView);