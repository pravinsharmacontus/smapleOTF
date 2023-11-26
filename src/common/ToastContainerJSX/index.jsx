import React from "react";
import { ToastContainer } from 'react-toastify';

const ToastContainerJSX = () => {
    return (
        <ToastContainer position="top-right"
            draggable
            rtl={false}
            newestOnTop
            closeOnClick
            pauseOnHover
            hideProgressBar
            autoClose={3000}
            pauseOnVisibilityChange
        />
    );
};
export default React.memo(ToastContainerJSX);
