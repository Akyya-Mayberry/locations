import * as React from 'react';
import './App.css';
import { yelpSearchFull } from './clients/Yelp';
import ErrorBoundary from './components/ErrorBoundary';
import Hamburger from './components/Hamburger';
import Map from './components/Map';
import StoreList from './components/StoreList';
import { FogStores, IFogStore } from './StoreData';

class App extends React.Component {

    public stores: IFogStore[] = [];
    public state: any = {
        stores: [FogStores],
        selectedStoreId: null,
        isSideMenuOpen: false,
        hasErrors: false
    };

    public async componentDidMount() {

        // Grab stores from local storage if present
        // else check cached storage
        const cachedStores = this.getCachedLocalStores();

        if (cachedStores) {
            console.log('stores are cached: ', cachedStores);
            this.stores = cachedStores;
            this.setState({ stores: cachedStores });
        } else {

            // Get full store details for info windows
            const results = await FogStores.map(async (store: IFogStore) => {
                const details = await this.getFullDetails(store);
                return details;
            });

            // When full details are available update stores
            Promise.all(results).then((rsp) => {
                this.stores = FogStores.map((store: IFogStore, index: number) => {
                    store.details = rsp[index];
                    return store;
                });
                this.setState({ stores: this.stores });
                this.cacheLocalStores(this.stores);
            }).catch((e) => {
                // throw new Error('failed to fetch stores!!!!');
                this.setState({ hasErrors: true });
                console.log('error fetching store data: ', e);
            });
        }
    }

    public async getFullDetails(store: IFogStore) {
        return await yelpSearchFull(store.yelpId);
    }

    public selectMarker = (id: number) => {
        this.setState({ selectedStoreId: id });
    }

    public deselectMarker = () => {
        this.setState({ stores: this.stores, selectedStoreId: 0 });
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

        this.setState(
            {
                stores: filteredStores,
                selectedStoreId: id
            }
        );
    }

    public getCachedLocalStores = () => {
        const stores = localStorage.getItem('stores');
        if (!stores) { return null; }

        return JSON.parse(stores) as IFogStore[];
    }

    public cacheLocalStores = (stores: IFogStore[]) => {
        localStorage.setItem('stores', JSON.stringify(stores));
    }

    public openSideMenu = () => {
        this.setState({ isSideMenuOpen: !this.state.isSideMenuOpen });
    }

    public render() {
        if (this.state.hasErrors) {
            return <p className='error-boundary'>Unable to fetch stores.</p>;
        } else {
            return (
                <div className='app-container'>

                    {/* Hamburger Menu Button */}
                    <Hamburger
                        isSideMenuOpen={this.state.isSideMenuOpen}
                        openSideMenu={this.openSideMenu} />
                    {/* Slideout Side Menu Section */}
                    {this.state.isSideMenuOpen
                        && <div
                            id='sidebar-section'
                            className={this.state.isSideMenuOpen ? `sidebar-section is-active` : `sidebar-section`}>
                            <div className='sidebar-items'>
                                <header className='store-list-header' tabIndex={-1}>Store List</header>
                                <hr />

                                {/* Filter Store  */}
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

                                {/* List of Stores */}

                                <ErrorBoundary>
                                    <StoreList
                                        selectStore={this.filterStores}
                                        stores={this.stores}
                                    />
                                </ErrorBoundary>

                            </div>
                        </div>
                    }

                    {/* Map Section */}
                    <ErrorBoundary>
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
                    </ErrorBoundary>

                </div>
            );
        }
    }
}

export default App;
