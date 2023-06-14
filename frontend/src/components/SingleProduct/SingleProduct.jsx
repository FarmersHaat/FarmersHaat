import "./SingleProduct.scss";
import { useParams, useLocation } from "react-router-dom";

import { FaCartPlus } from "react-icons/fa";

import useFetch from "../../hooks/useFetch";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../utils/context";

import Bottle from "../../assets/ProductImg/BlackOil.jpeg";
import Loading from "../../assets/Loading Animation/1475.gif";

const SingleProduct = () => {
    const location = useLocation();
    const { id } = useParams();
    const [quantity, setQuantity] = useState(1);
    const { handleAddToCart, setShowCart } = useContext(Context);

    useEffect(() => {
        setTimeout(() => {
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        }, 100);
    }, [location]);

    const { data } = useFetch(`/api/products?populate=*&[filters][id]=${id}`);

    return (
        <div className="single-product-main-content">
            {data != undefined ? (
                <div className="layout">
                    <div className="single-product-page">
                        <div className="left">
                            <img
                                src={
                                    // process.env.REACT_APP_PRODUCTION_URL +
                                    // data?.data?.[0]?.attributes?.img.data[0]
                                    //     .attributes.url
                                    Bottle
                                }
                                alt=""
                            />
                        </div>
                        <div className="right">
                            <div className="name">
                                {data?.data?.[0]?.attributes?.title}
                            </div>
                            <div className="desc">
                                {data?.data?.[0]?.attributes?.desc}
                            </div>
                            <div className="price">
                                <div className="saving">
                                    You Saved &#8377;
                                    {data?.data?.[0]?.attributes?.price -
                                        data?.data?.[0]?.attributes
                                            ?.discountedPrice}
                                </div>
                                &#8377;{" "}
                                {data?.data?.[0]?.attributes?.discountedPrice}
                                <span className="original-price">
                                    {"  "}&#8377;
                                    {data?.data?.[0]?.attributes?.price}
                                </span>
                                <span className="discount">
                                    {"   " +
                                        data?.data?.[0]?.attributes?.discount +
                                        "% off"}
                                </span>
                            </div>

                            <div className="cart-buttons">
                                <div className="quantity-buttons">
                                    <span
                                        onClick={() =>
                                            setQuantity((prev) =>
                                                prev > 1 ? prev - 1 : prev
                                            )
                                        }
                                    >
                                        -
                                    </span>
                                    <span>{quantity}</span>
                                    <span
                                        onClick={() =>
                                            setQuantity((prev) => prev + 1)
                                        }
                                    >
                                        +
                                    </span>
                                </div>
                                <button
                                    className="add-to-cart-button"
                                    onClick={() => {
                                        handleAddToCart(data.data[0], quantity);
                                        setQuantity(1);
                                        setShowCart(true);
                                    }}
                                >
                                    <FaCartPlus size={20} />
                                    ADD TO CART
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="loadingAnimation">
                    <img src={Loading} alt="" />
                </div>
            )}
        </div>
    );
};

export default SingleProduct;
