import { useContext } from "react";
import "./CartItem.scss";
import { MdClose } from "react-icons/md";
import { Context } from "../../../utils/context";

const CartItem = ({ cartItems }) => {
	const { handleRemoveFromCart, handleCartProductQuantity } =
		useContext(Context);
	return (
		<div className="cart-products">
			{cartItems.map((product) => {
				return (
					<div key={product.id} className="cart-product">
						<div className="img-container">
							<img src={product.attributes.imgUrl} alt="" />
						</div>
						<div className="prod-details">
							<span className="name">
								{product.attributes.title}
							</span>
							<MdClose
								className="close-btn"
								onClick={() => handleRemoveFromCart(product)}
							/>
							<div className="quantity-buttons">
								<span
									onClick={() =>
										handleCartProductQuantity(
											"dec",
											product
										)
									}>
									-
								</span>
								<span>{product.attributes.quantity}</span>
								<span
									onClick={() =>
										handleCartProductQuantity(
											"inc",
											product
										)
									}>
									+
								</span>
							</div>
							<div className="text">
								<span>{product.attributes.quantity}</span>
								<span>x</span>
								<span className="highlight">
									₹
									{product.attributes.quantity *
										product.attributes.discountedPrice}{".00"}
								</span>
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default CartItem;
