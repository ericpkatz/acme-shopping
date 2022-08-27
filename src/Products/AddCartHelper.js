import React, { Fragment, useState } from "react";

const AddCartHelper = ({ singleProduct, addToCart, product, lineItems }) => {
  console.log(singleProduct);
  let [quantity, setQuantity] = useState(1);
  const handleSubmit = (product, quantity) => {
    const item = lineItems.find((item) => item.productId === product.id);
    if (item) {
      quantity += item.quantity;
      addToCart(product, quantity);
      setQuantity(1);
    } else {
      addToCart(product, quantity);
      setQuantity(1);
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
