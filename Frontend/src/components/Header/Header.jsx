import "./Header.scss";

import React, { useEffect } from "react";
import { useState, useContext } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

import { FaShoppingCart } from "react-icons/fa";
import { Context } from "../../utils/context";
import Cart from "../Cart/Cart";
import { useNavigate } from "react-router-dom";

import Logo from "../../assets/Logo.png";
import FH_Logo from "../../assets/FH_Logo.png";

const Header = () => {
	const navigate = useNavigate();
	const { screenSize, showCart, setShowCart } = useContext(Context);
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
							onClick={() => {
								navigate(
									`${process.env.REACT_APP_INITIAL_DOMAIN}/`
								);
						}}>
							{screenSize.width > 1024 ? (
								<img src={Logo} alt="Farmers Haat Logo" />
							) : (
								<img
									src={FH_Logo}
									alt="Farmers Haat Logo"
									className="logo"
								/>
							)}
						</div>
						<div
							className="menu-button"
							onClick={() => {
								setIsMenuBarOpen(!isMenuBarOpen);
							}}>
							{isMenuBarOpen ? (
								<AiOutlineClose />
							) : (
								<AiOutlineMenu />
							)}
						</div>
					</div>
					{isMenuBarOpen &&
						<div className="menuBar">
							<ul className="center">
								<li
									onClick={() => {
										navigate(
											`${process.env.REACT_APP_INITIAL_DOMAIN}/products`
										);
									}}>
									Products
								</li>
								<li
									onClick={() => {
										navigate(
											`${process.env.REACT_APP_INITIAL_DOMAIN}/desc`
										);
									}}>
									Company Profile
								</li>
								<li
									onClick={() => {
										navigate(
											`${process.env.REACT_APP_INITIAL_DOMAIN}/contactus`
										);
									}}>
									Contact Us
								</li>
								<li
									onClick={() => {
										navigate(
											`${process.env.REACT_APP_INITIAL_DOMAIN}/tips`
										);
									}}>
									For Homemakers
								</li>
							</ul>
							<div className="right">
								<button
									className="button"
									onClick={() => setShowCart(!showCart)}>
									<FaShoppingCart />
								</button>
							</div>
						</div>
					}
				</div>
			</div>
			{showCart && <Cart setShowCart={setShowCart} />}
		</>
	);
};

export default Header;
