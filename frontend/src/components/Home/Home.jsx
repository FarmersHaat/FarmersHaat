import "./Home.scss";

import React, { useContext } from "react";
import Farmer from "../../assets/Farmer.png";

import { Context } from "../../utils/context";

import Products from "../Products/Products";
import Advantages from "../Advantages/Advantages";
import AboutUs from "../About Us/AboutUs";

const Home = () => {
    const { screenSize } = useContext(Context);
    return (
        <div className="homepage">
            <div className="hero-section">
            <div className="content">
                <div className="text-content">
                    <h1 className="heading">
                        Experience the Pureness of Wood Pressed Mustard Oil
                    </h1>
                    <p className="desc">
                        We are committed to provide your family cooking medium
                        with the utmost purity and honesty to the core - Believe
                        us. Pure mustard oil offers the ideal balance of Omega-3
                        and Omega-6 fatty acids, crucial for reducing the risk
                        of heart disease. It also contains disease-fighting
                        antioxidants, which the body cannot produce in
                        sufficient quantities through normal metabolism.
                        <br />
                        <br />
                        {screenSize.width > 1024 &&
                            `To maintain good health of your family, it is necessary
                        to obtain these essential fats and antioxidants from
                        food. Some experts argue that pure mustard oil surpasses
                        olive oil due to its ideal fatty acid ratio, which is
                        missing in olive oil. Furthermore, pure mustard oil has
                        a high smoke point, making it an excellent choice for
                        frying, with an added benefit of being more
                        cost-effective.`}
                    </p>
                </div>
                <div className="image">
                    <img src={Farmer} alt="Farmer" />
                </div>
            </div>
            </div>
            <Products />
            <Advantages />
            <AboutUs />
        </div>
    );
};

export default Home;
