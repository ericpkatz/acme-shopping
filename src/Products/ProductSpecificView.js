import React from "react";
import { connect } from "react-redux";
import { updateCart } from "../store/cart";
import AddCartHelper from "./AddCartHelper";

const ProductSpecificView = ({ singleProduct, product , addToCart, lineItems, auth }) => {
    const openForm = () => {
        document.getElementById("main-app").style.marginRight = '350px';
        document.getElementById("product-form").style.width = '300px';
    }
    return (
        <section className="main">
            <div className="product">
                <div className="image">
                    <img src={ product.imgUrl } width='100%' height='100%'/>
                </div>
                {
                    auth.isAdmin ?
                    <div className="info">
                        { product.name }<br />
                        { product.description }<br />
                        ML: { product.ml }<br />
                        ${ product.price }<br />
                        Only { product.limit } left!<br />
                        <button onClick={() => openForm()} className='open-form-btn'>Edit Product</button><br />
                        {product.limit ? <AddCartHelper addToCart={ addToCart } product={ product } lineItems={ lineItems }/> : 'Sold Out! Check back again later!'}
                    </div> :
                    <div className="info">
                        { product.name }<br />
                        { product.description }<br />
                        ML: { product.ml }<br />
                        ${ product.price }<br />
                        {product.limit ? <AddCartHelper addToCart={ addToCart } product={ product } lineItems={ lineItems }/> : 'Sold Out! Check back again later!'}
                </div>
                }
            </div>
        </section>
    )
}
const mapState = (state, { match }) => {
    return {
        product: state.products.find(product => product.id === 1 * match.params.id ) || {},
        lineItems: state.cart.lineItems,
         auth: state.auth
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
