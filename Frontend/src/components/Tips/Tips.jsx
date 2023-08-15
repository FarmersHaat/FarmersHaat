import "./Tips.scss";

import React, { useContext } from "react";

import Tip from "./Tip/Tip";
import { Context } from "../../utils/context";

const Tips = () => {
    const { tipsRef } = useContext(Context);
    return (
        <div className="tips" ref={tipsRef}>
            <h1 className="heading">
                Nurturing Mustard Oil: Practical Tips for Home Use
            </h1>
            <div className="content">
                <div className="top">
                    <Tip
                        title={"Proper Heating Technique"}
                        desc={`To remove the pungent aroma, heat the oil until light smoke emerges from it. This process helps enhance the flavor and aroma, making it more enjoyable for cooking`}
                    />
                    <Tip
                        title={"Store Away from Strong Odors"}
                        desc={`Keep your mustard oil away from strong-smelling substances in your pantry to prevent any cross-contamination and preserve its natural aroma.`}
                    />
                </div>
                <div className="middle">
                    <Tip
                        title={"Usage of Pure Mustard Oil"}
                        desc={`Use mustard oil in appropriate quantities as pure oil is denser and is used less as compared with other refined oil and it absorbs less and make your tummy light.`}
                    />
                    <Tip
                        title={"Pungent order"}
                        desc={`Mustard oil has a pungent odour and perhaps this is the reason why insects avoid it. Hence it is used as an insect repellant in sprays and also keeps away ants and mosquitoes.`}
                    />
                </div>
                <div className="bottom">
                    <Tip
                        title={"Avoid Excessive Exposure"}
                        desc={`Protect your mustard oil from excessive heat, light, and air exposure. Keep it in cool and dark place to preserve its quality, nutrients intact and also it helps in extending its shelf life.`}
                    />
                    <Tip
                        title={"Optimal Storage"}
                        desc={`We pack it in Pet bottle which reaches you within 6/7days if you feel like you can store your mustard oil in glass bottles or steel utensils to maintain its freshness and prevent any potential interaction with plastic containers.`}
                    />
                </div>
            </div>
        </div>
    );
};

export default Tips;
