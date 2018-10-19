import React from 'react';
import './Hamburger.css';

export interface IProps {
    isSideMenuOpen: boolean;
    openSideMenu: () => void;
}

const Hamburger: React.SFC<IProps> = (props: IProps) => {
    return (
        <button onClick={() => props.openSideMenu()}
            className='toggle-side-menu'
            id='toggle'
            aria-expanded={props.isSideMenuOpen}
            aria-controls='sidebar-section'
            aria-label='Open Side Menu'>
            <i className='fas fa-bars' />
            MunchySurf
        </button>
    );
};

export default Hamburger;