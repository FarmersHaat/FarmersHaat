import "./Footer.scss";

import React, { useContext, useState } from "react";
import { Context } from "../../utils/context";
import {
	FaInstagram,
	FaFacebook,
	FaTwitter,
	FaYoutube,
	FaPhoneAlt,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import axios from "axios";
const Footer = () => {
	const params = {
		headers: {
			Authorization: `bearer ${process.env.REACT_APP_STRAPI_APP}`,
		},
	};

	const [details, setDetails] = useState({
		name: "",
		email: "",
		query: "",
	});

	const handleChange = (event) => {
		setDetails((prevDetails) => ({
			...prevDetails,
			[event.target.name]: event.target.value,
		}));
	};
	console.log(process.env.REACT_APP_NODE_ENV);
	const handleSubmit = async (event) => {
		event.preventDefault();
		await axios
			.post(
				(process.env.REACT_APP_NODE_ENV === "DEVELOPMENT"
					? process.env.REACT_APP_DEV_URL
					: process.env.REACT_APP_PRODUCTION_URL) + "/api/query/sendEmail/",
				{ details: details },
				params
			)
			.then((data) =>
				setDetails({
					name: "",
					email: "",
					query: "",
				})
			)
			.catch((error) => console.log(error));
	};

	console.log(details);

	const { footerRef } = useContext(Context);
	return (
		<div className="footer" ref={footerRef}>
			<div className="content">
				<div className="textContent">
					<div className="logo">Farmers haat</div>
					<div className="desc">
						If you have any concerns about your shipment, contact
						our support team at care@farmershaat.com within 48 hours
						of receiving the products.
						<br /> In the event of damaged or wrong products, you
						can return them within 7 days of delivery by emailing
						care@farmershaat.com with photos of the invoice,
						product, and order number. We will respond within 48
						hours to arrange a replacement.
						<br />
						<br /> For prepaid orders, refunds will be initiated
						within 7 working days upon receiving the refund request.
						To cancel an order before shipping, email
						care@farmershaat.com, and we'll assist you.
					</div>
				</div>

				<div className="contactInfo">
					<div className="contactUs">Contact Us</div>
					<input
						type="text"
						className="name"
						placeholder="Name"
						name="name"
						value={details.name}
						onChange={handleChange}
					/>
					<input
						type="email"
						className="email"
						placeholder="Email"
						name="email"
						value={details.email}
						onChange={handleChange}
					/>
					<textarea
						type="textarea"
						className="query"
						placeholder="Query"
						name="query"
						rows={5}
						value={details.query}
						onChange={handleChange}
					/>
					<button
						type="submit"
						className="submit"
						onClick={handleSubmit}>
						Submit
					</button>
				</div>

				<div className="socialMedia">
					<FaFacebook />
					<FaInstagram />
					<FaTwitter />
					<FaYoutube />
					<MdEmail />
					<FaPhoneAlt />
				</div>
			</div>
		</div>
	);
};

export default Footer;
