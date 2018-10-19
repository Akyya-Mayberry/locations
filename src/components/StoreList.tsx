import * as React from 'react';
import { IFogStore } from '../StoreData';
import Store from './Store';
import './StoreList.css';

export interface IProps {
    stores: IFogStore[];
    selectStore: (id: number) => void;
}

const StoreList: React.SFC<IProps> = (props: IProps) => {
    return (
        <nav aria-labelledby='filtered-stores' className='store-list-container' id='store-list-nav'>
            <h2 id='filtered-stores'>Stores</h2>
            <ul aria-expanded={true} role='menu' className='store-list'>
                {props.stores.map((store: any, index: number) => {
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