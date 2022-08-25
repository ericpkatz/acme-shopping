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
        console.log(this.state)
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
    render(){
        const { name, description, price, ml, limit, imgUrl} = this.state;
        const { onChange, handleSubmit } = this;
        const { auth, product } = this.props;
        if(auth.isAdmin){
            return (
                <section className='side'>
                    <h3>{ product.id ? 'UPDATE PRODUCT FORM' : 'NEW PRODUCT FORM'}</h3>
                    <form onSubmit={ handleSubmit }>
                        <label>Name:
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
                                cols='50'
                                rows='5'
                                name='description'
                                value={ description }
                                onChange={ onChange }
                                required
                                />
                        </label>
                        <label>Price:
                            <input
                                type='number'
                                name='price'
                                value={ price }
                                onChange={ onChange }
                                required
                            />
                        </label>
                        <label>ML:
                            <input
                                type='number'
                                name='ml'
                                value={ ml }
                                onChange={ onChange }
                                required
                            />
                        </label>
                        <label>Limit:
                            <input
                                type='number'
                                name='limit'
                                value={ limit }
                                onChange={ onChange }
                                required
                            />
                        </label>
                        <label>ImageUrl:
                            <input
                                type='text'
                                name='imgUrl'
                                value={ imgUrl }
                                onChange={ onChange }
                                required
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
    console.log(match)
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