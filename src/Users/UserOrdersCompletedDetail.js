//Chloe: list all orders completed
// add on user profile view
import React, {useEffect} from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

    
const UserOrdersCompletedView = ({order,total}) => {

 
    return (

    <div>
    <p>Order No.:{order.id}</p>
    <table className="table">
    <tbody>
    <tr>
            <th></th>
            <th>Items</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total</th>
    </tr>
    {
        (order.lineItems||[]).map( lineItem => {
        let total = lineItem.product.price * lineItem.quantity;
            return (
            
            <tr key={lineItem.id}>
             <td>
                  <img src={lineItem.product.imgUrl} width="120" height="80" />
                </td>
           <Link to={`products/${lineItem.product.id}`}>
                    {lineItem.product.name}
                  </Link>
           <td> {lineItem.quantity} </td>
            <td>${lineItem.product.price}</td>
            <td>${total && total.toFixed(2)}</td>
            </tr>
            )
        })
     }
    <tr>
        <td></td>
        <td></td>
        <td></td>
        <td>Total:</td>
        <td>${total}</td>
    </tr>
    </tbody>
    </table>
    <button><Link to='../'>Go Back</Link></button>
    </div>
    
    )
};

const mapState = (state, { match }) => {
    let order = state.orders.find((order) => order.id === 1 * match.params.id) ||
      {};
  
  const subtotalArr = (order.lineItems || []).map(
    (lineItem) => lineItem.product.price * 1 * lineItem.quantity
  );
  const calculateSum = () => {
    return subtotalArr.reduce((total, current) => {
      return total + current;
    }, 0);
  };
  return {
    order,
     total:calculateSum().toFixed(2)
  };
};

export default connect(mapState)(UserOrdersCompletedView);