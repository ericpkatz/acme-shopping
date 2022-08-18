//Chloe: list all orders completed
// add on user profile view
import React from "react";
import { connect } from 'react-redux';


    
    const UserOrdersCompleted = ({auth}) => {
    return (

<ul>
    {
      (auth.orderId||[]).map( orderValue => {
        return (
          <li key={ orderValue.id }>
            Order NO. { orderValue.id }
          </li>
            )
      })
    }
    </ul>
    
    )
};

export default connect(state => state)(UserOrdersCompleted);