import "./Advantages.scss";

import React from "react";
import Advantage from "./Advantage/Advantage";

const Advantages = () => {
    const heading = "Glowing Sking";
    const desc = "Mustard oil promotes glowing skin through its moisturizing and antioxidant properties, nourishing and protecting the skin for a radiant complexion";

    return (
        <div className="advantages">
            <div className="content">
                <h1 className="title">
                    Discover the Health and Culinary Advantages of Wood-Pressed
                    Mustard Oil
                </h1>
                <div className="adv-grid">
                    <Advantage heading={heading} desc={desc}/>
                    <Advantage heading={heading} desc={desc}/>
                    <Advantage heading={heading} desc={desc}/>
                    <Advantage heading={heading} desc={desc}/>
                    <Advantage heading={heading} desc={desc}/>
                    <Advantage heading={heading} desc={desc}/>
                    <Advantage heading={heading} desc={desc}/>
                    <Advantage heading={heading} desc={desc}/>
                    <Advantage heading={"sdjfajkfnakjsfnaskn njd ksadn naslf alskf adfans fdans fkasnf "} desc={desc} />
                </div>
            </div>
        </div>
    );
};

export default Advantages;
