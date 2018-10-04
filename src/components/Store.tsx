import * as React from 'react';

interface IProps {
    store: {
        name: string,
        id: number,
        key: number
    }
}

const Store: React.SFC<IProps> = (props: IProps) => {
    const { store } = props;
    return (<h1>{store.name}</h1>);
};

export default Store;