import "./Terms.scss";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Terms1 from "../../assets/Terms/Terms & condition-1.webp"
import Terms2 from "../../assets/Terms/Terms & condition-2.webp"
import Terms3 from "../../assets/Terms/Terms & condition-3.webp"
import Terms4 from "../../assets/Terms/Terms & condition-4.webp"
import Terms5 from "../../assets/Terms/Terms & condition-5.webp"
import Terms6 from "../../assets/Terms/Terms & condition-6.webp"
import Terms7 from "../../assets/Terms/Terms & condition-7.webp"
import Terms8 from "../../assets/Terms/Terms & condition-8.webp"
const Terms = () => {
	const location = useLocation();
	useEffect(() => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	}, [location]);
	return (
		<div className="privacyPolicy">
			<div className="content">
				<img src={Terms1} alt="" />
				<img src={Terms2} alt="" />
				<img src={Terms3} alt="" />
				<img src={Terms4} alt="" />
				<img src={Terms5} alt="" />
				<img src={Terms6} alt="" />
				<img src={Terms7} alt="" />
				<img src={Terms8} alt="" />
			</div>
		</div>
	);
};

export default Terms;
