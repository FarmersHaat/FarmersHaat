import "./Advantage.scss";

import React from "react";
import GlowSkin from "../../../assets/Icons/skin.png";

const Advantage = ({heading,desc,img}) => {
    return (
        <div className="advantage">
            <div className="content">
                <div className="text-content">
                    <div className="heading">{heading}</div>
                    <div className="desc">{desc}</div>
                </div>
                <div className="image">
                    <img src={img} alt="" />
                </div>
            </div>
        </div>
    );
};

export default Advantage;
