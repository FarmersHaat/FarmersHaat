import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import SingleProduct from "./components/SingleProduct/SingleProduct";
import Description from "./components/Description/Description";
import PrivacyPolicy from "./components/Privacy/PrivacyPolicy";
import PaymentVerified from "./components/PaymentVerify/PaymentVerified";
import PaymentUnverified from "./components/PaymentVerify/PaymentUnverified";
function App() {
	return (
		<BrowserRouter>
			<Header />
			<Routes>
				<Route
					path={`${process.env.REACT_APP_INITIAL_DOMAIN}/`}
					element={<Home scrollTo={"none"} />}
				/>
				<Route
					path={`${process.env.REACT_APP_INITIAL_DOMAIN}/products`}
					element={<Home scrollTo={"products"} />}
				/>
				<Route
					path={`${process.env.REACT_APP_INITIAL_DOMAIN}/aboutus`}
					element={<Home scrollTo={"aboutus"} />}
				/>
				<Route
					path={`${process.env.REACT_APP_INITIAL_DOMAIN}/contactus`}
					element={<Home scrollTo={"contactus"} />}
				/>
				<Route
					path={`${process.env.REACT_APP_INITIAL_DOMAIN}/product/:id`}
					element={<SingleProduct />}
				/>
				<Route
					path={`${process.env.REACT_APP_INITIAL_DOMAIN}/benefits`}
					element={<Home scrollTo={"benefits"} />}
				/>
				<Route
					path={`${process.env.REACT_APP_INITIAL_DOMAIN}/desc`}
					element={<Description />}
				/>
				<Route
					path={`${process.env.REACT_APP_INITIAL_DOMAIN}/policy`}
					element={<PrivacyPolicy />}
				/>
				<Route
					path={`${process.env.REACT_APP_INITIAL_DOMAIN}/payment/verified`}
					element={<PaymentVerified />}
				/>
				<Route
					path={`${process.env.REACT_APP_INITIAL_DOMAIN}/payment/unverified`}
					element={<PaymentUnverified />}
				/>
			</Routes>
			<Footer />
		</BrowserRouter>
	);
}

export default App;
