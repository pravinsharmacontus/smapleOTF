import { containsEmoji } from "../helper/Validation";
import { constantValue } from "./errorTypes";

/**
* input field 50 char and whiteSpace error
*/
export const subjectErrorMsg = (ErrorSubject = false, subjectWhiteSpaceErr = false, fullName = "") => {
    if (ErrorSubject) {
        return constantValue.CHAR_ERROR_50;
    } else if (!containsEmoji(fullName)) {
        return constantValue.EMOJI_ERROR;
    } else if (subjectWhiteSpaceErr) {
        return constantValue.SPACERROR;
    } else {
        return "";
    }
};

/**
* input field 50 char and whiteSpace error
*/
export const subjectErrorMsg2 = (ErrorSubject = false, subjectWhiteSpaceErr = false) => {
    if (ErrorSubject) {
        return constantValue.CHAR_ERROR_15;
    } else if (subjectWhiteSpaceErr) {
        return constantValue.SPACERROR;
    } else {
        return "";
    }
};

/**
* input field 50 char and whiteSpace error
*/
export const subjectTickeErrorMsg = (ErrorSubject = false, subjectWhiteSpaceErr = false) => {
    if (ErrorSubject) {
        return constantValue.CHAR_ERROR_250;
    } else if (subjectWhiteSpaceErr) {
        return constantValue.SPACERROR;
    } else {
        return "";
    }
};

/**
* Details input field 500 char and whiteSpace error
*/
export const detailsErrorMsg = (ErrorDetails = false, detailsWhiteSpaceErr = false) => {
    if (ErrorDetails) {
        return constantValue.CHAR_ERROR_500;
    } else if (detailsWhiteSpaceErr) {
        return constantValue.SPACERROR;
    } else {
        return "";
    }
};

export const ticketDiscriptionError = (ErrorDetails = false, detailsWhiteSpaceErr = false) => {
    if (ErrorDetails) {
        return constantValue.CHAR_ERROR_2000;
    } else if (detailsWhiteSpaceErr) {
        return constantValue.SPACERROR;
    } else {
        return "";
    }
};

/**
* Details input field 100 char and whiteSpace error
*/
export const addressErrorMsg = (ErrorDetails = false, detailsWhiteSpaceErr = false) => {
    if (ErrorDetails) {
        return constantValue.CHAR_ERROR_100;
    } else if (detailsWhiteSpaceErr) {
        return constantValue.SPACERROR;
    } else {
        return "";
    }
};

/**
* Details input field 100 char and whiteSpace error
*/
export const emailIdErrorMsg = (charRest = false, ErrorDetails = false) => {
    if (charRest) {
        return constantValue.CHAR_ERROR_50;
    } else if (ErrorDetails) {
        return constantValue.EMAIL_ID_ERROR;
    } else {
        return "";
    }
};
