import React from "react";

const NewImgTag = ({src = "", alt = '', className = ''}) => {

    return (
        <img
            src={src}
            alt={src}
            className={src}
        />
    );
};

export default React.memo(NewImgTag);
