import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ImgNoImgPlaceholderLg } from '../assets/images';

export default class Image extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            src: props.src,
            errored: false,
        };
    }

    replaceImage = (error) => {
        //replacement of broken Image
        error.target.src = this.props.placeholderImg || ImgNoImgPlaceholderLg;
    }

    render() {
        const { src } = this.state;
        const {
            ...props
        } = this.props;

        return (
            <img
                className={this.props.className}
                src={src}
                onError={this.replaceImage}
                {...props}
                alt={this.props.alt}
            />
        );
    }
}

Image.propTypes = {
    src: PropTypes.string,
    fallbackSrc: PropTypes.string,
};
