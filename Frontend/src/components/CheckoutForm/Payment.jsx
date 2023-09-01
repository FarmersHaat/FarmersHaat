import React, { useContext, useEffect, useRef } from "react";
import { Context } from "../../utils/context";
import "./Payment.scss";
import Loading from "../../assets/Loading Animation/1475.gif";

const Payment = () => {
	const { response } = useContext(Context);
	const formRef = useRef(null);
	useEffect(() => {
		formSubmit();
	}, []);
	const formSubmit = async () => {
		formRef.current.submit();
	};
	return (
		<div>
			<h1 className="heading">Please don't refresh this page</h1>

			<div className="loadingAnimation">
				<img src={Loading} alt="" />
			</div>
			<form ref={formRef} method="POST" action={response.txn_url}>
				<input
					type="hidden"
					name="merchantRequest"
					value={response.merchantRequest}
				/>
				<input type="hidden" name="MID" id="MID" value={response.MID} />
			</form>
		</div>
	);
};

export default Payment;
