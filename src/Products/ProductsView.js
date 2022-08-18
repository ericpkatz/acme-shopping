import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart } from '../store/cart';

const ProductsView = ({ products, cart, lineItems, addToCart }) => {
    let [quantity, setQuantity] = useState([]);
    const handleSubmit = (product, quantity) => {
        addToCart(product, quantity);
        quantity = setQuantity(1);
    }
    return (
        <section>
            <div className="products-view">
                <ul>
                    {
                        products.map(product => {
                            return (
                                <li key={ product.id }>
                                    <div>
                                        <img src={ product.imgUrl } width='240' height='160'/>
                                    </div>
                                    <div>
                                        <Link to={`/products/${product.id}`}>{ product.name }</Link><br />
                                        ${ product.price }<br />
                                        <button onClick={() => setQuantity(quantity - 1)}>-</button>
                                        <button onClick={ () => setQuantity(quantity + 1)}>+</button>
                                        <button onClick={() => handleSubmit(product, quantity)}>Add to Cart</button>
                                        <button>Add to WishList</button>
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
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