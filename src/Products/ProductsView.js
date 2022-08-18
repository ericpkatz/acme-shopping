import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart } from '../store/cart';

const ProductsView = ({ products, addToCart }) => {
    const [quantity, setQuantity] = useState(1);
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
                                        <input type='number' name='quantity' value={ quantity } onChange={ (e) => setQuantity(e.target.value)} />
                                        <button onClick={() => addToCart(product, quantity)}>Add to Cart</button>
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