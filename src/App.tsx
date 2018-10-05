import * as React from 'react';
import './App.css';
import Map from './components/Map';
import StoreList from './components/StoreList';
import storeData from './StoreData';

class App extends React.Component {

    public stores: any = storeData;
    public state: any = {
        stores: storeData
    };

    public filterStores(id: string) {
        let filteredStores;
        
        if (id > '0') {
            filteredStores = this.stores.filter((store: any) => {
                return store.id.toString() === id;
            });

        } else {
            filteredStores = this.stores;
        }
        this.setState({ stores: filteredStores });
    }

    public render() {
    return (
        <div className='app-container'>
            <div id='sidebar-section' className='sidebar-section'>
                <div className='sidebar-items'>
                    <header>Store List</header>
                    <hr />
                    <select
                        className='store-filter'
                        onChange={(evt) => this.filterStores(evt.target.value)}>
                        <option value={0}>-- all --</option>
                        {this.stores.map((store: any) => {
                            return (<option className='store-option' key={store.id} value={store.id}>{store.name}</option>);
                        })}
                    </select>
                    <StoreList stores={this.state.stores} />
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
