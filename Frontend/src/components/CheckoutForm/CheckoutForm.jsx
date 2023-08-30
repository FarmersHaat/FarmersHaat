import "./CheckoutForm.scss";

import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

import UseAnimations from "react-useanimations";
import loading from "react-useanimations/lib/loading";
import { Context } from "../../utils/context";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CheckoutForm = () => {
	const navigate = useNavigate();

	const [locationSet, setLocationSet] = useState(false);

	const { handlePayment, userData, setUserData, setResponse } =
		useContext(Context);
	const [buttonState, setButtonState] = useState({
		isLoading: false,
		isDisabled: true,
	});

	const getLocation = async () => {
		setButtonState({
			isLoading: true,
			isDisabled: true,
		});
		await axios
			.get(`https://api.postalpincode.in/pincode/${userData.zipcode}`)
			.then((response) => {
				setButtonState((prev) => ({
					...prev,
					isLoading: false,
				}));
				setUserData((prevData) => {
					return {
						...prevData,
						city: response?.data?.[0]?.PostOffice?.[0]?.Block,
						state: response?.data?.[0]?.PostOffice?.[0]?.State,
					};
				});
				if (!response?.data?.[0]?.PostOffice)
					toast.error("Please enter correct postal code");

				setLocationSet(true);
			})
			.catch((error) => console(error));
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		setButtonState({
			isLoading: true,
			isDisabled: true,
		});
		await handlePayment()
			.then((res) => {
				setResponse(res);
				navigate(`${process.env.REACT_APP_INITIAL_DOMAIN}/payment`);
			})
			.catch((error) => console.log(error));
	};

	useEffect(() => {
		try {
			if (userData.zipcode.length === 6 && !locationSet) {
				getLocation();
			}
		} catch (error) {
			toast.error("Please enter correct postal code");
		}
		const {
			firstname,
			lastname,
			email,
			contact,
			address,
			state,
			city,
			zipcode,
		} = userData;
		if (
			firstname === "" ||
			lastname === "" ||
			email === "" ||
			contact === "" ||
			address === "" ||
			state === "" ||
			city === "" ||
			zipcode === ""
		) {
			setButtonState({
				isLoading: false,
				isDisabled: true,
			});
		} else {
			setButtonState({
				isLoading: false,
				isDisabled: false,
			});
		}
	}, [userData]);
	const handleChange = (event) => {
		setUserData((prevData) => {
			return {
				...prevData,
				[event.target.name]: event.target.value,
			};
		});

		if (event.target.name === "zipcode") setLocationSet(false);
	};

	return (
		<div className="checkoutForm">
			<div className="content">
				<div className="form">
					<div className="name">
						<input
							type="text"
							placeholder="First Name"
							className="firstname"
							name="firstname"
							onChange={handleChange}
							value={userData.firstname}
						/>
						<input
							type="text"
							placeholder="Last Name"
							className="lastname"
							name="lastname"
							onChange={handleChange}
							value={userData.lastname}
						/>
					</div>
					<input
						type="email"
						placeholder="Email"
						className="email"
						name="email"
						onChange={handleChange}
						value={userData.email}
					/>
					<input
						type="tel"
						placeholder="Contact"
						className="phoneNo"
						name="contact"
						maxLength={10}
						onChange={handleChange}
						value={userData.contact}
					/>
					<textarea
						type="text"
						placeholder="Address"
						className="address"
						name="address"
						rows={3}
						onChange={handleChange}
						value={userData.address}
					/>
					<input
						type="text"
						placeholder="Pincode"
						className="pincode"
						pattern="\d*"
						maxLength={6}
						onChange={handleChange}
						value={userData.zipcode}
						name="zipcode"
					/>
					<div className="location">
						<input
							type="text"
							placeholder="City"
							className="city"
							onChange={handleChange}
							value={userData.city}
							name="city"
							disabled={true}
						/>
						<input
							type="text"
							placeholder="State"
							className="state"
							onChange={handleChange}
							value={userData.state}
							name="state"
							disabled={true}
						/>
					</div>
					<button
						disabled={buttonState.isDisabled}
						type="submit"
						className="submit"
						onClick={handleSubmit}>
						{buttonState.isLoading ? (
							<UseAnimations
								animation={loading}
								strokeColor="#F8F7F1"
							/>
						) : (
							"Submit"
						)}
					</button>
				</div>
			</div>
		</div>
	);
};

export default CheckoutForm;
