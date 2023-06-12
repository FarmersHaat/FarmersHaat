import "./Tip.scss";

import React from "react";

const Tip = ({ title, desc }) => {
    return (
        <div className="tip">
            <div className="content">
                <div className="title">{title}</div>
                <div className="desc">{desc}</div>
            </div>
        </div>
    );
};

export default Tip;
