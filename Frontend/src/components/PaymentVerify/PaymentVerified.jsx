import "./PaymentStatus.scss";

import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../utils/context";

const PaymentVerified = () => {
	const { clearCart } = useContext(Context);
	useEffect(() => {
		clearCart();
		return clearCart();
	},[])
	// const { transactionID } = useContext(Context);
	const navigate = useNavigate();
	return (
		<div className="payment">
			<div className="content">
				<div className="card">
					<div className="title">Your order have been received</div>
					<img
						src="https://img.icons8.com/office/80/checked--v2.png"
						className="paymentStatus"
						alt=""
					/>
					<div className="subtext">Thank you for your purchase !</div>
					<div className="text">
						You will receive a confirmation email with
						details of your order
					</div>
					<button onClick={() => navigate("/products")}>
						Continue Shopping
					</button>
				</div>
			</div>
		</div>
	);
};

export default PaymentVerified;