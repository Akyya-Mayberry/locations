import * as React from 'react';
import './App.css';
import {yelpSearch, yelpSearchFull} from './Clients/Yelp';
import Map from './components/Map';
import StoreList from './components/StoreList';
import { FogStores, getStore, IFogStore} from './StoreData';

class App extends React.Component {

    public stores: IFogStore[] = [];
    public state: any = {
        stores: [FogStores],
        selectedStoreId: null
    };

    public async componentDidMount() {
        console.log('mounted');

        // Check if it's in cache first or local storage
        const results = await FogStores.map(async (store: IFogStore) => {
            const details = await this.getFullDetails(store);
            return details;
        });

        Promise.all(results).then((rsp) => {

            // optionally map over each response detail object 
            // and assign it to the store
            this.stores = FogStores.map((store: IFogStore, index: number) => {
                store.details = rsp[index];
                return store;
            });

            this.setState({stores: this.stores});
        });
    }

    public async getFullDetails(store: IFogStore) {
        return await yelpSearchFull(store.yelpId);
        
        // .then((rsp: any) => {
        //     console.log('here is response: ', rsp);
        //     store.details = rsp;
        //     return rsp;
        // }).catch((e: any) => {
        //     console.log('yelp api sent an error: ', e);
        // });
    }

    public selectMarker = (id: number) => {
        this.setState({selectedStoreId: id});
    }

    public deselectMarker = () => {
        this.setState({ stores: this.stores, selectedStoreId: 0 });
    }

    public getStoreDetails = async (id: number) => {
        const store = getStore(id);

        const getDetails = async () => {
            await yelpSearch(store).then((rsp: any) => {
                console.log('here is response: ', rsp);
            }).catch((e: any) => {
                console.log('yelp api sent an error: ', e);
            });
          };
        
        getDetails();
    } 

    public filterStores = (id: number) => {
        let filteredStores;

        if (id > 0) {
            filteredStores = this.stores.filter((store: any) => {
                return store.id === id;
            });
        } else {
            filteredStores = this.stores;
        }

        this.setState({ stores: filteredStores, selectedStoreId: id });
    }

    public render() {
        return (
            <div className='app-container'>
                <div id='sidebar-section' className='sidebar-section'>
                    <div className='sidebar-items'>
                        <header>Store List</header>
                        <hr />
                        <select
                            value={this.state.selectedStoreId}
                            className='store-filter'
                            onChange={(evt) => this.filterStores(Number(evt.target.value))}>
                            <option value={0}>-- all --</option>
                            {this.stores.map((store: any) => {
                                return (<option
                                    className='store-option'
                                    key={store.id}
                                    value={store.id}>{store.name}</option>);
                            })}
                        </select>
                        <StoreList
                            selectStore={this.filterStores}
                            stores={this.state.stores}
                        />
                    </div>
                </div>
                <Map
                    googleMapURL={`
                    https://maps.googleapis.com/maps/api/js?
                    key=AIzaSyDzYuNeeymGaSyKN6z1wtIpgZDpgq-ckTc
                    &v=3.exp&libraries=geometry,drawing,places`
                    }
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ width: '100vw', height: `100vh` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                    stores={this.stores}
                    selectedStoreId={this.state.selectedStoreId}
                    selectMarker={this.selectMarker}
                    deselectMarker={this.deselectMarker}
                />
            </div>
        );
    }
}

export default App;
