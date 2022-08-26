import React from "react";
import { connect } from "react-redux";
import { updateCart } from '../store/cart';
import AddCartHelper from "./AddCartHelper";

const ProductSpecificView = ({ product , addToCart, lineItems }) => {
    const openForm = () => {
        document.getElementById("main-app").style.marginRight = '350px';
        document.getElementById('product-form').style.width = '300px';
    }
    return (
        <div className="main">
            <div className="product-image">
                <img src={ product.imgUrl } width='240' height='160'/>
            </div>
            <div>
            { product.name }<br />
            { product.description }<br />
            ML: { product.ml }<br />
            ${ product.price }<br />
                <AddCartHelper addToCart={ addToCart } product={ product } lineItems={ lineItems } />
            </div>
            <button onClick={() => openForm()} className='open-form-btn'>Edit Product</button>
        </div>
    )
}
const mapState = (state, { match }) => {
    return {
        product: state.products.find(product => product.id === 1 * match.params.id) || {},
        lineItems: state.cart.lineItems
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