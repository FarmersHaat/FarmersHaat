import React, { useContext, useEffect, useRef, useState } from "react";
import { Context } from "../../utils/context";
import axios from "axios";

const Payment = () => {
	const { response } = useContext(Context);
	const formRef = useRef(null);
	useEffect(() => {
		formSubmit();
	}, []);
	const formSubmit = async () => {
		formRef.current.submit();
		// await axios({
		// 	method: "post",
		// 	url: response.txn_url,
		// 	data: {
		// 		merchantRequest: response.merchantRequest,
		// 		MID: response.MID,
		// 	},
		// 	headers: { "Content-Type": "multipart/form-data" },
		// })
		// 	.then((response) => console.log(response))
		// 	.catch((error) => console.log(error));
	};
	return (
		<div>
			<h1>Please don't refresh this page</h1>
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
