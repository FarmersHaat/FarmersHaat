import "./Product.scss";

import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../../utils/context";

const Product = ({ product }) => {
	const navigate = useNavigate();
	const { handleAddToCart, setShowCart } = useContext(Context);
	const price = Math.round(
		((1 - product.attributes.discount / 100) * product.attributes.price)*1.05);

	return (
		<div
			className="product-card"
			onClick={() =>
				navigate(
					`${process.env.REACT_APP_INITIAL_DOMAIN}/product/${product.id}`
				)
			}>
			<div className="thumbnail">
				<img src={product.attributes.imgUrl} alt="" />
			</div>

			<div className="product-details">
				<span className="name">{product.attributes.title}</span>
				<span className="desc">{product.attributes.desc}</span>
				<button
					className="button"
					onClick={() => {
						handleAddToCart(product, 1);
						setShowCart(true);
					}}>
					Buy Now →
				</button>
			</div>

			{product.attributes.discount!==0?
			<div className="offerPrice">
				<div className="discount">
					Flat {product.attributes.discount}% off
				</div>
				<div className="originalPrice">
					₹{product.attributes.price}
					{".00"}
				</div>
				<div className="currentPrice">
					₹{price}
					{".00"}
				</div>
				<div className="quantity">1 litre</div>
				<div className="shipping">
					Inclusive of Taxes + Free Shipping
				</div>
			</div>
				:
				<div className="offerPrice">
				
				<div className="originalPrice">
					₹{product.attributes.price}
					{".00"}
				</div>
				<div className="currentPrice">
					₹{product.attributes.discountedPrice}
					{".00"}
				</div>
				<div className="shipping">
					Inclusive of Taxes + Free Shipping
				</div>
			</div>
			}
		</div>
	);
};

export default Product;
