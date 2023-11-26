import React from 'react';
import './Login.scss';
import { IconLogoHeader, Tickcircle, Brand, ImgLoginBg } from '../../assets/images';

const LoginBrandInfo = () => {
    const tempHide = false;
    return (
        <React.Fragment>
            <div style={{ backgroundImage: `url(${ImgLoginBg})` }} className='LeftSection'>
            <div className="branding-logo">
                <i className="logo" ><IconLogoHeader /></i>
                <h1>Try MirrorFly for 21 days</h1>
                <h2>It's easy, free, and you can start building immediately!</h2>
                <div className='Steps'>
                    <p><Tickcircle /> Easy Setup, No Coding Required</p>
                    <p><Tickcircle /> Scale without Limits</p>
                    <p><Tickcircle /> Migrate without Data Loss</p>
                </div>
                <p className='Txt'>Build a chat platform in minutes with our APIs, SDKs, UIKits, and sample apps.</p>
                </div>
                <div className="branding">
                <h5>World's Leading Brands Trust Us!</h5>
                <div className='Brandinn'>
                    <img src={Brand} alt="Brands" className='Brand' />
                </div>
                {tempHide && <p className='copyright'>©2022 MirrorFly.com. All Rights Reserved.</p>}
                </div>
            </div>
        </React.Fragment >
    );
};
export default React.memo(LoginBrandInfo);
