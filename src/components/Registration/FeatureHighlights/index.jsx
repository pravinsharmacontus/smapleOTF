import "./FeatureHighlights.scss";
import React, { memo } from 'react';
import { IconGreenChecked } from '../../../assets/images';

const FeatureHighlights = () => {

    return (
                <div className={` BrandPart `}>
                    <div className='feature_highlight_wraper'>
                        <div className="feature_banner_content">
                            <h2>Bringing You the World in Real Time Live Streaming
                                <div className="dot"></div>
                            </h2>
                            <ul>
                                <li><IconGreenChecked /><p>Always Maintain a <strong>Professional </strong> Appearance</p></li>
                                <li><IconGreenChecked /><p>There will be no <strong>Software Downloads</strong></p></li>
                                <li><IconGreenChecked /><p>You can do <strong>Simulcasting</strong></p></li>
                                <li><IconGreenChecked /><p>Interact with the <strong>Audience</strong></p></li>
                                <li><IconGreenChecked /><p><strong>Personalise </strong> your broadcasts</p></li>
                                <li><IconGreenChecked /><p><strong>24 x 7 Free</strong> Support</p></li>
                            </ul>
                        </div>
                    </div>
                </div>
    );
};

export default memo(FeatureHighlights);
