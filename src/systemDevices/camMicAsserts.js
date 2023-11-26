import store from "../store";
import {
  camPermmissionStatusAction,
  micPermmissionStatusAction,
} from "../store/action/awsActions";

export const setPermissionOnChange = () => {
  navigator.permissions
    .query({ name: "camera" })
    .then(function (permissionStatus) {
      console.log("camera permission >>>>", permissionStatus.state);
      permissionStatus.onchange = function () {
        console.log("camera permission >>>>  : vh", permissionStatus.state);
        store.dispatch(camPermmissionStatusAction(permissionStatus.state));
      };
    });
  navigator.permissions
    .query({ name: "microphone" })
    .then(function (permissionStatus) {
      console.log("microphone permission >>>>", permissionStatus.state);
      permissionStatus.onchange = function () {
        console.log("microphone permission >>>>  : vh", permissionStatus.state);
        store.dispatch(micPermmissionStatusAction(permissionStatus.state));
      };
    });
};
