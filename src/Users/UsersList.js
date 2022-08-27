import React from "react";
import { connect } from 'react-redux';


const UsersList = ({ users }) => {
    return (
        <section>
            <table className="table">
                <tbody>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Address</th>
                        <th>Username</th>
                        <th>Email</th>
                    </tr>
                    {
                        users ? users.map(user => {
                            return (
                                <tr key={ user.id }>
                                    <td>{ user.firstName }</td>
                                    <td>{ user.lastName }</td>
                                    <td>{ user.fullAddress }</td>
                                    <td>{ user.username }</td>
                                    <td>{ user.email }</td>
                                </tr>
                            )
                        }) : null
                    }
                </tbody>
            </table>
        </section>
    )
};
const mapState = state => {
    return {
        users: state.users
    }
};
export default connect(mapState)(UsersList);