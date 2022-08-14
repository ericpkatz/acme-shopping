import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class ProductsView extends React.Component {
    constructor(){
        super();
        this.state = {
            products: [],
            quantity: 1
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount(){
        this.setState({
            products: this.props.products
        })
    }
    handleSubmit(e){
        e.preventDefault();
    }
    render(){
        const { products, quantity } = this.state;
        const { handleSubmit } = this;
        return (
            <section>
                <div className="products-view">
                    <ul>
                        {
                            products.map(product => {
                                return (
                                    <li key={ product.id }>
                                        <div>
                                            { product.imgUrl }
                                        </div>
                                        <div>
                                            <Link to={`/products/${product.id}`}>{ product.name }</Link><br />
                                            { product.price }<br />
                                        <button>Quick Add</button>
                                        <button>Add to WishList</button>
                                        </div>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </section>
        )
    }
}
const mapState = state => {
    return {
        products: state.products
    }
};
const mapDispatch = dispatch => {
    return {

    }
};
export default connect(mapState, mapDispatch)(ProductsView);