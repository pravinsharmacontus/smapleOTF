import { IconToastInfo, IconToastInfo2 } from "../assets/images";
import { internetStatusDecrypt } from "./Encypt";
import toastService from "../common/toastServices";
import { constantValue } from "../const/errorTypes";

export const infoToast = (successMsg = "", informToastId = "") => {
  toastService.infoToast(
    <div className="customToast">
      <i className="info">
        <IconToastInfo />
      </i>
      <p>{successMsg}</p>
    </div>,
    informToastId
  );
};
export const APPVersionToast = (successMsg = "", informToastId = "") => {
  toastService.APPVersionToast(
    <div className="customToast">
      <i className="info">
        <IconToastInfo />
      </i>
      <p>{successMsg}</p>
    </div>,
    informToastId
  );
};
export const failToast = (failMsg = "", failToastId = "") => {
  if (failMsg === "") {
    return;
  }
  const internetStatus = internetStatusDecrypt() || true;
  toastService.errorToast(
    <div className="customToast">
      <i className="info">
        <IconToastInfo />
      </i>
      <p>{internetStatus ? failMsg : constantValue.INTERNET_ERROR}</p>
    </div>,
    failToastId
  );
};

export const copyToast = (cpyMsg = "", toastId = "") => {
  toastService.copyToast(
    <div className="customToast">
      <i className="info">
        <IconToastInfo />
      </i>
      <p>{cpyMsg}</p>
    </div>,
    toastId
  );
};

export const succToast = (Msg = "", successtoastId = "") => {
  toastService.successToast(
    <div className="customToast">
      <i className="info">
        <IconToastInfo />
      </i>
      <p>{Msg}</p>
    </div>,
    successtoastId
  );
};

export const warnToast = (Msg = "", warnToastId = "") => {
  toastService.warnToast(
    <div className="customToast">
      <i className="info">
        <IconToastInfo2 style={{ width: "17px", height: "17px" }} />
      </i>
      <p>{Msg}</p>
    </div>,
    warnToastId
  );
};

export const serverNotRespond = (msg = "") => {
  const errorMsg = msg ? msg : constantValue.SERVER_ERROR;
  toastService.infoToast(
    <div className="customToast">
      <i className="info">
        <IconToastInfo />
      </i>
      {/* server not(interNet is off that time Fail toast differt from server msg)  */}
      {/* checking interNet is enable or not */}
      <p>{internetStatusDecrypt() ? errorMsg : constantValue.INTERNET_ERROR}</p>
    </div>
  );
};

export const toastInternet = (msg = "") => {
  toastService.infoToast(
    <div className="customToast">
      <i className="info">
        <IconToastInfo />
      </i>
      {/* server not(interNet is off that time Fail toast differt from server msg)  */}
      {/* checking interNet is enable or not */}
      <p>{msg}</p>
    </div>
  );
};
