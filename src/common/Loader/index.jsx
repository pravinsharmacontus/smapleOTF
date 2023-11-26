import React from 'react';
import { IconLoader } from "../../assets/images";
import LoaderModal from './LoaderModal';

const Loader = (props = {}) => {

    const {
        type = "",
        imageLoader = true,
    } = props || {};

    return (
        <React.Fragment>
            {imageLoader ?
                <LoaderModal>
                    <div className={`pageLoader ${type === "" ? "" : type}`}>
                        <i><IconLoader /></i>
                    </div>
                </LoaderModal>
                :
                <LoaderModal>
                    <div className="css_loader_spinner">
                        <div className="css_spinner_inner"><div></div></div></div>
                </LoaderModal>
            }
        </React.Fragment>
    );
};
export default Loader;
