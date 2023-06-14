import "./Footer.scss";

import React, { useContext } from "react";
import { Context } from "../../utils/context";
import {
    FaInstagram,
    FaFacebook,
    FaTwitter,
    FaYoutube,
    FaPhoneAlt,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
const Footer = () => {
    const { footerRef } = useContext(Context);
    return (
        <div className="footer" ref={footerRef}>
            <div className="content">
                <div className="textContent">
                    <div className="logo">Farmers haat</div>
                    <div className="desc">
                        If you have any concerns about your shipment, contact
                        our support team at care@farmershaat.com within 48 hours
                        of receiving the products.
                        <br /> In the event of damaged or wrong products, you
                        can return them within 7 days of delivery by emailing
                        care@farmershaat.com with photos of the invoice,
                        product, and order number. We will respond within 48
                        hours to arrange a replacement.
                        <br />
                        <br /> For prepaid orders, refunds will be initiated
                        within 7 working days upon receiving the refund request.
                        To cancel an order before shipping, email
                        care@farmershaat.com, and we'll assist you.
                    </div>
                </div>

                <div className="contactInfo">
                    <div className="contactUs">Contact Us</div>
                    <input
                        type="text"
                        className="name"
                        placeholder="Name"
                        name="name"
                    />
                    <input
                        type="email"
                        className="email"
                        placeholder="Email"
                        name="email"
                    />
                    <textarea
                        type="textarea"
                        className="query"
                        placeholder="Query"
                        name="query"
                        rows={5}
                    />
                    <button type="submit" className="submit">
                        Submit
                    </button>
                </div>

                <div className="socialMedia">
                    <FaFacebook />
                    <FaInstagram />
                    <FaTwitter />
                    <FaYoutube />
                    <MdEmail />
                    <FaPhoneAlt />
                </div>
            </div>
        </div>
    );
};

export default Footer;
