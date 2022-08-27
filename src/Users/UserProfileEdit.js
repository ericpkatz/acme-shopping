import React, {Component} from "react";
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { updateUser } from '../store/auth';

class UserProfileEdit extends Component {
    
    constructor(){
        super();
        this.state = {
            firstName:'',
            lastName:'',
            email:'',
            imageUrl:'',
            address:'',
            city:'',
            state:'',
            zipCode:''
        }
        this.update = this.update.bind(this);
    }
    
    async update(e){
 //       e.preventDefault();
        
        const information = {firstName:this.state.firstName, lastName:this.state.lastName, city:this.state.city, state:this.state.state, zipCode:this.state.zipCode, email: this.state.email, imageUrl: this.state.imageUrl, address:this.state.address };

        try {
            await this.props.update(information);
        }
        catch(ex){
        console.log(ex);
        }
    }
    
    componentDidMount(){
    this.setState({firstName:this.props.auth.firstName, lastName:this.props.auth.lastName, city:this.props.auth.city, state:this.props.auth.state, zipCode:this.props.auth.zipCode, email: this.props.auth.email, imageUrl:this.props.auth.imageUrl, address:this.props.auth.address  });
    }

  
  render(){
        const { firstName,lastName,city,state,zipCode, email, imageUrl, address } = this.state;
        const { update } = this;
    return (
 <section>
   <div>
    <h1>
    {this.props.auth.firstName} {this.props.auth.lastName}
    </h1>
     <img src={this.props.auth.imageUrl} />
    <p>
    Email:{this.props.auth.email}
    </p>
    <p>
    Address:{this.props.auth.address}, {this.props.auth.city}, {this.props.auth.state}, {this.props.auth.zipCode}
    </p>
    </div>
                <h2>Update Profile</h2>
                <form onSubmit={ update }>
                 <label>First Name:
                        <input
                            type='text'
                            name='firstName'
                            value={ firstName }
                            onChange={ ev => this.setState({ firstName: ev.target.value })}
                            required
                        />
                    </label>
                     <label>Last Name:
                        <input
                            type='text'
                            name='lastName'
                            value={ lastName }
                            onChange={ ev => this.setState({ lastName: ev.target.value })}
                            required
                        />
                    </label>
                    <label>Email:
                        <input
                            type='email'
                            name='email'
                            value={ email }
                            onChange={ ev => this.setState({ email: ev.target.value })}
                            required
                        />
                    </label>
                    <label>imageUrl:
                        <input
                            type='text'
                            name='imageUrl'
                            value={ imageUrl }
                            onChange={ ev => this.setState({ imageUrl: ev.target.value })}
                        />
                    </label>
                    <label>Address:
                        <input
                            type='text'
                            name='address'
                            value={ address }
                            onChange={ ev => this.setState({ address: ev.target.value })}
                            required
                        />
                    </label>
                       <label>City:
                        <input
                            type='text'
                            name='city'
                            value={ city }
                            onChange={ ev => this.setState({ city: ev.target.value })}
                            required
                        />
                    </label>
                       <label>State:
                        <input
                            type='text'
                            name='state'
                            value={ state }
                            onChange={ ev => this.setState({ state: ev.target.value })}
                            required
                        />
                    </label>
                       <label>Zipcode:
                        <input
                            type='text'
                            name='zipCode'
                            value={ zipCode }
                            onChange={ ev => this.setState({ zipCode: ev.target.value })}
                            required
                        />
                    </label>
                    <button type='submit'>Update Profile</button>
                    <button><Link to="/profile/edit/credentials"> Edit Login Info</Link></button>
                    <button><Link to='../profile'>Go Back</Link></button>
                </form>
            </section>
    
    )
  }
};

const mapStateToProps = (state) => {
    return { auth: state.auth };
};

const mapDispatch = (dispatch)=>{
    return{
        update:(auth)=>dispatch(updateUser(auth))    
    }
};

export default connect(mapStateToProps, mapDispatch)(UserProfileEdit);