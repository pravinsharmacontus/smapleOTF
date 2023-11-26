import i18next from "i18next";
import { checkWhiteSpaces, nameValidate, startWithAlphanumeric, titleNameValidate, underscoreNotAllowed } from "../../../../helper/Validation";

export const translate = (key) => {
  return i18next.t(key);
};
export function createBroadCastValidation(data = {}) {
  switch (data.name) {
    case "title":
      if (!checkWhiteSpaces(data.value)) return "Please enter the Title";
      if (!titleNameValidate(data.value)) return "Maximum 128 characters allowed";
      if (startWithAlphanumeric(data.value)) return "Title should start with Text only";
      if (underscoreNotAllowed(data.value)) return "Special character not allowed ";
      return "";
    case "displayName":
      if (!checkWhiteSpaces(data.value)) return "Please enter the Display Name";
      if (!nameValidate(data.value)) return translate("ERROR.NAME");
      return "";
    default:
      return "";
  }
}
