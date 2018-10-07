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
        {props.stores.map((store: any) => {
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
                            <ul>
                            <li>{store.name}</li>
                            <li>{store.phone}</li>
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