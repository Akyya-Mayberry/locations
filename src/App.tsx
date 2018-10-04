import * as React from 'react';
import './App.css';
import Map from './components/Map';
import StoreList from './components/StoreList';
import storeData from './StoreData';

class App extends React.Component {

    public stores: object[] = storeData;

    public render() {
        return (
            <div className='App'>
                <div>
                    <StoreList
                        stores={this.stores}/>
                </div>
                <div className='App-intro'>
                    <Map
                        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyDzYuNeeymGaSyKN6z1wtIpgZDpgq-ckTc&v=3.exp&libraries=geometry,drawing,places`}
                        loadingElement={<div style={{ height: `100%` }} />}
                        containerElement={<div style={{ height: `400px` }} />}
                        mapElement={<div style={{ height: `100%` }} />}
                    />
                </div>
            </div>
        );
    }
}

export default App;
