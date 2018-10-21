import * as React from 'react';
import { GoogleMap, InfoWindow, Marker, withGoogleMap, withScriptjs } from 'react-google-maps';
import { IFogStore } from '../StoreData';
import ErrorBoundary from './ErrorBoundary';
import './Map.css';


export interface IProps {
    gotStoreData: boolean;
    stores: IFogStore[];
    selectedStoreId: number;
    selectMarker: (id: number) => void;
    deselectMarker: () => void;
}

const Map = withScriptjs(withGoogleMap((props: IProps) =>
    <GoogleMap
        defaultZoom={13}
        defaultCenter={{ lat: 37.764438, lng: -122.452312 }}>
        {props.stores.map((store: IFogStore, index: number) => {
            return (
                <ErrorBoundary key={store.yelpId}>
                    <Marker
                        title={`Marker associated with ${store.name} on the map`}
                        onClick={() => props.selectMarker(Number(store.id))}
                        key={index}
                        position={store.coordinates}
                        defaultAnimation={google.maps.Animation.DROP}
                        animation={props.selectedStoreId === null
                            ? google.maps.Animation.DROP
                            : props.selectedStoreId === store.id
                                ? google.maps.Animation.BOUNCE : undefined}>
                        {
                            props.selectedStoreId === store.id && props.gotStoreData &&
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
                                    <a className='yelp-link'><img
                                        className='yelp-logo'
                                        src='./Yelp_trademark_RGB.png'
                                        alt={'Image of yelp logo'} />
                                    </a>
                                </div>
                            </InfoWindow>
                        }
                    </Marker>
                </ErrorBoundary>
            );
        })}
    </GoogleMap>
));

export default Map;