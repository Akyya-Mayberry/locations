interface IFogStore {
    address: string;
    city: string;
    coordinates: object;
    country: string;
    id: number;
    name: string;
    phone: string;
    state: string;
    zip: string;
}

const FogStores: IFogStore[] = [
    {
        id: 1,
        name: 'Parkview Market',
        address: '501 Frederick St',
        city: 'San Francisco',
        state: 'CA',
        zip: '94117',
        country: 'us',
        phone: '',
        coordinates: { lat: 37.766313, lng: -122.453063 },
    },
    {
        id: 2,
        name: 'Val de Cole Liquor FogStore',
        address: '906 Cole St',
        city: 'San Francisco',
        state: 'CA',
        zip: '94117',
        country: 'us',
        phone: '',
        coordinates: { lat: 37.765563, lng: -122.449688 }

    },
    {
        id: 3,
        name: 'Haight & Cole Liquors',
        address: '1699 Haight St',
        city: 'San Francisco',
        state: 'CA',
        zip: '94117',
        country: 'us',
        phone: '',
        coordinates: { lat: 37.769437, lng: -122.450562 }
    },
    {
        id: 4,
        name: 'Sunshine Wine & Liquor',
        address: '1754 Haight St',
        city: 'San Francisco',
        state: 'CA',
        zip: '94117',
        country: 'us',
        phone: '',
        coordinates: { lat: 37.769563, lng: -122.451187 }
    },
    {
        id: 5,
        name: 'Liquid Experience',
        address: '1589 Haight St',
        city: 'San Francisco',
        state: 'CA',
        zip: '94117',
        country: 'us',
        phone: '',
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
    currentStore.phone = update.phone;
};


export {getStore, IFogStore, FogStores, updateStore};