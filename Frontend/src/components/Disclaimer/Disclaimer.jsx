import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./Disclaimer.scss";

const Disclaimer = () => {
	const location = useLocation();
	useEffect(() => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	}, [location]);
	return (
		<div className="disclaimer">
			<div className="content">
				<div className="textContent">
					<h1>Disclaimer</h1>
					<p>
						This disclaimer applies to all users of
						www.farmershaat.com , its mobile app (if any) and other
						integrated systems (“Farmers Haat Agrotech ”). By using
						Farmers Haat Agrotech you clearly agree and acknowledge
						to be bound by terms of this disclaimer. References in
						these terms to “we” or “us” or “web” or “site” or “app”
						or “company” are references to Farmers Haat Agrotech and
						“you” as user of Farmers Haat Agrotech.
					</p>{" "}
					<p>
						We assure to try our best for relevant services and
						products but does not warrant the accuracy or
						completeness of the services, products, information and
						materials or the reliability of any services, products,
						advices, opinions, statements or other information as
						displayed or distributed through the online services,
						materials and information considering inherent risks
						relating to technology. You agree and acknowledge that
						any reliance on any such opinion, advice, statement,
						memorandum, or information shall be at your own/sole
						risk and consequences attached thereto.
					</p>
					<p>
						Farmers Haat Agrotech hereby reserves its right, in its
						sole discretion, to correct/rectify any errors or
						omissions in any portion of its service, products,
						information and materials. Farmers Haat Agrotech may
						make any other changes/improvements in to the services,
						products, information, materials and programs or prices
						described/published on the site/app at any time without
						any prior notice. All data and information provided on
						this site/app are for the purpose of information only.
					</p>
					<p>
						Farmers Haat Agrotech makes no representations as to
						accuracy, completeness, suitability, or validity of any
						services, products, information and materials on this
						site/app and shall not be liable for any errors,
						omissions, anomalies or delays in the same or any
						losses, injuries, health problems or damages arising
						from its display or use. You clearly agree and
						acknowledge that all information and products are
						provided on an as-is basis. The contents are provided
						for general information only, and you clearly agree and
						acknowledge that it shall never be treated as a
						substitute for the professional advice. Any
						opinions/contents stated on the Farmers Haat Agrotech is
						that of the authors/content writers/merchants.
						Dependence on any information provided by other users to
						the Farmers Haat Agrotech is solely at your own risk.
					</p>
					<p>
						The contents relating to services and products come
						automatically from sources believed to be accurate, but
						may contain inaccuracies or typographical errors or may
						there be a case of omission. Farmers Haat Agrotech makes
						no representations about the results to be obtained from
						using Farmers Haat Agrotech or the contents there of.
						Also, you clearly agree and acknowledge that we shall
						not evaluate automatically synchronized contents and
						therefore use of the Farmers Haat Agrotech and the
						contents is at your own risk. Tips and advice noted on
						the site/app might or might not work for everyone or
						every time and is not a substitute for proper
						professional advice. The contents posted by you in the
						form of suggestions and reviews will become our property
						and you thus grant us the perpetual and transferable
						rights in such contents. For such use of contents by us
						shall not entitle you any payment or other compensation.
						We do not warrant that the servers that make this
						Farmers Haat Agrotech site/app available will be free
						from errors, virus, contaminant, malware, ransomware or
						bugs and you agree and accept that it is your
						responsibility to make adequate provision for protection
						against such threats including any emerging
						security/technology threats. We highly recommend you for
						malware/virus/threat scanning every time before using
						our Farmers Haat Agrotech site/app including related
						services and information.
					</p>
					<p>
						You agree and acknowledge that in Farmers Haat Agrotech
						shall never be considered as liable for any incidental,
						indirect, consequential or special damages of any kind,
						or any damages whatsoever, including, without
						limitation, those resulting from loss of profit, loss of
						contracts, goodwill, data, information, income,
						anticipated savings, litigation/legal issues or business
						relationships, whether or not advised of the possibility
						of such damage, arising out of or in connection with the
						use of this site/app or any linked sites.
					</p>
					<p>
						Also, you clearly agree and acknowledge that Farmers
						Haat Agrotech shall never be held responsible for any
						issues relating to your health which may arise due to
						your lack of reading of any contents/instructions on the
						site/app or related products and services. As described
						earlier, the contents are provided for general
						information only, and you clearly agree and acknowledge
						that it shall never be treated as a substitute for
						proper professional advice. Tips and advice might or
						might not work for everyone or every time and is not a
						substitute for proper professional advice. We hereby
						clearly declare that we do not support unauthorized
						channel partners for selling our services and products.
						Any type of issues/losses to you arising out of
						subscribing from such unauthorized channel partners
						shall never be entertained by us.
					</p>
					<p>
						Farmers Haat Agrotech does not warrant, endorse,
						guarantee, or assume responsibility for any product or
						service advertised or offered by a third party through
						our service or any hyperlinked website/app or featured
						in any user status submission or other advertising, and
						Farmers Haat Agrotech shall never be a party to or in
						any way be responsible for monitoring any transaction
						between you and third-party providers of products or
						services. As with the purchase of a product or service
						through any medium or in any environment, you agree that
						you shall use your best judgment and exercise caution
						(including adherence to dos and donts guidelines where
						ever applicable) where appropriate while using our
						products and services.
					</p>
					<p>
						You further agree that Farmers Haat Agrotech shall not
						be held responsible for any uncontrollable security
						attacks including malfunctions/SSL failures leading to
						failures of confidentiality, accuracy, integrity and
						availability of information onFarmers Haat Agrotech and
						in such cases you agree that Farmers Haat Agrotech shall
						not be held responsible for any type of losses that may
						occur to you as given in provisions of Indian
						Information Technology Act, 2000 including any
						amendments in the said Act and any other relevant Acts.
						You hereby agree that this disclaimer is governed by
						Laws of India subject to jurisdiction of Lucknow, Uttar
						Pradesh without any conflicts of law.
					</p>
					<p>
						Nothing in this disclaimer notice excludes or limits any
						warranty implied by law or fraud through negligence, or
						anything else which it would not be lawful for Farmers
						Haat Agrotech to exclude.
					</p>
					<p>
						By using Farmers Haat Agrotech,you agree and acknowledge
						to the exclusions and limitations of liability stated
						above and accept them as reasonable. Do not use this
						site/app if you do not agree that they are reasonable.
						If any of the points in this disclaimer notice are found
						to be unenforceable under applicable law than that shall
						have no bearing on the enforceability of the rest of the
						disclaimer notice.
					</p>
					<p>
						By using this site/app, you are clearly accepting all
						the terms of this disclaimer. If you do not agree with
						anything in this disclaimer then you shall not use this
						site/app.
					</p>
				</div>
			</div>
		</div>
	);
};

export default Disclaimer;
