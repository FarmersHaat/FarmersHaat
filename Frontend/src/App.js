import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import SingleProduct from "./components/SingleProduct/SingleProduct";
import Description from "./components/Description/Description";
import PrivacyPolicy from "./components/Privacy/PrivacyPolicy";
import Terms from "./components/Terms/Terms";
import Disclaimer from "./components/Disclaimer/Disclaimer";
import CheckoutForm from "./components/CheckoutForm/CheckoutForm";
import Payment from "./components/CheckoutForm/Payment";
import PaymentVerified from "./components/PaymentVerify/PaymentVerified";
import PaymentUnverified from "./components/PaymentVerify/PaymentUnverified";
import AppContext from "./utils/context";
import { Toaster } from "react-hot-toast";
import ReactGA from 'react-ga4'

function App() {
	ReactGA.initialize(process.env.REACT_APP_TRACKING_ID_1);
	ReactGA.initialize(process.env.REACT_APP_TRACKING_ID_2);
	ReactGA.send({ hitType: 'pageview', page: "/" });
	return (
		<BrowserRouter>
			<AppContext>
				<Toaster />
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
						path={`${process.env.REACT_APP_INITIAL_DOMAIN}/tips`}
						element={<Home scrollTo={"tips"} />}
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
						path={`${process.env.REACT_APP_INITIAL_DOMAIN}/terms`}
						element={<Terms />}
					/>
					<Route
						path={`${process.env.REACT_APP_INITIAL_DOMAIN}/disclaimer`}
						element={<Disclaimer />}
					/>
					<Route
						path={`${process.env.REACT_APP_INITIAL_DOMAIN}/checkout`}
						element={<CheckoutForm />}
					/>
					<Route
						path={`${process.env.REACT_APP_INITIAL_DOMAIN}/payment`}
						element={<Payment />}
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
			</AppContext>
		</BrowserRouter>
	);
}

export default App;
