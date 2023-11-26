import React from 'react';
import { addAndeditMember, } from './addMemberCommon';
import { IconClose3 } from '../../../../../assets/images';
import Loader from '../../../../../common/Loader';

const AddMemberHeading = (props = {}) => {
    const {
        memberState = false,
        imageLoad = false,//loader
        onMemberPageClose,//add member top close icon click
    } = props;

    return (
        <React.Fragment>

            {imageLoad &&
                < Loader type={"fixed overlay"} />
            }

            <div className="PopupFormHeader">
                <div className="Title">
                    <i>
                        <span>
                            {addAndeditMember(memberState)}
                        </span>
                    </i>
                </div>
                <span
                    title="Close"
                    className="close"
                    onClick={onMemberPageClose}
                >
                    <IconClose3 />
                </span>
            </div>
        </React.Fragment>);
};
export default React.memo(AddMemberHeading);
