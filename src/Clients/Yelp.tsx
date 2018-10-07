import { IFogStore } from '../StoreData';

const YELP_API_KEY = 'i9kbq2f2VMgsqW92qwEIRUEJf5LK3jJZ5WsP1LUBGkSwOjNAFeHZIjwHjfAy_le9Z_Zls1rGeM2kzWI_XzwoRyEpB9K7n4XbvFXkXHmhg72rCzfKcuDArD99ZD-5W3Yx';
const BASE_URL = 'https://api.yelp.com/v3';
const CORS_PROXY_URL = 'https://cors-anywhere.herokuapp.com';


const yelpSearch = async (store: IFogStore) => {
    const headers = new Headers({
        'Authorization': `Bearer ${YELP_API_KEY}`,
    });

    const { name, address, city, state, country } = store;
    const url = `${CORS_PROXY_URL}/${BASE_URL}/businesses/matches?name=${name}&address1=${address}&city=${city}&state=${state}&country=${country.toUpperCase()}`;

    const rsp = await fetch(url, { headers });
    const data = await rsp.json();

    return data;
};

export default yelpSearch;