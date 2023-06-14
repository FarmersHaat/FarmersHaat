import "./Cart.scss";
import { MdClose } from "react-icons/md";
import { BsCartX } from "react-icons/bs";

import CartItem from "./CartItem/CartItem";
import { useContext } from "react";
import { Context } from "../../utils/context";

import { makePaymentRequest } from "../../utils/api";

const Cart = ({ setShowCart }) => {
    const { cartItems, cartSubtotal } = useContext(Context);

    const handlePayment = async () => {
        try {
            const { data } = await makePaymentRequest.post("/api/order", {
                products: cartItems
            });
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="cart-panel">
            <div
                className="opac-layer"
                onClick={() => setShowCart(false)}
            ></div>
            <div className="card-content">
                <div className="cart-header">
                    <span className="heading">Shopping Cart</span>
                    <span
                        className="close-btn"
                        onClick={() => setShowCart(false)}
                    >
                        <MdClose />
                        <span className="text">Close</span>
                    </span>
                </div>
                {cartItems?.[0] === undefined ? (
                    <div className="empty-cart">
                        <BsCartX />
                        <span>No products in the cart.</span>
                        <button
                            className="return-cta"
                            onClick={() => setShowCart(false)}
                        >
                            RETURN TO SHOP
                        </button>
                    </div>
                ) : (
                    <>
                        <CartItem cartItems={cartItems} />
                        <div className="cart-footer">
                            <div className="subtotal">
                                <span className="text">Subtotal : </span>
                                <span className="text total">
                                    &#8377;{cartSubtotal}
                                </span>
                            </div>
                            <div className="button">
                                <button
                                    className="checkout-cta"
                                    onClick={handlePayment}
                                >
                                    Checkout
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Cart;
