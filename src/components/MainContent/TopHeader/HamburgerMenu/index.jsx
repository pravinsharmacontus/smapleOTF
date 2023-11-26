import React from 'react';
import './HamburgerMenu.scss';

function HamburgerMenu(props = {}) {

    const handleHamburgerMenu = () => {
        document && document.getElementById("SideMenuWrapper") && document.getElementById("SideMenuWrapper").classList.add("show");
        document && document.getElementById("menuButton") && document.getElementById("menuButton").classList.add("active");
    };

    return (
        <button onClick={handleHamburgerMenu} className='HamburgerMenu'>
            <div id="menuButton" className="menuButton">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </button>
    );
}

export default React.memo(HamburgerMenu);
