import "./Products.scss";

import React from "react";
import Product from "./Product/Product";
import { useContext, useEffect } from "react";
import { Context } from "../../utils/context";
import { fetchData } from "../../utils/api";
import UseAnimations from "react-useanimations";
import loading2 from "react-useanimations/lib/loading2";
import PureImg from "../../assets/Pure.jpg";

const Products = () => {
	const { products, setProducts, productRef } = useContext(Context);

	const getProducts = () => {
		fetchData("/api/products?populate=*")
			.then((res) => setProducts(res))
			.catch((error) => console.log(error));
	};

	useEffect(() => {
		getProducts();
	}, []);

	return (
		<div className="product-container" ref={productRef}>
			<img src={PureImg} alt="" className="pureTag" />
			<div className="products">
				{products?.data ? (
					products.data?.map((product) => {
						return <Product key={product.id} product={product} />;
					})
				) : (
					<UseAnimations
						animation={loading2}
						className="loading"
						size={40}
					/>
				)}
			</div>
		</div>
	);
};

export default Products;
