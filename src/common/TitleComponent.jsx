import React, { useEffect, useRef } from 'react';
import { isEllipsisActive } from './helper';

const TitleComponent = (props = {}) => {
    const ellipsis = useRef(null);
    const { text = '' } = props;

    useEffect(() => {
        if (isEllipsisActive(ellipsis)) {
            ellipsis.current.title = text;
        }
    }, []);
    return (
        <div className="emailVerify" style={{ maxWidth: "280px" }} >
            <div className="ellipsisCustom">
                <div ref={ellipsis} className="ellipsis"
                    style={{ maxWidth: "calc(100%)" }}>
                    {text}
                </div>
            </div>
        </div >
    );
};

export default TitleComponent;
