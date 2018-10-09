import * as React from 'react';
import { GoogleMap, InfoWindow, Marker, withGoogleMap, withScriptjs } from 'react-google-maps';
import { IFogStore } from '../StoreData';
import './Map.css';

export interface IProps {
    stores: IFogStore[];
    selectedStoreId: number;
    selectMarker: (id: number) => void;
    deselectMarker: () => void;
}

const Map = withScriptjs(withGoogleMap((props: IProps) =>
    <GoogleMap
        defaultZoom={13}
        defaultCenter={{ lat: 37.764438, lng: -122.452312 }}>
        {props.stores.map((store: IFogStore) => {
            return (
                <Marker
                    onClick={() => props.selectMarker(Number(store.id))}
                    key={store.id}
                    position={store.coordinates}
                    defaultAnimation={google.maps.Animation.DROP}
                    animation={props.selectedStoreId === store.id
                        ? google.maps.Animation.BOUNCE : undefined}>
                    {
                        props.selectedStoreId === store.id &&
                        <InfoWindow onCloseClick={() => props.deselectMarker()}>
                            <div className='info-window'>
                                <p>{store.name}</p>
                                <img
                                    className='map-store-image'
                                    src={store.details.image_url}
                                    alt={`Image of liqour store '${store.name}'`} />
                                <ul className='map-store-details'>
                                    <li>Phone: {store.details.phone}</li>
                                    {store.details.is_closed
                                        && <li>Open: {store.details.is_closed}</li>}
                                </ul>
                            </div>
                        </InfoWindow>
                    }
                </Marker>
            );
        })}
    </GoogleMap>
));

export default Map;