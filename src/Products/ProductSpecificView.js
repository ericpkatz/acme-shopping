import React from 'react';
import { connect } from 'react-redux';
import { updateCartItem, addToCart } from '../store';

class ProductSpecificView extends React.Component {
    constructor(){
        super();
        this.state = {
            cartItem: {},
            product: {},
            currentOrder: {},
            quantity: 1
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount(){
        console.log('will mount');
        this.setState({
            product: this.props.product,
            cartItem: this.props.cartItem,
            quantity: this.props.cartItem.quantity,
            currentOrder: this.props.currentOrder
        });
        console.log('did mount');
    }
    handleSubmit(ev){
        ev.preventDefault();
        const { product, cartItem, currentOrder, quantity } = this.state;
        if(cartItem){
            updateCartItem(cartItem, quantity, product);
        } else {
            addToCart( currentOrder, quantity, product);
        }
    };
    render(){
        const { product, quantity } = this.state;
        const { handleSubmit } = this;
        return (
            <section className="product-specific-view">
                <div className="product-image">
                    { product.imgUrl }
                </div>
                <div className="product-info">
                    { product.name }<br />
                    { product.description }<br />
                    ${ product.price }<br />
                    <input onChange={ (ev) => this.setState({quantity: ev.target.value})}>{ quantity }</input>
                    <button type="submit" onClick={ (ev) => handleSubmit(ev)}>Add to Cart</button>
                </div>
                <div className="product-review">
                    REVIEWS:
                    No one has written a review yet! Be the first one!
                </div>
            </section>
        )
    }
};
const mapState = ( state, { match } ) => {
    const user = state.auth;
    const currentOrder = state.orders.find(order => order.isCart === true && order.userId === user.id) || {};
    const product = state.products.find(product => product.id === match.params.id*1) || {};
    const cartItem = state.lineItems.find(lineItem => lineItem.orderId === currentOrder.id && lineItem.productId === product.id) || {};
    return {
        product,
        currentOrder,
        cartItem
    }
};
const mapDispatch = dispatch => {
    return {
        updateCartItem: (cartItem, quantity, product) => {
            dispatch(updateCartItem(cartItem, quantity, product))
        },
        createCartItem: ( currentOrder, quantity, product) => {
            dispatch(createCartItem( currentOrder, quantity, product))
        }
    }
};
export default connect(mapState, mapDispatch)(ProductSpecificView);