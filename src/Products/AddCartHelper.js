import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AddCartHelper = ({addToCart, product, lineItems}) => {
    let [quantity, setQuantity] = useState(1);
    const handleSubmit = (product, quantity) => {
        const item = lineItems.find(item => item.productId === product.id);
        if(item){
            quantity += item.quantity;
            addToCart(product, quantity)
            setQuantity(1);
        } else {
            addToCart(product, quantity);
            setQuantity(1);
        }
    }
    return (
        <div>
            <Link to={`/products/${product.id}`}>{ product.name }</Link><br />
            ${ product.price }<br />
            <button onClick={() => setQuantity(quantity - 1)} disabled={quantity === 1}>-</button>
            { quantity }
            <button onClick={ () => setQuantity(quantity + 1)}>+</button><br />
            <button onClick={() => handleSubmit(product, quantity)} className="addToCart-btn">Add to Cart</button>
            {/* <button>Add to WishList</button> */}
        </div>
    )
};
export default AddCartHelper;