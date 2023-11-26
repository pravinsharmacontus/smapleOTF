import { cssTransition, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const positionToast = "bottom-left";/*position to place */
const animateLeftFadeOut = cssTransition({
     enter: "animate__fadeInLeft",
     exit: "fadeIn-enter"
   });

const toastService = {

     defaultToast: (content) => toast(content, {
          position: positionToast,
          autoClose: true,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
     }),

     successToast: (message, Id = "") => toast.success(message, {
          position: positionToast,
          autoClose: true,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          toastId: Id,
          networkToast: true,
     }),

     errorToast: (message, _customId = "") => toast.error(message, {
          position: positionToast,
          autoClose: true,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          toastId: _customId,
     }),

     warnToast: (message, warnToast = "") => toast.warn(message, {
          position: positionToast,
          autoClose: true,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          toastId: warnToast,
     }),

     infoToast: (message, _informId = "") => toast.info(message, {
          position: positionToast,
          autoClose: true,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          toastId: _informId,
     }),
     infoToastblue: (message, _informId = "") => toast.info(message, {
          className: "info_toast_blue",
          position: positionToast,
          autoClose: true,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          toastId: _informId,
     }),

     APPVersionToast: (message, _informId = "") => toast.info(message, {
          position: positionToast,
          autoClose: true,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          toastId: _informId,
          transition: animateLeftFadeOut
     }),

     networkToast: (message, toastId = "") => toast.error(message, {
          className: "networkToastError",
          position: positionToast,
          autoClose: false,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          toastId: toastId,
          networkToast: true,
     }),

     copyToast: (message, toastId = "") => toast.success(message, {
          position: positionToast,
          autoClose: true,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: true,
          progress: true,
          toastId: toastId,
     }),
     dismissToast: (toastId) => toast.dismiss(toastId),
};
export default toastService;
