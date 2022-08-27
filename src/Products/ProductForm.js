import React from 'react';
import { connect } from 'react-redux';
import { createProduct, updateProduct } from '../store/products';

class ProductForm extends React.Component {
    constructor(){
        super()
        this.state = {
            name: '',
            description: '',
            price: 0,
            ml: 0,
            limit: 0,
            imgUrl: ''
        }
        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };
    componentDidMount(){
        this.setState({
            name: this.props.product.name,
            description: this.props.product.description,
            price: this.props.product.price,
            ml: this.props.product.ml,
            limit: this.props.product.limit,
            imgUrl: this.props.product.imgUrl
        })
    };

    componentDidUpdate(prevProps){
        if(!prevProps.product.id && this.props.product.id){
            this.setState({
                name: this.props.product.name,
                description: this.props.product.description,
                price: this.props.product.price,
                ml: this.props.product.ml,
                limit: this.props.product.limit,
                imgUrl: this.props.product.imgUrl
            })
        }
        if(prevProps.product.id && !this.props.product.id){
            this.setState({
                name: '',
                description: '',
                price: 0,
                ml: 0,
                limit: 0,
                imgUrl: ''
            })
        }
    };
    onChange(e){
        this.setState({[e.target.name]: e.target.value});
    };
    handleSubmit(e){
        e.preventDefault();
        if(this.props.product.id){
            this.props.updateProduct({...this.state}, this.props.product.id);
        } else {
            this.props.createProduct({...this.state});
            this.setState({
                name: '',
                description: '',
                price: 0,
                ml: 0,
                limit: 0,
                imgUrl: ''
            });
        }
    };
    closeForm(){
        document.getElementById("product-form").style.width = '0';
        document.getElementById("main-app").style.marginRight = '0';
    }
    render(){
        const { name, description, price, ml, limit, imgUrl} = this.state;
        const { onChange, handleSubmit, closeForm } = this;
        const { auth, product } = this.props;
        if(auth.isAdmin){
            return (
                <section className='side' id="product-form">
                    <button className="closebtn" onClick={() => closeForm()}>&times;</button>
                    <h3>{ product.id ? 'UPDATE PRODUCT FORM' : 'NEW PRODUCT FORM'}</h3>
                    <form onSubmit={ handleSubmit }>
                        <label>Name:<br />
                            <input
                                type='text'
                                name='name'
                                value={ name }
                                onChange={ onChange }
                                required
                            />
                        </label>
                        <label>Description:
                            <textarea
                                type='text'
                                cols='30'
                                rows='7'
                                name='description'
                                value={ description }
                                onChange={ onChange }
                                required
                                />
                        </label>
                        <label>Price:<br />
                            <input
                                type='number'
                                name='price'
                                value={ price }
                                onChange={ onChange }
                                required
                            />
                        </label>
                        <label>ML:<br />
                            <input
                                type='number'
                                name='ml'
                                value={ ml }
                                onChange={ onChange }
                                required
                            />
                        </label>
                        <label>Limit:<br />
                            <input
                                type='number'
                                name='limit'
                                value={ limit }
                                onChange={ onChange }
                                required
                            />
                        </label>
                        <label>ImageUrl:<br />
                            <input
                                type='text'
                                name='imgUrl'
                                value={ imgUrl }
                                onChange={ onChange }
                            />
                        </label>
                        <button type='submit'>{product.id ? 'Update Product' : 'Add Product'}</button>
                    </form>
                </section>
            )
        }
    }
};
const mapState = (state, { match } )=> {
    const product = state.products.find(product => product.id === match.params.id*1) || {
        name: '',
        description: '',
        price: 0,
        ml: 0,
        limit: 0,
        imgUrl: ''
    }
    return {
        product,
        auth: state.auth
    }
};
const mapDispatch = dispatch => {
    return {
        createProduct: (product) => {
            dispatch(createProduct(product))
        },
        updateProduct: (product, id) => {
            dispatch(updateProduct(product, id))
        }

    }
};
export default connect(mapState, mapDispatch)(ProductForm);