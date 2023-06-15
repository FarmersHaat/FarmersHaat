import axios from 'axios';

const params = {
    headers: {
        Authorization : `bearer ${process.env.REACT_APP_STRAPI_APP}`
    }
}

export const fetchData = async (url) => {
    try {
        const { data } = await axios.get(
            process.env.REACT_APP_PRODUCTION_URL + url,
            params
        )
        return data;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export const makePaymentRequest = axios.create({
    baseURL: process.env.REACT_APP_DEV_URL,
    headers : params.headers
})