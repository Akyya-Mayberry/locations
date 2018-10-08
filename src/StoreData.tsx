interface IFogStore {
    address: string;
    city: string;
    coordinates: object;
    country: string;
    id: number;
    name: string;
    details: any | null;
    state: string;
    yelpId: string;
    zip: string;
}

const FogStores: IFogStore[] = [
    {
        id: 1,
        yelpId: 'QPSdgKtUyAJcDyqRGYP41g',
        name: 'Parkview Market',
        address: '501 Frederick St',
        city: 'San Francisco',
        state: 'CA',
        zip: '94117',
        country: 'us',
        details: null,
        coordinates: { lat: 37.766313, lng: -122.453063 },
    },
    {
        id: 2,
        yelpId: 'NFPBhI-qvm-qqxbRppAReA',
        name: 'Val de Cole Liquor FogStore',
        address: '906 Cole St',
        city: 'San Francisco',
        state: 'CA',
        zip: '94117',
        country: 'us',
        details: null,
        coordinates: { lat: 37.765563, lng: -122.449688 }

    },
    {
        id: 3,
        yelpId: 'zAX8hd4IUt6T2DHb08YAtA',
        name: 'Haight & Cole Liquors',
        address: '1699 Haight St',
        city: 'San Francisco',
        state: 'CA',
        zip: '94117',
        country: 'us',
        details: null,
        coordinates: { lat: 37.769437, lng: -122.450562 }
    },
    {
        id: 4,
        yelpId: 'swNgwG-BXI0DH6ZvsQ_1YA',
        name: 'Sunshine Wine & Liquor',
        address: '1754 Haight St',
        city: 'San Francisco',
        state: 'CA',
        zip: '94117',
        country: 'us',
        details: null,
        coordinates: { lat: 37.769563, lng: -122.451187 }
    },
    {
        id: 5,
        yelpId: '5cjvn-9WN1i24bK8mKb7Sg',
        name: 'Liquid Experience',
        address: '1589 Haight St',
        city: 'San Francisco',
        state: 'CA',
        zip: '94117',
        country: 'us',
        details: null,
        coordinates: { lat: 37.769687, lng: -122.448187 }
    }
];

const getStore = (id: number) => {
    return FogStores.filter((store: IFogStore) => {
        return store.id === id;
    })[0];
};

const updateStore = (store: IFogStore, update: any) => {
    const currentStore = getStore(store.id);
    currentStore.details = update.details;
};


export {getStore, IFogStore, FogStores, updateStore};