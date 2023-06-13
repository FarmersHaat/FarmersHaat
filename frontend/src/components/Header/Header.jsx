import "./Header.scss";

import React from "react";
import { useState, useContext } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

import { Context } from "../../utils/context";
import Cart from "../Cart/Cart";

const Header = () => {
    const { screenSize, cartCount, showCart, setShowCart } =
        useContext(Context);
    const [isMenuBarOpen, setIsMenuBarOpen] = useState(screenSize.width > 1024);

    return (
        <>
            <div className={"main-header"}>
                <div className="header-content">
                    <div className="logo">
                        <div className="heading">Farmers Haat</div>
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
                            <li>Product</li>
                            <li>About Us</li>
                            <li>Contact Us</li>
                            <li>Cart</li>
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
