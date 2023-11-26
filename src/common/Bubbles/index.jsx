import React from 'react';
import "./Bubbles.scss";
import { ImgNoImgPlaceholder } from '../../assets/images';
import { getInitials } from '../../helper';

function Bubbles(props = {}) {
    const { listData = ["Prabhu Mariappan", "", "Rajeshwari Neelamehan", "Abhishek Sahu", "Rajesh Ramachandraiah", "Usha Shree Jayanthi Babu"] } = props;
    return (<>
        {listData.length > 0 ?
            <div className="participant_bubble_wrapper">
                {listData.map((item, i) => {
                    return (
                        <>
                            {i < 3 && (
                                <div tabIndex={1} title={item} className="participant_bubble">
                                    {item === "" ?
                                        <img src={ImgNoImgPlaceholder} alt={item} />
                                        :
                                        <div className="initial">{getInitials(item)}</div>
                                    }
                                    <div className='tooltip_black' style={{ display: "none" }}>{item}</div>
                                </div>
                            )
                            }
                        </>
                    );
                })}
                {listData.length > 4 ? (
                    <div tabIndex={1} title={listData
                        .filter((item, i) => {
                            return i > 2;
                        })
                        .toString()}
                        className="participant_bubble dark">
                        <div className="initial">{"+"}{listData.length - 3}</div>
                        <div className='tooltip_black' style={{ display: "none" }}>{listData
                            .filter((item, i) => {
                                return i > 2;
                            })
                            .toString()}
                        </div>
                    </div>
                ) : null}
            </div> : null
        }
    </>
    );
}

export default Bubbles;
