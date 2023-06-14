import "./Products.scss";

import React from "react";
import Product from "./Product/Product";
import { useContext, useEffect } from "react";
import { Context } from "../../utils/context";
import { fetchData } from "../../utils/api";

const Products = () => {
    const { products, setProducts , productRef } = useContext(Context);

    const getProducts = () => {
        fetchData("/api/products?populate=*")
            .then((res) => setProducts(res))
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        getProducts();
    },[]);

    return (
        <div className="product-container" ref={productRef}>
            <div className="products">
                {products?.data?.map((product) => {
                    return <Product key={product.id} product={product} />;
                })}
            </div>
        </div>
    );
};

export default Products;
