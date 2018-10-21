import * as React from 'react';
import { IFogStore } from '../StoreData';
import Store from './Store';
import './StoreList.css';

export interface IProps {
    stores: IFogStore[];
    selectedStoreId: number;
    selectStore: (id: number) => void;
}

const StoreList: React.SFC<IProps> = (props: IProps) => {
    let filteredStores;
    
    if (props.selectedStoreId) {
       filteredStores = props.stores.filter((store: any) => {
        return store.id === props.selectedStoreId;
        });
    } else {
        filteredStores = props.stores;
    }

    return (
        <nav aria-labelledby='filtered-stores' className='store-list-container' id='store-list-nav'>
            <ul id='filtered-stores' aria-expanded={true} role='menu' className='store-list'>
                {filteredStores.map((store: any, index: number) => {
                    return (
                        <li
                            key={index}
                            className='store'
                            onClick={() => props.selectStore(Number(store.id))}>
                            <Store store={store} />
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};

export default StoreList;