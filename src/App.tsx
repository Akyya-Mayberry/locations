import * as React from 'react';
import './App.css';
import yelpSearch from './Clients/Yelp';
import Map from './components/Map';
import StoreList from './components/StoreList';
import { FogStores, getStore, IFogStore} from './StoreData';

class App extends React.Component {

    public stores: IFogStore[] = [];
    public state: any = {
        stores: [FogStores],
        selectedStoreId: 0
    };

    public componentDidMount() {
        console.log('mounted');
        this.stores = FogStores.map((store: IFogStore) => {
            store.details = {phone: '552-234-2155'};
            return store;
        });

        console.log('this is stores: ', this.stores);

        this.setState({stores: this.stores});
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
                    selectMarker={this.getStoreDetails}
                    deselectMarker={this.deselectMarker}
                />
            </div>
        );
    }
}

export default App;
