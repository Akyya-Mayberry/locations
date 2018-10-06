class FogStore {
    private id: number;
    private name: string;
    private address: string;
    private coordinates: object;

    constructor(id: number, name: string, address: string, coordinates: object) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.coordinates = coordinates;
    }

    public getInfo = (id: number) => {
        return {
            id: this.id,
            name: this.name,
            address: this.address,
            coordinates: this.coordinates
        };
    }
}

const FogStores = [
    new FogStore(
        1,
        'Parkview Market',
        '501 Frederick St, San Francisco, CA 94117',
        { lat: 37.766313, lng: -122.453063 }
    ),
    new FogStore(
        2,
        'Val de Cole Liquor FogStore',
        '906 Cole St, San Francisco, CA 94117',
        { lat: 37.765563, lng: -122.449688 }

    ),
    new FogStore(
        3,
        'Haight & Cole Liquors',
        '1699 Haight St, San Francisco, CA 94117',
        { lat: 37.769437, lng: -122.450562 }
    ),
    new FogStore(
        4,
        'Sunshine Wine & Liquor',
        '1754 Haight St, San Francisco, CA 94117',
        { lat: 37.769563, lng: -122.451187 }
    ),
    new FogStore(
        5,
        'Liquid Experience',
        '1589 Haight St, San Francisco, CA 94117',
        { lat: 37.769687, lng: -122.448187 }
    )
];

export {FogStore, FogStores};