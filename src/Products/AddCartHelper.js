import React, { useState } from 'react';

const AddCartHelper = ({addToCart, product, lineItems}) => {
    let [quantity, setQuantity] = useState(1);
    const handleSubmit = (product, quantity) => {
        console.log(product)
        const item = lineItems.find(item => item.productId === product.id);
        if(item){
            setQuantity(quantity + item.quantity)
            if(quantity < product.limit){
                addToCart(product, quantity)
                setQuantity(1);
            } else {
                if(product.limit === 0){
                    alert('Sold Out! Check back again later!')
                } else {
                    alert(`We only have ${product.limit} left!`);
                }
            }
        }
        if(quantity < product.limit*1){
            addToCart(product, quantity)
            setQuantity(1);
        } else {
            alert(`We only have ${item.limit} left!`);
        }
    }
    return (
        <div className="addCart-div">
            <button onClick={() => setQuantity(quantity - 1)} disabled={quantity === 1}>-</button>
            <span>{ quantity }</span>
            <button onClick={ () => setQuantity(quantity + 1)}>+</button><br />
            <button onClick={() => handleSubmit(product, quantity)} className="addToCart-btn">Add to Cart</button>
            {/* <button>Add to WishList</button> */}
            {/* {auth.isAdmin === true ? <button>x</button> : null} */}
        </div>
    )
};
export default AddCartHelper;