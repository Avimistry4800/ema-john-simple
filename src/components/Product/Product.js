import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus } from '@fortawesome/free-solid-svg-icons'
import './Product.css'

const Product = (props) => {
    // console.log(props.product.name);
    const { img, name, seller, price, stock } = props.product;
    return (
        <div className="product">
            <div>
                <img src={img} alt="" />
            </div>
            <div>
                <h4 className="product-name">{name}</h4>
                <br />
                <p><small>By: {seller}</small></p>
                <p>${price}</p>
                <br />
                <p><small>Only {stock} left in stock - Order soon...</small></p>
                <br/>
                <button className = "add-to-cart-btn"
                 onClick={() => props.handleAddProduct(props.product)}
                > 
                <FontAwesomeIcon icon={faCartPlus} /> Add to cart</button>
            </div>

        </div>
    );
};

export default Product;