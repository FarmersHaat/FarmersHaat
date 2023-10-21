import { createContext, useState, useEffect, useRef } from "react";
import { makePaymentRequest } from "./api";
// import { loadRazorpay } from "./loadrazorpay";

// import hmacSHA256 from "crypto-js/hmac-sha256";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

export const Context = createContext();

const AppContext = ({ children }) => {
	const productRef = useRef(null);
	const aboutUsRef = useRef(null);
	const footerRef = useRef(null);
	const benefitsRef = useRef(null);
	const tipsRef = useRef(null);
	// const navigate = useNavigate();
	const localData =
		window.localStorage.getItem("userData") === "undefined"
			? null
			: window.localStorage.getItem("userData");
	const [screenSize, setScreenSize] = useState(getCurrentDimension());
	const [showCart, setShowCart] = useState(false);
	const [products, setProducts] = useState({ data: [] });
	const [cartItems, setCartItems] = useState(
		window.sessionStorage.getItem("cartItem")
			? JSON.parse(window.sessionStorage.getItem("cartItem"))
			: []
	);
	const [userData, setUserData] = useState(
		localData
			? JSON.parse(localData)
			: {
					firstname: "",
					lastname: "",
					email: "",
					contact: "",
					address: "",
					state: "",
					city: "",
					zipcode: "",
			  }
	);
	const [cartCount, setCartCount] = useState(0);
	const [cartSubtotal, setCartSubtotal] = useState(0);
	const [transactionID, setTransactionID] = useState(null);
	const [response, setResponse] = useState({
		txn_url: "",
		merchantRequest: "",
		MID: "",
	});

	useEffect(() => {
		let count = 0;
		let subtotal = 0;
		cartItems.forEach((product) => {
			count += product.attributes.quantity;
			{product.attributes.discount!==0?
			subtotal +=
				product.attributes.quantity *
				Math.round(
					(1 - product.attributes.discount / 100) *
						product.attributes.price *
						1.05
				);
			 :

			 subtotal +=
				product.attributes.quantity * product.attributes.discountedPrice;
			 
			}
		});

		setCartCount(count);
		setCartSubtotal(subtotal);
	}, [cartItems]);

	const handleAddToCart = (product, quantity) => {
		let items = [...cartItems];
		let index = items.findIndex((p) => p.id === product.id);
		if (index !== -1) items[index].attributes.quantity += quantity;
		else {
			product.attributes.quantity = quantity;
			items = [...items, product];
		}

		window.sessionStorage.setItem("cartItem", JSON.stringify(items));
		setCartItems(items);
	};

	const handleRemoveFromCart = (product) => {
		let items = [...cartItems];
		items = items.filter((p) => p.id !== product.id);
		window.sessionStorage.setItem("cartItem", JSON.stringify(items));
		setCartItems(items);
	};

	const handleCartProductQuantity = (type, product) => {
		let items = [...cartItems];
		let index = items.findIndex((p) => p.id === product.id);
		if (type === "inc") items[index].attributes.quantity += 1;
		else {
			if (items[index].attributes.quantity === 1) {
				handleRemoveFromCart(product);
				return;
			}
			items[index].attributes.quantity -= 1;
		}
		window.sessionStorage.setItem("cartItem", JSON.stringify(items));
		setCartItems(items);
	};

	function getCurrentDimension() {
		return {
			width: window.innerWidth,
			height: window.innerHeight,
		};
	}
	const handlePayment = async () => {
		window.localStorage.setItem("userData", JSON.stringify(userData));
		try {
			const {
				data: { txn_url, merchantRequest, MID },
			} = await makePaymentRequest.post("/api/orders", {
				products: cartItems,
				userData,
			});
			return { txn_url, merchantRequest, MID };
		} catch (error) {
			console.log(error);
			return error;
		}

		// try {
		// 	const { data } = await makePaymentRequest.post("/api/orders", {
		// 		products: cartItems,
		// 	});

		// 	const razorpay = await loadRazorpay();

		// 	const initPayment = (data) => {
		// 		const options = {
		// 			key: process.env.REACT_APP_RAZORPAY_KEY_ID,
		// 			amount: data.amount,
		// 			currency: data.currency,
		// 			order_id: data.id,
		// 			theme: "#FDB620",
		// 			handler: async (response) => {
		// 				const generatedSignature = hmacSHA256(
		// 					`${response.razorpay_order_id}|${response.razorpay_payment_id}`,
		// 					process.env.REACT_APP_RAZORPAY_SECRET_KEY
		// 				).toString();
		// 				if (
		// 					generatedSignature === response.razorpay_signature
		// 				) {
		// 					await makePaymentRequest
		// 						.post("/api/order/verify", {
		// 							paymentData: response,
		// 							userData: userData,
		// 							productData: cartItems,
		// 						})
		// 						.then((isVerified) => {
		// 							setTransactionID(
		// 								response.razorpay_payment_id
		// 							);
		// 							if (isVerified) {
		// 								clearCart();
		// 								navigate("/payment/verified");
		// 							} else {
		// 								navigate("/payment/unverified");
		// 							}
		// 						})
		// 						.catch((error) => console.log(error));
		// 				}
		// 			},
		// 		};
		// 		const rzp1 = new razorpay(options);
		// 		rzp1.open();
		// 	};

		// 	initPayment(data.data);
		// } catch (error) {
		// 	console.log(error);
		// }
	};

	const clearCart = () => {
		setCartItems([]);
		window.sessionStorage.setItem("cartItem", []);
		setShowCart(false);
	};

	useEffect(() => {
		const updateDimension = () => {
			setScreenSize(getCurrentDimension());
		};
		window.addEventListener("resize", updateDimension);

		return () => {
			window.removeEventListener("resize", updateDimension);
		};
	}, [screenSize]);

	return (
		<Context.Provider
			value={{
				screenSize,
				products,
				setProducts,
				clearCart,
				cartItems,
				setCartItems,
				cartCount,
				setCartCount,
				cartSubtotal,
				showCart,
				setShowCart,
				userData,
				setUserData,
				response,
				setResponse,
				transactionID,
				setTransactionID,
				setCartSubtotal,
				handleAddToCart,
				handleRemoveFromCart,
				handleCartProductQuantity,
				productRef,
				footerRef,
				aboutUsRef,
				benefitsRef,
				tipsRef,
				handlePayment,
			}}>
			{children}
		</Context.Provider>
	);
};

export default AppContext;
