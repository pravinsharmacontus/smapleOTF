import React, { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { titleCart } from "../../helper";
import IndexedDb from "../../helper/IndexDb";
import 'react-lazy-load-image-component/src/effects/blur.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';

/**
 * @param  {string} Src=""}
 * @param  {string} {className=""
 * @param  {string} placeholder=""}
 */
const CommonImageTag = (props = {}) => {
    const {
        src = "",
        name = "",
        className = "",
        placeholder = "",
        justRenderNoApi = false,
        style = ""
    } = props || {};

    const indexedDb = useMemo(() => new IndexedDb(), []);
    const [Images, setImages] = useState(placeholder);

    /**
     * @param  {string} ImgSrc
     * getImage from IndexedDB
     */
    const getImages = async (ImgSrc = "") => {
        const images = await indexedDb.getItem(ImgSrc);//loads image from localdb
        setImages(images);
    };

    const altPrint = (nameAlt = "") => {
        if (nameAlt) {
            return titleCart(nameAlt, 5);
        }
        return "No-Image";
    };

    /**
     * @param  {string} ImageSrc
     * (ImageSrc->img src string
     */
    useEffect(() => {
        if (src && !justRenderNoApi) {
            getImages(src); //to get imagesrc within customerprofile
        }
    }, [src]);
    // image and name Render area

    return (
        <React.Fragment>
            {justRenderNoApi ?
                <LazyLoadImage
                    src={src}
                    style={style}
                    alt={altPrint(name)}
                    className={className}
                />
                : <div className={`${className}`}>
                    <LazyLoadImage
                        style={style}
                        src={Images || placeholder}
                        // placeholderSrc={placeholder}
                        alt={altPrint(name)}
                    />
                </div>
            }
        </React.Fragment>
    );
};
CommonImageTag.propTypes = {
    src: PropTypes.string,
    name: PropTypes.string,
    className: PropTypes.string,
    placeholder: PropTypes.string,
};
export default React.memo(CommonImageTag);
