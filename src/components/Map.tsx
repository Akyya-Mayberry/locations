import React from 'react';
import { GoogleMap, Marker, withGoogleMap, withScriptjs } from 'react-google-maps';

export interface IProps {
    stores: any[];
    selectedStoreId: any;
    selectStore: any;
}

const Map = withScriptjs(withGoogleMap((props: IProps) =>
    <GoogleMap
        defaultZoom={13}
        // defaultCenter={{ lat: -34.397, lng: 150.644 }}>
        defaultCenter={{ lat: 37.764438, lng: -122.452312 }}>
        {props.stores.map((store: any) => {
            return (<Marker onClick={(evt) => props.selectStore(Number(store.id))} key={store.id} position={store.coordinates} />);
        })}
    </GoogleMap>
));

export default Map;