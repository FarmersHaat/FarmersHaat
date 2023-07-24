import "./Advantages.scss";

import React, { useContext, useEffect, useState } from "react";
import Advantage from "./Advantage/Advantage";
import { fetchData } from "../../utils/api";
import { Context } from "../../utils/context";

import UseAnimations from "react-useanimations";
import loading2 from "react-useanimations/lib/loading2";

const Advantages = () => {
	const { benefitsRef } = useContext(Context);
	const [benefits, setBenefits] = useState();
	const getBenefits = async () => {
		fetchData("/api/advantages?populate=*")
			.then((data) => setBenefits(data))
			.catch((error) => console.log(error));
	};

	useEffect(() => {
		getBenefits();
	}, []);

	return (
		<div className="advantages" ref={benefitsRef}>
			<div className="content">
				<h1 className="title">
					Discover the Health and Culinary Advantages of Wood-Pressed
					Mustard Oil
				</h1>
				{!benefits?.data ? (
					<UseAnimations
						animation={loading2}
						className="loading"
						size={40}
					/>
				) : (
					<div className="adv-grid">
						{benefits?.data?.map((benefit) => (
							<Advantage
								key={benefit.id}
								heading={benefit.attributes.title}
								desc={benefit.attributes.desc}
								img={benefit.attributes.imgUrl}
							/>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default Advantages;
