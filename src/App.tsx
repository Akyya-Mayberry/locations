import * as React from 'react';
import './App.css';
import Map from './components/Map';
import StoreList from './components/StoreList';
import storeData from './StoreData';

class App extends React.Component {

    public stores: object[] = storeData;

    public render() {
        return (
            <div className='app-container'>
                <div id='sidebar-section' className='sidebar-section'>
                    <div className='sidebar-items'>
                        <header>Store List</header>
                        <hr />
                        <input type='search' placeholder='enter store' />
                        <button id='filter-button' className='filter-button'>Filter</button>
                        <StoreList stores={this.stores} />
                    </div>
                </div>
                <Map
                    googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyDzYuNeeymGaSyKN6z1wtIpgZDpgq-ckTc&v=3.exp&libraries=geometry,drawing,places`}
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ width: '100vw', height: `100vh` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                />
            </div>
        );
    }
}

export default App;
