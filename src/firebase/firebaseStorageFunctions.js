import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { destructStage, destructStageId } from "../common/helper";
import store from "../store";
import { updateLogo } from "../store/action/awsActions";
import { firebaseStorage } from "./config";
import { updateLogoUrlData } from "./firebaseRealtimeFunctions";

export const handleUploadImage = (file, stageData, type = "") => {
  if (!file) {
    alert("Please upload an image first!");
  }
  const { orgId = "", stageArn = "" } = stageData;
  const storageRef = ref(
    firebaseStorage,
    `/${orgId}/${destructStageId(destructStage(stageArn))}/${file.name}`
  );

  // progress can be paused and resumed. It also exposes progress updates.
  // Receives the storage reference and the file to upload.
  const uploadTask = uploadBytesResumable(storageRef, file);
  if (type === "no-image") {
    store.dispatch(updateLogo(type));
    updateLogoUrlData(orgId, stageArn, type);
    return;
  }

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const percent = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
      console.log(percent, "percentpercentpercent");
      // update progress
      //   setPercent(percent);
    },
    (err) => console.log(err),
    () => {
      // download url
      getDownloadURL(uploadTask.snapshot.ref).then((url) => {
        console.log(url, "getDownloadURL");
        store.dispatch(updateLogo(url));
        updateLogoUrlData(orgId, stageArn, url);
      });
    }
  );
};
