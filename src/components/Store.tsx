import * as React from 'react';

interface IProps {
    store: {
        name: string,
        id: number,
        key: number
    }
}

const Store: React.SFC<IProps> = (props: IProps) => {
    // const { store } = props;
    return (
        <a>
            <i className='material-icons'>fastfood</i>
            {props.store.name}
        </a>
    );
};

export default Store;