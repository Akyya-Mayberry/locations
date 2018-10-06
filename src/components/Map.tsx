import React from 'react';
import { GoogleMap, Marker, withGoogleMap, withScriptjs } from 'react-google-maps';

export interface IProps {
    stores: any[];
    selectedStoreId: any;
    selectMarker: any;
}

const Map = withScriptjs(withGoogleMap((props: IProps) =>
    <GoogleMap
        defaultZoom={13}
        defaultCenter={{ lat: 37.764438, lng: -122.452312 }}>
        {props.stores.map((store: any) => {
            return (
                <Marker
                    onClick={(e: google.maps.MouseEvent) => props.selectMarker(Number(store.id))}
                    key={store.id}
                    position={store.coordinates}
                    defaultAnimation={google.maps.Animation.DROP}
                    animation={props.selectedStoreId === store.id ? google.maps.Animation.BOUNCE : undefined} />
            );
        })}
    </GoogleMap>
));

export default Map;