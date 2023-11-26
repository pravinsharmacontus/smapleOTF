import React, { Fragment, useState, useRef, createRef } from "react";
import "croppie/croppie.css";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { useSelector } from "react-redux";
import Modal from "../../../../../common/Modal";
import AddCohostPopup from "../../AddCohostPopup";
import { Iconplus } from "../../../../../assets/img";
import { ToastService } from "../../../../../common";
import { LOGO_SIZE } from "../../../../../helper/ApiUrl";
import { IconPremium } from "../../../../../assets/images";
import { getStageData } from "../../../../../aws/awsHelper";
import OutsideClickHandler from "react-outside-click-handler";
import toastService from "../../../../../common/toastServices";
import { handleUploadImage } from "../../../../../firebase/firebaseStorageFunctions";
import { handleUploadImageDimensions } from "../../../../../firebase/firebaseRealtimeFunctions";
import { currentStageArrn, getCurrentOrgId } from "../../../../../helper/utility";

const ReactCropper = (_props = {}) => {
    const { disableClick = false } = _props;
    const fileInputRef = useRef();
    const cropperRef = createRef();
    const [showTrailPopup, setShowTrailPopup] = useState(false);
    const [getFile, setFile] = useState("");
    const [getFileName, setFileName] = useState("");
    const awsStageReducer = useSelector((state) => state?.awsStageReducer);
    const stageData =
        awsStageReducer.method === "create"
            ? getStageData(awsStageReducer)
            : awsStageReducer;
    const [getCroppiePopUp, setCroppiePopUp] = useState(false);
    const { closeDropDown = () => { }, trailOrPaidUser = "", _handleResizedImage = () => { } } = _props;

    const profileImageValidate = (img, width, height) => {
        const allowedImageTypes = ["image/png", "image/jpeg", "image.jpg"];
        if (allowedImageTypes.includes(img.type)) {
            handleUploadImage(img, stageData);
            handleUploadImageDimensions(getCurrentOrgId(), currentStageArrn(awsStageReducer), width, height);
        } else {
            ToastService.error("Image type only allowed to upload");
        }
    };

    /**
     * dataURLtoFile() to convert base64 to file.
     */

    const handleImageSizeCalculator = (imageUrlData, _getWidth, _getHeight) => {
        const staticWidth = 185;
        const staticHeight = 59;

        if (_getWidth === _getHeight && _getWidth > 0 && _getHeight >= 76) {
            _handleResizedImage(76, 76);
            profileImageValidate(imageUrlData, 76, 76);
        }
        else if (_getWidth > _getHeight) { //landscape
            if (_getWidth > staticWidth) {
                console.log("_getWidth > staticWidth landscape img");
                if ((staticWidth * _getHeight) / _getWidth < staticHeight) {
                    const ratioCalculatedWidth = staticWidth;
                    const ratioCalculatedHeight = (staticWidth * _getHeight) / _getWidth;
                    console.log(ratioCalculatedWidth, ratioCalculatedHeight, "(staticWidth * _getHeight) / _getWidth < staticHeight landscape img");
                    _handleResizedImage(ratioCalculatedWidth, ratioCalculatedHeight);
                    profileImageValidate(imageUrlData, ratioCalculatedWidth, ratioCalculatedHeight);
                }
                else {
                    const ratioCalculatedWidth = (_getWidth * staticHeight) / _getHeight;
                    const ratioCalculatedHeight = staticHeight;
                    console.log(ratioCalculatedWidth, ratioCalculatedHeight, "else (staticWidth * _getHeight) / _getWidth < staticHeight landscape img");
                    _handleResizedImage(ratioCalculatedWidth, ratioCalculatedHeight);
                    profileImageValidate(imageUrlData, ratioCalculatedWidth, ratioCalculatedHeight);
                }
            }
            else {
                console.log(_getWidth, _getHeight, " img");
                _handleResizedImage(_getWidth, _getHeight);
                profileImageValidate(imageUrlData, _getWidth, _getHeight);
            }
        }
        else if (_getWidth < _getHeight) { //portrait
            const ratioCalculatedWidth = (_getWidth * staticHeight) / _getHeight;
            const ratioCalculatedHeight = staticHeight;
            _handleResizedImage(ratioCalculatedWidth, ratioCalculatedHeight);
            profileImageValidate(imageUrlData, ratioCalculatedWidth, ratioCalculatedHeight);
        }
        else {
            _handleResizedImage(_getWidth < 50 ? 50 : _getWidth, _getHeight < 50 ? 50 : _getHeight);
            profileImageValidate(imageUrlData, _getWidth < 50 ? 50 : _getWidth, _getHeight < 50 ? 50 : _getHeight);
        }
    };

    /**
     * dataURLtoFile() to convert base64 to file.
     */
    const dataURLtoFile = (dataurl, filename) => {
        setCroppiePopUp(true);
        const dataarr = dataurl.split(","),
            mime = dataarr[0].match(/:(.*?);/)[1], //NOSONAR not used in secure contexts
            bstr = atob(dataarr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        //NOSONAR
        while (n--) {
            const charbuffer = bstr.charCodeAt(n);
            u8arr[n] = charbuffer;
        }
        const blob = new Blob([u8arr], { type: mime });
        blob["lastModifiedDate"] = new Date();
        blob["name"] = filename;
        return blob;
    };

    const CropImage = () => {
        if (typeof cropperRef.current?.cropper !== "undefined") {
            const imageData = cropperRef.current.cropper.getData();
            const width = Math.round(imageData.width);
            const height = Math.round(imageData.height);
            console.log(imageData, width, height, "imageDataimageData");
            const imageUrlData = dataURLtoFile(cropperRef.current?.cropper.getCroppedCanvas().toDataURL(), getFileName || "");
            handleImageSizeCalculator(imageUrlData, width, height);
        }
        setCroppiePopUp(false);
    };

    const handleCloseCroppie = () => {
        setCroppiePopUp(false);
    };

    /**
     * validateBeforeUpload() to validate the uploaded image.
     */
    const validateBeforeUpload = (file = {}) => {
        const fileName = file.name;
        const fileSize = Math.round(file.size / 1024);
        if (!/\.(jpe?g|png)$/i.test(fileName)) {
            toastService.errorToast("Image should be in jpeg or png format");
            return {
                messsage: "Image type only allowed to upload",
                error: true,
            };
        }
        if (fileSize > LOGO_SIZE) {
            toastService.errorToast("Please Upload Image Size less than 5 MB");
            return {
                messsage: "Please Upload Image Size less than 5 MB",
                error: true,
            };

        }
        return {
            error: false,
        };
    };

    /**
     * fileChangedHandler() to handle the validations.
     */
    const fileChangedHandler = (event = {}) => {
        event.preventDefault();
        let files;
        if (event.dataTransfer) {
            files = event.dataTransfer?.files[0];
        } else if (event.target) {
            files = event.target?.files[0];
        }
        const isValid = validateBeforeUpload(files);
        event.target.value = "";
        if (isValid.error) {
            ToastService.error(isValid.messsage);
            event.preventDefault();
        } else {
            setCroppiePopUp(true);
            const { name = "" } = files;
            setFileName(name);
            const reader = new FileReader();
            reader.onload = () => {
                setFile(reader.result);
            };
            reader.readAsDataURL(files);
        }
    };

    const setPopupState = () => {
        setShowTrailPopup(true);
    };

    return (
        <Fragment>
            <input
                style={{ zIndex: -999, position: "relative", width: 0, height: 0, opacity: 0 }}
                ref={fileInputRef}
                type="file"
                accept="image/*"
                id="logoUpload"
                onChange={fileChangedHandler}
                onClick={closeDropDown}
            />
            <button
                type="button"
                onClick={trailOrPaidUser !== "BASIC" ? (event) => {
                    event.preventDefault();
                    fileInputRef.current.click();
                } : setPopupState}
                className="brand_image choose"
            >
                <i className="plus">
                    <Iconplus />
                </i>
                {trailOrPaidUser === "BASIC" ? <i className={`icon_premium ${showTrailPopup ? "visible" : ""}`}>
                    <IconPremium />
                </i> : null}
                <span>Upload</span>
            </button>
            {getCroppiePopUp ? (
                <Modal>
                    <div class="PopupWrapper fixed xs">
                        <div class="PopupInner ActionPopup ">
                            <div className="scroll">
                                <div className="croppie_wraper">
                                    <OutsideClickHandler
                                        className="cropper_wraper"
                                        onOutsideClick={disableClick ? () => { } : () => {
                                            handleCloseCroppie();
                                        }}
                                    >
                                        <div className="croppie_header">
                                            <h4>Crop Logo</h4>
                                        </div>
                                        <div className="croppie_body">
                                            <Cropper
                                                ref={cropperRef}
                                                style={{ height: 490, width: "100%" }}
                                                zoomTo={0.5}
                                                initialAspectRatio={1}
                                                src={getFile}
                                                viewMode={1}
                                                minCropBoxHeight={10}
                                                minCropBoxWidth={10}
                                                background={false}
                                                responsive={true}
                                                autoCropArea={1}
                                                checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
                                                guides={true}
                                            />
                                        </div>
                                        <div className="croppie_actions">
                                            <div className="croppie_actions_list">
                                                <button
                                                    type="button"
                                                    onClick={handleCloseCroppie}
                                                    className="default "
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={CropImage}
                                                    className="action red"
                                                >
                                                    Crop
                                                </button>
                                            </div>
                                        </div>
                                    </OutsideClickHandler>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>
            ) : null}
            {showTrailPopup ? <AddCohostPopup
                _handleOnOutsideClick={() => setShowTrailPopup(false)}
                type="TrailUserLogo"
            /> : null}
        </Fragment>
    );
};

export default ReactCropper;
