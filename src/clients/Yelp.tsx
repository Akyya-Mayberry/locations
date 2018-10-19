import { IFogStore } from '../StoreData';

/* Yelp Fusion API is used to get data about stores.
 The API doesn't allow clientside flow and therefore
 a free proxy is being used to initiate requests
*/

const YELP_API_KEY = 'i9kbq2f2VMgsqW92qwEIRUEJf5LK3jJZ5WsP1LUBGkSwOjNAFeHZIjwHjfAy_le9Z_Zls1rGeM2kzWI_XzwoRyEpB9K7n4XbvFXkXHmhg72rCzfKcuDArD99ZD-5W3Yx';
const BASE_URL = 'https://api.yelp.com/v3';
const CORS_PROXY_URL = 'https://cors-anywhere.herokuapp.com';


/**
 * 
 * @param {IFogstore} store - store to fetch basic details for
 */
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

/**
 * 
 * @param {string} id - yelp id to fetch full details
 * return any
 */
const yelpSearchFull = async (id: string) => {

    // throw new Error('failed to fetch stores!!!!');
    const headers = new Headers({
        'Authorization': `Bearer ${YELP_API_KEY}`,
    });

    const url = `${CORS_PROXY_URL}/${BASE_URL}/businesses/${id}`;

    const rsp = await fetch(url, { headers });
    const data = await rsp.json();

    return data;
};

export { yelpSearch, yelpSearchFull };