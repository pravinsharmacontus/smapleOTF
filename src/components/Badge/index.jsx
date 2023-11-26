import React from 'react';
import './Badges.scss';

const Badges = (props = {}) => {
    const { icon = "", text = "text", color = "#fff", bgColor = "gray" } = props;
    return (
        <div className='Badges' style={{ color: color, background: bgColor }}>
            <span className='icon'>{icon}</span>
            <span className='text'>{text}</span>
        </div>
    );
};

export default React.memo(Badges);
