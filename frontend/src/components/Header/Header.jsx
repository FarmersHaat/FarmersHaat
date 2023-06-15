import "./Header.scss";

import React, { useEffect } from "react";
import { useState, useContext } from "react";
import {
    AiOutlineMenu,
    AiOutlineClose,
} from "react-icons/ai";

import { FaShoppingCart } from 'react-icons/fa';
import { Context } from "../../utils/context";
import Cart from "../Cart/Cart";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();
    const {
        screenSize,
        showCart,
        setShowCart
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
                            onClick={() => navigate(`${process.env.REACT_APP_INITIAL_DOMAIN}/`)}
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
                                    navigate(`${process.env.REACT_APP_INITIAL_DOMAIN}/products`);
                                }}
                            >
                                Product
                            </li>
                            <li
                                onClick={() => {
                                    navigate(`${process.env.REACT_APP_INITIAL_DOMAIN}/benefits`);
                                }}
                            >
                                Benefits
                            </li>
                            <li
                                onClick={() => {
                                    navigate(`${process.env.REACT_APP_INITIAL_DOMAIN}/aboutus`);
                                }}
                            >
                                About Us
                            </li>
                            <li
                                onClick={() => {
                                    navigate(`${process.env.REACT_APP_INITIAL_DOMAIN}/footer`);
                                }}
                            >
                                Contact Us
                            </li>
                        </ul>
                    )}
                    {isMenuBarOpen && (
                        <div className="right">
                            <button
                                className="button"
                                onClick={() => setShowCart(!showCart)}
                            >
                                <FaShoppingCart />
                            </button>
                        </div>
                    )}
                </div>
            </div>
            {showCart && <Cart setShowCart={setShowCart} />}
        </>
    );
};

export default Header;
