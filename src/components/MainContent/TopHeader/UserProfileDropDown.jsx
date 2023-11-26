import React, { useState } from 'react';
import { getInitials } from '../../../helper';
import { IconSideMenuLogout } from '../../SideMenu/assets';
import CommonImageTag from '../../../common/CommonImageTag';
import { ImgCustomerPlaceholer } from '../../../assets/images';
import OutsideClickHandler from 'react-outside-click-handler';

const UserProfileDropDown = (props = {}) => {

    const {
        image = "",
        email = "",
        userName = "",
        _handleProfileOption = () => { },
    } = props;

    const [tab, setTab] = useState(false);

    const handleProfile = () => {
        setTab(!tab);
    };
    const handleClose = () => {
        setTab(false);
    };

    return (
        <React.Fragment>
            <OutsideClickHandler
                onOutsideClick={() => handleClose()}
            >
                <div className={`${tab ? " open " : " "} profileInfo loggedUserDeatails`}>
                    <button
                        className='profileInitial'
                        onClick={handleProfile}
                    >
                        {image ?
                            <CommonImageTag
                                src={image}
                                name={userName}
                                className="img"
                                placeholder={ImgCustomerPlaceholer}
                            /> : <span className='initial'>{getInitials(userName)}</span>
                        }
                    </button>
                    {/* </Link> */}
                    <div className='userProfileInfo'>
                        <div className=''>
                            <div className='userDetails'>
                                <div className='initial'>
                                    {image ?
                                        <CommonImageTag
                                            src={image}
                                            name={userName}
                                            className="img"
                                            placeholder={ImgCustomerPlaceholer}
                                        /> : <span>{getInitials(userName)}</span>
                                    }
                                </div>
                                <div className='profile' >
                                    <div
                                        title={userName}
                                        className='name'
                                    >
                                        <span>
                                            {userName.toString().length > 20 ?
                                                <div tabIndex={0} className='marque'> {userName} </div>
                                                :
                                                userName
                                            }
                                        </span>
                                    </div>
                                    <small title={email} className='email'>{email}</small>
                                </div>
                            </div>
                            <button
                                tabIndex={0}
                                onClick={() => { _handleProfileOption(); setTab(false); }}
                                data-jest-id={"jest_handleProfileOption"}
                                className='logout' type='button'>
                                <IconSideMenuLogout />
                                <span>Log Out</span>
                            </button>
                        </div>
                    </div>
                </div>
            </OutsideClickHandler>
        </React.Fragment >
    );
};

export default React.memo(UserProfileDropDown);
