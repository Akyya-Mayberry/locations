import * as React from 'react';
import Store from './Store';
import './StoreList.css';

export interface IProps {
    stores: any[];
}

const StoreList: React.SFC<IProps> = (props: IProps) => {
    return (
        <div className='store-list-container'>
            <ul className='store-list'>
                {props.stores.map((store: any) => {
                    return (<li key={store.id} className='store'>
                        <Store store={store} />
                        </li>);
                })}
            </ul>
        </div>
    );
};

export default StoreList;