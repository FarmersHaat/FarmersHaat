import React from "react";
import "./Description.scss";

import DisplayPic from "../../assets/SanjayBatta.jpg";

const Description = () => {
	return (
		<div className="desc">
			<div className="content">
				<div className="textContent">
					<h1 className="heading">About Farmers Haat</h1>
					<p className="topPara">
						The company has been formed with the sole aim to provide
						purest form of edible oil which you deserve and we are
						honest to the core keeping in mind the health of our
						countrymen and at the same time uplifting the condition
						of our small marginal farmers and saving precious
						foreign exchange used to import of edible oil by selling
						indigenously grown and extracted edible oil in
						traditional way by wood pressed method. The people
						behind it are drawn from different fields like Research
						in Rapeseed and Mustard, Medicine, dietician, Qualified
						Chef and Creativity and have long experience in their
						respective fields.
					</p>
					<h1 className="heading">Company Profile</h1>
					<h2 className="subHeading">Mission</h2>
					<p className="secondTop">
						It is seen that most of marginal farmers are being
						exploited by the middle person and we at Farmers Haat
						striving to ensure that they get remunerative price of
						their produce. At the same time we provide most
						hygienically extracted purest form of edible oil to our
						consumer.
					</p>
					<h2 className="subHeading">Our Strength </h2>
					<p className="secondTop">
						Our team consist of most dedicated professionals to
						accomplish our mission.
					</p>
				</div>
				<div className="cardContent">
					<div className="card">
						<img
							src={DisplayPic}
							alt="Sanjay Batta"
							className="diplayPic"
						/>
						<div className="name">Mr. Sanjay Batta</div>
						<div className="position">
							CEO, Farmers Haat Agrotech
						</div>
						<div className="education">BSc., LL.B</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Description;
