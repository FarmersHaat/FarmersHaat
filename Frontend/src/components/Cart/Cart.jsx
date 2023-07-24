import "./Cart.scss";
import { MdClose } from "react-icons/md";
import { BsCartX } from "react-icons/bs";

import CartItem from "./CartItem/CartItem";
import CheckoutForm from "./CheckoutForm/CheckoutForm";
import { useContext, useState } from "react";
import { Context } from "../../utils/context";

import { makePaymentRequest } from "../../utils/api";
import { loadRazorpay } from "../../utils/loadrazorpay";

import hmacSHA256 from "crypto-js/hmac-sha256";
import { useNavigate } from "react-router-dom";

const Cart = ({ setShowCart }) => {
	const navigate = useNavigate();
	const { cartItems, cartSubtotal, setCartItems, setTransactionID } =
		useContext(Context);

	const [ isOpenCheckout, setIsOpenCheckout ] = useState(false);

	const clearCart = () => {
		setCartItems([]);
		window.sessionStorage.setItem("cartItem", []);
		setShowCart(false);
	};

	const handlePayment = async (userData) => {
		try {
			const { data } = await makePaymentRequest.post("/api/orders", {
				products: cartItems,
			});

			const razorpay = await loadRazorpay();

			const initPayment = (data) => {
				const options = {
					key: process.env.REACT_APP_RAZORPAY_KEY_ID,
					amount: data.amount,
					currency: data.currency,
					order_id: data.id,
					theme: "#FDB620",
					handler: async (response) => {
						const generatedSignature = hmacSHA256(
							`${response.razorpay_order_id}|${response.razorpay_payment_id}`,
							process.env.REACT_APP_RAZORPAY_SECRET_KEY
						).toString();
						if (
							generatedSignature === response.razorpay_signature
						) {
							await makePaymentRequest
								.post("/api/order/verify", {
									paymentData: response,
									userData: userData,
									productData: cartItems,
								})
								.then((isVerified) => {
									setTransactionID(
										response.razorpay_payment_id
									);
									if (isVerified) {
										clearCart();
										navigate("/payment/verified");
									} else {
										navigate("/payment/unverified");
									}
								})
								.catch((error) => console.log(error));
						}
					},
				};
				const rzp1 = new razorpay(options);
				rzp1.open();
			};

			initPayment(data.data);
		} catch (error) {
			console.log(error);
		}
	};

	return isOpenCheckout ? (
		<CheckoutForm
			handlePayment={handlePayment}
			setIsOpenCheckout={setIsOpenCheckout}
		/>
	) : (
		<div className="cart-panel">
			<div
				className="opac-layer"
				onClick={() => setShowCart(false)}></div>
			<div className="card-content">
				<div className="cart-header">
					<span className="heading">Shopping Cart</span>
					<span
						className="close-btn"
						onClick={() => setShowCart(false)}>
						<MdClose />
						<span className="text">Close</span>
					</span>
				</div>
				{cartItems?.[0] === undefined ? (
					<div className="empty-cart">
						<BsCartX />
						<span>No products in the cart.</span>
						<button
							className="return-cta"
							onClick={() => {
								setShowCart(false);
								navigate("/products");
							}}>
							RETURN TO SHOP
						</button>
					</div>
				) : (
					<>
						<CartItem cartItems={cartItems} />
						<div className="cart-footer">
							<div className="subtotal">
								<span className="text">Subtotal : </span>
								<span className="text total">
									₹{cartSubtotal}{".00"}
								</span>
							</div>
							<div className="button">
								<button
									className="checkout-cta"
									onClick={() => {
										setIsOpenCheckout(true);
									}}>
									Checkout
								</button>
							</div>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default Cart;
