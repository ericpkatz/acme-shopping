import React, { Fragment, useState } from "react";


const AddCartHelper = ({singleProduct, addToCart, product, lineItems}) => {
    let [quantity, setQuantity] = useState(1);
    const handleSubmit = (product, quantity) => {
        const item = lineItems.find(item => item.productId === product.id);
        if(item){
          quantity += item.quantity;
            setQuantity(quantity);
        }
        if(quantity < product.limit || quantity === product.limit){
          addToCart(product, quantity)
          setQuantity(1);
        } else {
          if(product.limit === 0){
            alert('Sold Out! Check back again later!')
            setQuantity(1);
          } else {
           alert(`We only have ${product.limit} left!`)
           setQuantity(1);
          }
        }
  };
  return singleProduct ? (
    <Fragment>
      <div>
        <button
          onClick={() => setQuantity(quantity - 1)}
          disabled={quantity === 1}
        >
          -
        </button>

        <span>{quantity}</span>
        <button onClick={() => setQuantity(quantity + 1)}>+</button>
      </div>
      <button
        onClick={() => handleSubmit(product, quantity)}
        className="addToCart-btn"
      >
        Add to Cart
      </button>
    </Fragment>
  ) : (
    <div className="addCart-div">
      <button
        onClick={() => setQuantity(quantity - 1)}
        disabled={quantity === 1}
      >
        -
      </button>
      <span>{quantity}</span>
      <button onClick={() => setQuantity(quantity + 1)}>+</button>
      <br />
      <button
        onClick={() => handleSubmit(product, quantity)}
        className={"addToCart-btn"}
      >
        Add to Cart
      </button>
      {/* <button>Add to WishList</button> */}
      {/* {auth.isAdmin === true ? <button>x</button> : null} */}
    </div>
  );
};
export default AddCartHelper;
