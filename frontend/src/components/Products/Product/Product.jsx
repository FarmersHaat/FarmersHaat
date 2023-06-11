import "./Product.scss";

import MustartOilBottle from "../../../assets/Black Mustard Oil Bottle.png";

const Product = () => {

    return (
        <div className="product-card">
            <div className="thumbnail">
                <img src={MustartOilBottle} alt="" />
            </div>

            <div className="product-details">
                <span className="name">Black Mustard Oil - Wood Pressed</span>
                <span className="desc">
                    Pure and authentic, wood-pressed black mustard oil is
                    derived from carefully selected seeds, crushed and pressed
                    at low temperatures. It retains nutrients, a distinct aroma,
                    and a robust flavor, perfect for enhancing culinary
                    creations. Experience the richness of wood-pressed black
                    mustard oil.
                </span>
                <button className="button">Buy Now →</button>
            </div>
        </div>
    );
};

export default Product;
