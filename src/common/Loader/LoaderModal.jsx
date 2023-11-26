// Modal.js
import React from 'react';
import { createPortal } from 'react-dom';
// We get hold of the div with the id modal that we have created in index.html
const modalRoot = document.getElementById('LoaderModal');
class LoaderModal extends React.Component {
    constructor(props) {
        super(props);
        // We create an element div for this modal
        this.element = document.createElement('div');
    }
    // We append the created div to the div#modal
    componentDidMount() {
        modalRoot && modalRoot.appendChild && modalRoot.appendChild(this.element);
    }
    /**
      * We remove the created div when this Modal Component is unmounted
      * Used to clean up the memory to avoid memory leak
      */
    componentWillUnmount () {
        modalRoot && modalRoot.removeChild && modalRoot.removeChild(this.element);
    }
    render() {
        return createPortal(this.props.children, this.element);
    }
}
export default LoaderModal;
