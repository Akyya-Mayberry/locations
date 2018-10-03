import * as React from 'react';
import './App.css';
import Map from './components/Map';

import logo from './logo.svg';

class App extends React.Component {
    public render() {
        return (
            <div className='App'>
                <header className='App-header'>
                    <img src={logo} className='App-logo' alt='logo' />
                    <h1 className='App-title'>Welcome to React</h1>
                </header>
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
