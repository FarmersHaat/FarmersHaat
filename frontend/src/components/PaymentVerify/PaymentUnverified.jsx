import './PaymentStatus.scss'

import React from 'react'
import { useNavigate } from 'react-router-dom';


const PaymentUnverified = () => {
    const navigate = useNavigate();
	return (
		<div className="payment">
			<div className="content">
				<div className="card">
					<div className="title">Payment Failed!</div>
					<img src="https://img.icons8.com/color/80/000000/cancel--v1.png" className="paymentStatus" alt="" />
					<div className="subtext">Sorry we were unable to verify your payment</div>
					{/* <div className="refernceNumber">
						Your Reference Id : 1234567890
					</div> */}
					<div className="text">
						Please contact us at {" "}
						<a href="mailto:care@farmershaat.com">
							care@farmershaat.com
						</a>{" "} in case of any issues.
					</div>
					<button onClick={() => navigate("/products")}>
						Continue Shopping
					</button>
				</div>
			</div>
		</div>
	);
}

export default PaymentUnverified


