import "./Header.scss";

import React, { useEffect } from "react";
import { useState, useContext } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

import { Context } from "../../utils/context";
import Cart from "../Cart/Cart";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();
    const {
        screenSize,
        cartCount,
        showCart,
        setShowCart,
        productRef,
    } = useContext(Context);
    const [isMenuBarOpen, setIsMenuBarOpen] = useState(screenSize.width > 1024);

    useEffect(
        () => setIsMenuBarOpen(screenSize.width > 1024),
        [screenSize.width]
    );

    return (
        <>
            <div className={"main-header"}>
                <div className="header-content">
                    <div className="logo">
                        <div
                            className="heading"
                            onClick={() => navigate("/FarmersHaat/")}
                        >
                            Farmers Haat
                        </div>
                        <div
                            className="menu-button"
                            onClick={() => {
                                setIsMenuBarOpen(!isMenuBarOpen);
                            }}
                        >
                            {isMenuBarOpen ? (
                                <AiOutlineClose />
                            ) : (
                                <AiOutlineMenu />
                            )}
                        </div>
                    </div>
                    {isMenuBarOpen && (
                        <ul className="center">
                            <li
                                onClick={() => {
                                    navigate("/FarmersHaat/products");
                                }}
                            >
                                Product
                            </li>
                            <li
                                onClick={() => {
                                    navigate("/FarmersHaat/aboutus");
                                }}
                            >
                                About Us
                            </li>
                            <li
                                onClick={() => {
                                    navigate("/FarmersHaat/footer");
                                }}
                            >
                                Contact Us
                            </li>
                            <li onClick={() => setShowCart(!showCart)}>Cart</li>
                        </ul>
                    )}
                    {isMenuBarOpen && (
                        <div className="right">
                            <button className="button">Sign In</button>
                        </div>
                    )}
                </div>
            </div>
            {showCart && <Cart setShowCart={setShowCart} />}
        </>
    );
};

export default Header;
