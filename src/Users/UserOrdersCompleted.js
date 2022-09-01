//Chloe: list all orders completed
// add on user profile view
import React from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

    
    const UserOrdersCompleted = ({orders}) => {
    return (

<table className="table">
<tbody>
    <tr>
        <th >Order Number</th>
        <th >Order Date</th>
        <th ></th>
    </tr>
    {
      (orders||[]).map( orderValue => {
        return (
          <tr key={ orderValue.id }>
          <td>
          { orderValue.id }
          </td>
          <td>
          { orderValue.updatedAt.slice(0,10) }
          </td>
          <td>
          <button><Link to={`/profile/orders/${orderValue.id}`}>
           View Order Details </Link></button>
           </td>
          </tr>
          )
      })
    }
</tbody>
</table>
    )
};

export default connect(state => state)(UserOrdersCompleted);