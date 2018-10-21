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
        hasErrors: false, 
        gotStoreData: null
    };

    public async componentDidMount() {

        // Grab stores from local storage if present
        // else check cached storage
        const cachedStores = this.getCachedLocalStores();

        if (cachedStores) {
            this.stores = cachedStores;
            this.setState({ stores: cachedStores, gotStoreData: true });
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
                this.setState({ stores: this.stores, gotStoreData: true });
                this.cacheLocalStores(this.stores);
            }).catch((e) => {
                // Update UI with issues fetching stores
                console.log('error fetching store data: ', e);
                this.stores = FogStores;
                this.setState({ hasErrors: true, stores: this.stores, gotStoreData: false });
            });
        }
    }

    /**
     * Fetch full details for a store (name, address, hours of operation, pics)
     * @param {IFogStore} store - location to get details for
     */
    public async getFullDetails(store: IFogStore) {
        return await yelpSearchFull(store.yelpId);
    }

    /**
     * Updates state to currently selected store based on marker
     * @param {number} id - id of store reference by the marker
     * @returns void
     */
    public selectMarker = (id: number) => {
        this.filterStores(id);
        this.setState({ selectedStoreId: id });
    }

    /**
     * Updates state to reset selected store
     * @returns void
     */
    public deselectMarker = () => {
        this.setState({ stores: this.stores, selectedStoreId: 0 });
    }

    /**
     * Filter store list based on a store id
     * @param {number} id - store id to find
     * @returns void
     */
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

    /**
     * Retrieves stores from local web storage
     * @returns IFogStore[] if stores exist or null
     */
    public getCachedLocalStores = () => {
        const stores = localStorage.getItem('stores');
        if (!stores) { return null; }

        return JSON.parse(stores) as IFogStore[];
    }

    /**
     * Stores a list of stores in local web storage
     * @param {IFogStore[]} stores - list of stores
     * @returns void
     */
    public cacheLocalStores = (stores: IFogStore[]) => {
        localStorage.setItem('stores', JSON.stringify(stores));
    }

    public openSideMenu = () => {
        this.setState({ isSideMenuOpen: !this.state.isSideMenuOpen });
    }

    public render() {
        // if (this.state.hasErrors) {
        //     return <p className='error-boundary'>Unable to fetch stores.</p>;
        // } else {
        return (
            <div className='app-container'>
                {/* Hamburger Menu Button */}
                <nav role='navigation'>
                    <header className='main-title'>Munchie Surfing</header>
                    <Hamburger
                        isSideMenuOpen={this.state.isSideMenuOpen}
                        openSideMenu={this.openSideMenu} />
                </nav>

                {/* Slideout Side Menu Section */}
                {/* TODO: move to a sidebar component */}
                {this.state.isSideMenuOpen
                    && <div
                        id='sidebar-section'
                        className={this.state.isSideMenuOpen ? `sidebar-section is-active` : `sidebar-section`}>
                        <div className='sidebar-items'>
                            <header className='store-list-header' tabIndex={-1}>Store List</header>
                            <hr />

                            {/* Filter Stores  */}

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
                                    stores={this.state.stores}
                                    selectedStoreId={this.state.selectedStoreId}
                                />
                            </ErrorBoundary>

                        </div>
                    </div>
                }

                {this.state.hasErrors &&
                    <p className='yelp-error'>
                    <a className='yelp-link'><img
                        className='yelp-logo'
                        src='./Yelp_trademark_RGB.png'
                        alt={'Image of yelp logo'} />
                        Yikes! Unable to fetch store data from Yelp.
                    </a>
                    </p>}

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
                        stores={this.state.stores}
                        selectedStoreId={this.state.selectedStoreId}
                        selectMarker={this.selectMarker}
                        deselectMarker={this.deselectMarker}
                        gotStoreData={this.state.gotStoreData}
                    />
                </ErrorBoundary>

            </div>
        );
        // }
    }
}

export default App;
