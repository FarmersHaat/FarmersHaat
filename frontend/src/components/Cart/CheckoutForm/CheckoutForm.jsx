import "./CheckoutForm.scss";

import React, { useState } from "react";
import axios from "axios";

import UseAnimations from "react-useanimations"
import loading from "react-useanimations/lib/loading"
import { MdClose } from "react-icons/md";


const CheckoutForm = ({ handlePayment, setIsOpenCheckout }) => {
    const [locationSet, setLocationSet] = useState(false);
	const [userData, setUserData] = useState({
        firstname: "",
		lastname: "",
		email: "",
		contact: "",
		address: "",
		state: "",
		city: "",
		zipcode: "",
    });
	const [isLoading, setIsLoading] = useState(false);
    
	const getLocation = async () => {
        await axios
        .get(`https://api.postalpincode.in/pincode/${userData.zipcode}`)
        .then(({ data }) => {
            setUserData((prevData) => {
                return {
                    ...prevData,
                    city: data[0].PostOffice[0].Region,
                    state: data[0].PostOffice[0].State,
                };
            });
            setLocationSet(true);
        })
        .catch((error) => console(error));
	};
    
	if (userData.zipcode.length === 6 && !locationSet) {
        getLocation();
	}
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        await handlePayment(userData);
        setIsOpenCheckout(false);
    };
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
							placeholder="Firstname"
							className="firstname"
							name="firstname"
							onChange={handleChange}
							value={userData.firstname}
						/>
						<input
							type="text"
							placeholder="Lastname"
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
						placeholder="Zipcode"
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
						disabled={isLoading}
						type="submit"
						className="submit"
						onClick={handleSubmit}>
						{isLoading ? <UseAnimations animation={loading} strokeColor="#F8F7F1"/> : "Submit"}
					</button>
				</div>
			</div>
		</div>
	);
};

export default CheckoutForm;
