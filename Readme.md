# FarmersHaat
FarmersHaat is an online marketplace that connects farmers directly with consumers. This platform allows farmers to list their products and consumers to purchase fresh produce directly from the source.
## Table of Contents
- Installation
- Usage
- Contributing
- License
- Contact
### Installation

To set up a local copy of the project, follow these steps:
- Clone the repository to your local machine using git clone https://github.com/Ashu0Singh/FarmersHaat.git.
- Install necessary dependencies using npm install (assuming Node.js and npm are already installed on your machine).
- Run the local development server using `npm start`.

    #### `.env` Format
    Frontend
    ```js
    REACT_APP_STRAPI_APP=[Generate from strapi app (custom access token)]
    REACT_APP_STRAPI_APP_DEV=[Generate from strapi app (full access token)]
    REACT_APP_DEV_URL=[For development (localhost:1337)]
    REACT_APP_PRODUCTION_URL=[For Production]
    REACT_APP_INITIAL_DOMAIN=[leave this empty]
    REACT_APP_RAZORPAY_KEY_ID=[Generate from razorpayX test mode]
    REACT_APP_RAZORPAY_SECRET_KEY=[Generate from razorpayX test mode]
    REACT_APP_NODE_ENV=[Set environment]
    ```
    Backend - [Strapi Docs]( https://docs.strapi.io/dev-docs/configurations/environment)
    ```js
    //Go through strapi documentation
    HOST=0.0.0.0
    PORT=1337
    APP_KEYS=
    API_TOKEN_SALT=
    ADMIN_JWT_SECRET=
    TRANSFER_TOKEN_SALT=
    JWT_SECRET=
    # Database
    DATABASE_CLIENT=
    DATABASE_HOST=
    DATABASE_PORT=
    DATABASE_NAME=
    DATABASE_USERNAME=
    DATABASE_PASSWORD=
    DATABASE_SSL=false
    RAZORPAY_KEY_ID=
    RAZORPAY_KEY_SECRET=
    # Sendgrid 
    SENDGRID_API_KEY=[Generated from "https://sendgrid.com/"]
    SENDGRID_FROM_TO=
    SENDGRID_REPLY_TO=
    ```

### Usage
To purchase products from FarmersHaat:
- Visit www.farmershaat.com.
- Browse the product listings.
- Add desired products to your shopping cart.
- Proceed to checkout and enter the necessary information.
- Confirm your purchase.
### Contributing
Contributions to the FarmersHaat project are welcome. To contribute:
- Fork the repository.
- Create a new branch for your features or fixes.
- Push your changes to your forked repository.
- Submit a pull request detailing your changes.
### License
The FarmersHaat project is licensed under the MIT License. Please see the LICENSE file in the repository for more details.

### Contact
For any queries or issues related to the project, please contact:
>Ashutosh Singh
<br/>Email: [work@ashu-singh.com](mailto:work@ashu-singh.com.com)
<br/>GitHub: [Ashu0Singh](https://github.com/Ashu0Singh)

Please ensure to create an issue on GitHub for any project-related problems or suggestions.
