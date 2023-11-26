import React, { Fragment, useState, useRef } from "react";
import Cropme from "croppie";
import "croppie/croppie.css";
import Modal from "../../../../../common/Modal";
import { Iconplus } from "../../../../../assets/img";
import { ToastService } from "../../../../../common";
import OutsideClickHandler from "react-outside-click-handler";
import toastService from "../../../../../common/toastServices";
import { LOGO_SIZE } from "../../../../../helper/ApiUrl";
import AddCohostPopup from "../../AddCohostPopup";
import { IconPremium } from "../../../../../assets/images";

let cropme;

export const WebChatCropOption = {
  showZoomer: true,
  enableExif: true,
  enforceBoundary: false,
  enableOrientation: true,
  minZoom: 0.1,
  viewport: { width: 380, height: 380, type: "square" },
  boundary: { width: 400, height: 400 },
};

const Croppie = (_props = {}) => {
  const fileInputRef = useRef();

  const [getFile, setFile] = useState("");
  const [getFileName, setFileName] = useState("");
  const [showTrailPopup, setShowTrailPopup] = useState(false);
  const [getImgfile, setImgfile] = useState("");
  const [getCroppiePopUp, setCroppiePopUp] = useState(false);
  const { closeDropDown = () => {}, handleGetImgSrc = () => {} ,trailOrPaidUser = "" } = _props;

  console.log(getFile, getImgfile, "sonarfix");

  /**
   * dataURLtoFile() to convert base64 to file.
   */
  const dataURLtoFile = (dataurl, filename) => {
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

  const profileImageValidate = (img = {}) => {
    const allowedImageTypes = ["image/png", "image/jpeg", "image.jpg"];
    if (allowedImageTypes.includes(img.type)) {
      handleGetImgSrc(img);
    } else {
      ToastService.error("Image type only allowed to upload");
    }
  };

  const CropImage = () => {
    cropme
      .result({
        type: "base64",
        size: "original",
      })
      .then((base64Url) => {
        profileImageValidate(dataURLtoFile(base64Url, getFileName || ""));
        setCroppiePopUp(false);
      });
  };

  const handleCloseCroppie = () => {
    setCroppiePopUp(false);
  };

  const updateProfileImage = (Imgfile = {}) => {
    if (cropme) cropme.destroy();

    if (Imgfile) {
      setCroppiePopUp(true);
      const { name = "" } = Imgfile;
      setFileName(name);
      setImgfile(Imgfile);
      setTimeout(() => {
        const elementContainer = document.getElementById("croppie_container");
        cropme = new Cropme(elementContainer, WebChatCropOption);
        const readerFile = new FileReader();
        readerFile.onload = function (e) {
          cropme
            .bind({
              url: e.target.result,
            })
            .then(() => {
              Object.assign(document.querySelector(".cr-viewport").style, {
                width: "380px",
                height: "380px",
              });
              cropme.setZoom(0.3);
            });
        };
        readerFile.readAsDataURL(Imgfile);
      }, 300);
    }
  };

  /**
   * validateBeforeUpload() to validate the uploaded image.
   */
  const validateBeforeUpload = (file = {}) => {
    setFile(file);
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
  const fileChangedHandler = (event) => {
    const file = event.target.files[0];
    const isValid = validateBeforeUpload(file);
    event.target.value = "";
    if (isValid.error) {
      ToastService.error(isValid.messsage);
      event.preventDefault();
    } else {
      updateProfileImage(file);
    }
  };
  const setPopupState = () => {
  setShowTrailPopup(true);
  };

  return (
    <Fragment>
      <input
        style={{ zIndex: -999, position: "relative", width: 0, height: 0, opacity: 0}}
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
        }: setPopupState}
        className="brand_image choose"
      >
        <i className="plus"><Iconplus /></i>
        {trailOrPaidUser === "BASIC" ?
         <i className={`icon_premium ${showTrailPopup ? "visible" : ""}`}> <IconPremium/> </i> : null }
        <span>Upload</span>
      </button>
      {getCroppiePopUp ? (
        <Modal>
          <div class="PopupWrapper fixed xs">
            <div class="PopupInner ActionPopup ">
              <div className="scroll">
                <div className="croppie_wraper">
                  <OutsideClickHandler
                    onOutsideClick={() => {
                      handleCloseCroppie();
                    }}
                  >
                    <div
                      className="croppie_container"
                      id="croppie_container"
                    ></div>
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
      {showTrailPopup? <AddCohostPopup
          _handleOnOutsideClick ={() => setShowTrailPopup(false)}
          type="TrailUserLogo"
        /> : null}
    </Fragment>
  );
};

export default Croppie;
