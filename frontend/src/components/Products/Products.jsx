import './Products.scss';

import React from 'react'
import Product from './Product/Product';

const Products = () => {
    return (
        <div className="product-container">
            <div className="products">
                {/* {products?.data?.map((product) => { */}
                {/* return ( */}
                    <Product />
                    <Product />
                {/* ); */}
                {/* })} */}
            </div>
        </div>
    );
}

export default Products