import React from 'react';

const ReviewItem = (props) => {
    const {name,quantity,key,price} = props.product;
    const reviewItemStyle={
            borderBottom: '1px solid lightgray',
            marginBottom:'5px',
            paddingBottom: '5px',
            marginLeft: '200px'
    };
    return (
        <div style={reviewItemStyle} className="reviev-item">
            <h4 className="product-name">{name}</h4>
            <p>Quantity{quantity}</p>
            <p><small>Price:{price}</small></p>
            <br/>
            <button 
                className="add-to-cart-btn" 
                onClick={() => props.handleRemoveProduct(key)}
            >Remove </button>
        </div>
    );
};

export default ReviewItem;