import React from 'react';

const EllipseToast = (props = {}) => {
    const { usersName = "", commentMsg = "" } = props;

    const handleMaxStringLength = (string = " ", stringLen = 40) => {
        return string.length > stringLen ? string.substring(0, (stringLen + 1)) + "..." : string;
    };

    const handleStringLength = (string = " ", stringLen = 40) => {
        return string.length > stringLen;
    };
    return (
        <div className="toast_container">
            <div title={handleStringLength(commentMsg, 40) ? `${usersName}- ${commentMsg}` : ""} className="comment">
                {usersName ? <> <strong className="name">{usersName}</strong>{"- "}</> : null}
                    {handleMaxStringLength(commentMsg, 40)}
            </div>
        </div>
    );
}

export default EllipseToast;
