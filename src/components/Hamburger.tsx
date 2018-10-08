import React from 'react';
import './Hamburger.css';

export interface IProps {
    openSideMenu: () => void;
}

const Hamburger: React.SFC<IProps> = (props: IProps) => {
    return (
        <i 
        onClick={() => props.openSideMenu()} 
        className='material-icons hamburger-icon'>menu</i>
    );
};

export default Hamburger;