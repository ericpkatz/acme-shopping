import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
const ProductsView = ({ products }) => {
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
        products: state.products
    }
};
const mapDispatch = dispatch => {
    return {

    }
};
export default connect(mapState, mapDispatch)(ProductsView);