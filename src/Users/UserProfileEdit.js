import React, {Component} from "react";
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { updateUser } from '../store/auth';

class UserProfileEdit extends Component {
    
    constructor(){
        super();
        this.state = {
            email:'',
            imageUrl:'',
            address:''
        }
        this.update = this.update.bind(this);
    }
    
    async update(e){
 //       e.preventDefault();
        console.log("This State")
        console.log(this.state);
        const information = {email: this.state.email, imageUrl: this.state.imageUrl, address:this.state.address };
        console.log(`Generate data from component`);
        console.log(information);
        try {
            console.log(`Transfer data from component`);
            console.log(information);
            await this.props.update(information);
        }
        catch(ex){
        console.log(ex);
        }
    }
    
    componentDidMount(){
    this.setState({email: this.props.auth.email, imageUrl:this.props.auth.imageUrl, address:this.props.auth.address  });
    }

  
  render(){
        const { email, imageUrl, address } = this.state;
        const { update } = this;
    return (
 <section>
   <div>
    <h1>
    {this.props.auth.username}
    </h1>
     <img src={this.props.auth.imageUrl} />
    <p>
    Email:{this.props.auth.email}
    </p>
    <p>
    Address:{this.props.auth.address}
    </p>
    </div>
                <h2>Update Profile</h2>
                <form onSubmit={ update }>
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