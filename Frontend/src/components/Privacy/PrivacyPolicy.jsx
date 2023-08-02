import "./PrivacyPolicy.scss";
import React, { useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
const PrivacyPolicy = () => {
	const location = useLocation();
	useEffect(() => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	}, [location]);
	return (
		<div className="privacyPolicy">
			<div className="content">
				<div className="textContent">
					<h1>Privacy Policy</h1>
					<p>
						This website (“Site”) is owned and operated by Farmers
						Haat Agrotech. We take your privacy seriously. This
						Privacy Policy describes:
					</p>
					<ol>
						<li>
							The types of information that we may collect from
							you when you access or use its websites,
							applications and other online services
							(collectively, referred as “Services”); and
						</li>
						<li>
							Its practices for collecting, using, maintaining,
							protecting and disclosing that information
						</li>
					</ol>
					<p>
						By using this Site, you consent to the terms of this
						Privacy Policy. Farmers Haat Agrotech may change this
						Privacy Policy from time to time. Please check back
						periodically for up-to-date information about our
						privacy practices
					</p>
					<h2>TERMS OF USE</h2>
					<p>
						Your use of this portal is also subject to the Terms of
						Use posted on this web- portal (“Terms of Use”).
					</p>
					<h2>Information Covered by This Privacy Policy</h2>
					<p>
						This Privacy Policy covers the “Personal Information” we
						collect through our Sites. “Personal Information” is
						information that identifies, relates to, describes, is
						reasonably capable of being associated with, or could
						reasonably be linked, directly or indirectly, with you
						personally, either alone or in combination with other
						information available to us. Examples of Personal
						Information include your name, contact details, credit
						card information, information you provide when you
						create an account or a personal profile on one of our
						Sites, and information about the pages you have viewed
						and the path you have taken through our Sites.
					</p>
					<h2>Information We Collect</h2>
					<p>
						We may collect Personal information on this Website
						voluntarily submitted by the user, including information
						we collect while performing business transactions and
						information we collect from other sources (as permitted
						by law) for the performance of a contract with you or
						where it is necessary for our legitimate interests of
						operating, protecting and improving our business.
					</p>
					<h3>Information Collected Directly</h3>
					<p>
						We may collect information from you directly when you
						provide us with personal information, e.g. when you
						register or sign up to receive information, buy a
						product or service from us, fill out a survey, or make a
						comment or enquiry. The following are examples of
						information we may collect directly:
					</p>
					<ol>
						<li>Name, email address, postal address</li>
						<li>Username and password</li>
						<li>Phone number or mobile number</li>
						<li>Date of birth</li>
						<li>Demographic information and service history</li>
						<li>
							Payment instrument details (such as credit card
							information, credit history, security codes)
						</li>
						<li>Future communication preferences</li>
						<li>
							Other household information about you and your
							family such as gender or product use preferences
							and/or behaviors
						</li>
						<li>
							Health information, such as health information
							related to product usage and medical history
						</li>
						<li>
							Any information necessary for performing sales
							transactions
						</li>
					</ol>
					<h3>Information Collected Automatically</h3>
					<p>
						We (and third-party service providers acting on our
						behalf) may use cookies and other tools (such as web
						analytic tools, pixel tags, web beacons, JavaScript,
						etc.) to automatically collect information about you
						when you use this website, subject to the terms of this
						Privacy Notice and applicable data laws and regulations.
						The types of information collected automatically may
						include, but are not limited to, the following:
					</p>
					<ul>
						<li>Details of the web pages you have viewed</li>
						<li>Information about the type of browser you use</li>
						<li>The hyperlinks you have clicked</li>
						<li>Your IP address</li>
						<li>
							Your username, profile picture, gender, networks,
							and any other information you choose to share when
							using Third Party Sites (such as when you use the
							“Like” functionality on Facebook or the +1
							functionality on Google+)
						</li>
						<li>
							The websites you visited before arriving at this
							site
						</li>
					</ul>
					<h2>How We Use This Information</h2>
					<p>
						Personal information collected from data subjects listed
						in this portal will only be kept in order to conduct the
						required business and for as long as the requirement was
						deemed at the time of data collection. The information
						collected may be used for the following activities:
					</p>
					<ul>
						<li>
							To provide the products, information, and services
							you request
						</li>
						<li>To provide you with effective customer service</li>
						<li>
							Create and manage information for master maintenance
						</li>
						<li>Process payment for purchases or other services</li>
						<li>
							Protect against or identify possible fraudulent
							transactions
						</li>
						<li>
							Enforce the terms and conditions of agreements and
							otherwise lawfully manage our business
						</li>
						<li>
							Suggest products or services (including those of
							relevant third parties) which we think may be of
							interest to you
						</li>
						<li>Provide you with customer support</li>
						<li>
							Offer you the opportunity to take part in
							competitions or promotions
						</li>
						<li>
							For the purposes of competitions or promotions that
							you have entered
						</li>
						<li>
							To send you information, products, or samples that
							you have requested
						</li>
						<li>To respond to your queries or comments</li>
						<li>Evaluate the use of our products and services</li>
						<li>
							Analyze the effectiveness of our advertisements,
							competitions, and promotions
						</li>
						<li>
							Personalize your website experience, as well as to
							evaluate (anonymously and in the aggregate)
							statistics on website activity, such as what time
							you visited it, whether you’ve visited it before,
							and what site referred you to it
						</li>
						<li>
							Help speed up your future activities and experience
							on our Website. For example, a site can recognize
							that you have provided your personal information and
							will not request the same information a second time
						</li>
						<li>
							Generate and review reports and data about, and to
							conduct research on, our user base and Service usage
							patterns
						</li>
						<li>
							Administer our Services and diagnose technical
							problems
						</li>
						<li>To improve our products and services</li>
						<li>
							To improve our marketing and promotional efforts
						</li>
						<li>
							For any other purpose related to the transaction
							between You and Us
						</li>
					</ul>
					<h2>ACCESS TO INFORMATION BY RELEVANT PERSONS</h2>
					<p>
						All personal information must be accurate, complete, and
						relevant for the business purposes of collection of such
						information, and necessary only to facilitate those
						purposes. Your access to and use of this web-portal and
						its contents (the “Portal”) is subject to the terms and
						conditions of this Privacy Policy, and all applicable
						laws. By accessing and using this Portal, you (the
						“User” or “you”) accept and agree to these without any
						limitation or qualification.
					</p>
					<h2>Information Sharing</h2>
					<p>
						We share personal information within Farmers Haat
						Agrotech and externally only as described below:
					</p>
					<ol>
						<li>
							Third-party service providers – We may share your
							information with outside vendors that we use for a
							variety of purposes, such as to send you
							communications via emails, messages, or tele-call to
							inform you about our products that may be of
							interest to you, push notifications to your mobile
							device on our behalf, provide voice recognition
							services to process your spoken queries and
							questions, help us analyze the use of our Services,
							and process and collect payments. Some of our
							products, services, and databases are hosted by
							third-party hosting service providers. We also may
							use vendors for other projects, such as conducting
							surveys or organizing sweepstakes for us. We may
							share information about you with these vendors only
							to enable them to perform their services.
						</li>
						<li>
							Legal action and obligations – We may disclose
							Personal information:
							<ol type="1">
								<li>
									Where permitted by law, to protect and
									defend the rights and property of Farmers
									Haat Agrotech (including enforcement of
									valid agreements).
								</li>
								<li>
									When required by law or public authorities.
								</li>
							</ol>
						</li>
						<li>
							Social Networks – If you interact with social media
							features on our Services, such as the Facebook Like
							button, or use your social media credentials to
							log-in or post content, these features may collect
							information about your use of the Services, as well
							as post information about your activities on the
							social media service. Your interactions with social
							media companies are governed by their privacy
							policies.
						</li>
						<li>
							To contractors, advertisers/service providers, and
							other third parties whom we use to support our
							business (e.g., Distributors, food delivery
							providers, e-commerce companies) and who are bound
							by contractual obligations to keep personal
							information confidential and use it only for the
							purposes for which we disclose it to them.
						</li>
					</ol>
					<h2>Information Security</h2>
					<p>
						We have implemented appropriate physical, electronic,
						and managerial procedures to safeguard and help prevent
						unauthorized access to your information and to maintain
						data security. These safeguards take into account the
						sensitivity of the information that we collect, process,
						and store and the current state of technology. We follow
						generally accepted industry standards to protect the
						Personal information submitted to us, both during
						transmission and once we receive it. The third-party
						service providers with respect to the payment gateway
						and payment processing are all validated as compliant
						with the payment card industry standard (generally
						referred to as PCI compliant service providers).
					</p>
					<p>
						We assume no liability or responsibility for the
						disclosure of your information due to errors in
						transmission, unauthorized third-party access, or other
						causes beyond our control. You play an important role in
						keeping your personal information secure. You should not
						share your username, password, or other security
						information for your account with anyone. If we receive
						instructions using your username and password, we will
						consider that you have authorized the instructions.
					</p>
					<p>
						The Services may contain links to third-party websites.
						Your use of these features may result in the collection,
						processing, or sharing of information about you,
						depending on the feature. Please be aware that we are
						not responsible for the content or privacy practices of
						other websites or services which may be linked on our
						services. We do not endorse or make any representations
						about third-party websites or services. Our Privacy
						Policy does not cover the information you choose to
						provide to or that is collected by these third parties.
						We strongly encourage you to read such third parties’
						privacy policies.
					</p>
					<h2>CHANGES TO OUR PRIVACY NOTICE</h2>
					<p>
						We will post changes to this privacy notice and update
						the effective date when this Privacy Policy is updated.
						We may modify this Privacy Policy at any time, in our
						sole discretion and all modifications will be effective
						immediately upon our posting of the modifications.
						Continued use of website, following notice of such
						changes shall indicate your acknowledgement of such
						changes and agreement to be bound by the terms and
						conditions of such changes.
					</p>
					<h2>CONSENT</h2>
					<p>
						I acknowledge and agree to the terms contained in this
						data privacy notice, whref="privacy-policy.html"hich
						shall be effective for the entire duration of my
						relationship with Farmers Haat Agrotech as a user of
						this website and until Farmers Haat Agrotech retains
						records of the captured Personal information as
						specified above.
					</p>
					<h2>Shipping and Delivery</h2>
					<p>
						We will be shipping the product within 1-2 working days.
					</p>
					<p>
						If you have any queries/concerns related to your
						shipment, please contact our support team at{" "}
						<a href="mailto:care@farmershaat.com">
							care@farmershaat.com
						</a>{" "}
						within 24 hours of receiving the products.
					</p>
					<p>
						In most cases, once the order is processed, you will
						receive an order completion mail along with the shipment
						tracking number. In case you do not receive this mail
						within 7 working days, contact our support directly at{" "}
						<a href="mailto:care@farmershaat.com">
							care@farmershaat.com
						</a>
						.
					</p>
					<h2>Terms & Conditions</h2>
					<ol>
						<li>
							Farmers Haat Agrotech may accept or decline any
							order placed by a customer in its absolute
							discretion without liability to you.
						</li>
						<li>
							Farmers Haat Agrotech reserves the right to
							discontinue any program or offer on its Website/App.
						</li>
						<li>
							We reserve the right, without prior notice, to limit
							the order quantity of any Products available on{" "}
							<NavLink
								to={`${process.env.REACT_APP_INITIAL_DOMAIN}/products`}>
								https://farmershaat.com/products
							</NavLink>
							.
						</li>
					</ol>
					<h2>Data Protection and Privacy Policy</h2>
					<p>
						Farmers Haat Agrotech Limited respects its concern about
						data protection and privacy of your personal and
						sensitive information and takes protection of such
						personal and sensitive information seriously. Please
						refer to our{" "}
						<NavLink
							to={`${process.env.REACT_APP_INITIAL_DOMAIN}/policy`}>
							Privacy Policy
						</NavLink>{" "}
						for information on how we collect, store, use, disclose,
						and manage your personal information.
					</p>
					<h2>Content We Make Available on the Site</h2>
					<p>
						This Site of Farmers Haat Agrotech has been developed to
						provide general public information which is subject to
						change without notice. The documents and information
						displayed on this site are for reference purposes only.
					</p>
					<p>
						We try to ensure that Site availability is uninterrupted
						and that transmissions will be error-free. However, we
						cannot, due to the nature of the internet, guarantee
						that your access will not be suspended or restricted
						from time to time, including to allow for repairs,
						maintenance, or the introduction of new services. We, of
						course, try to limit the frequency and duration of any
						suspension or restriction.
					</p>
					<h2>Cancellation and Refund</h2>
					<p>
						If you have any queries/concerns related to your
						shipment, please contact our support team at{" "}
						<a href="mailto:care@farmershaat.com">
							care@farmershaat.com
						</a>{" "}
						within 24 hours of receiving the products. If the
						product you have received is damaged/wrong, it can be
						returned to us within 7 days from the date of delivery.
						Simply send an email to{" "}
						<a href="mailto:care@farmershaat.com">
							care@farmershaat.com
						</a>{" "}
						with photos of the invoice and product along with your
						order number. We will respond to your email within 24
						hours and arrange to send your order to you the way it
						was intended the first time. In case you no longer want
						the product:
					</p>
					<h3>For Prepaid Orders:</h3>
					<p>
						We will refund the order value. Your refund will be
						initiated within 7 working days of us receiving the
						refund request and authorizing the refund. In case you
						wish to cancel your order before it has been shipped
						from our warehouse, simply drop an email to{" "}
						<a href="mailto:care@farmershaat.com">
							care@farmershaat.com
						</a>{" "}
						to let us know, and we’ll take care of the rest.
					</p>
				</div>
			</div>
		</div>
	);
};

export default PrivacyPolicy;
