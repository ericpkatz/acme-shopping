import React from "react";
import { connect } from "react-redux";
import { updateCart } from '../store/cart';
import AddCartHelper from "./AddCartHelper";

const ProductSpecificView = ({ product , addToCart, lineItems }) => {
    return (
        <div className="product-specific-view">
            <div className="product-specific-view-img">
                <img src={ product.imgUrl } width='240' height='160'/>
            </div>
            <div>
                <AddCartHelper addToCart={ addToCart } product={ product } lineItems={ lineItems } />
                { product.description }<br />
            </div>
        </div>
    )
}

const mapState = (state, { match }) => {
    return {
        product: state.products.find(product => product.id === 1 * match.params.id) || {},
        lineItems: state.cart.lineItems,
    } 
}
const mapDispatch = dispatch => {
    return {
        addToCart: (product, quantity) => {
            dispatch(updateCart(product, quantity));
        }
    }
};

export default connect(mapState, mapDispatch)(ProductSpecificView);