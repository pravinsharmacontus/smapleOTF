import {
    passwordTypeChange, pathChenage,
    errMsgDesignClass, errMsg,
    formValidate, pageHeading, buttonName,
    errorValidateLoginPage, emptyErrorMsgThrow, emptyErrorMsgThrowDegign, emptyInputErrorMsgThrow,
} from "../../components/Login/loginPageCommon";

describe('loginPageCommonTest cover', () => {

    it('passwordTypeChange test cover', () => {
        expect(passwordTypeChange(true)).toBe("password");
    });
    it('passwordTypeChange test cover', () => {
        expect(passwordTypeChange(false)).toBe("password");
    });

    it('pathchenage sucess test cover', () => {
        expect(pathChenage("/reset-password/:token")).toBe(true);
    });

    it('pathchenage fail test cover', () => {
        expect(pathChenage(null)).toBe(false);
    });

    it('errMsgDesignClass fail test cover', () => {
        expect(errMsgDesignClass(true)).toBe("input error");
    });

    it('errMsgDesignClass sucesstest cover', () => {
        expect(errMsgDesignClass()).toBe(" input ");
    });

    it('errMsg tets cover', () => {
        expect(errMsg(true)).toBe("LOGIN.PASS_ERR_EMPTY");
    });

    it('errMsg tets cover', () => {
        expect(errMsg(false, true)).toBe("LOGIN.PASS_ERR");
    });

    it('errMsg tets cover', () => {
        expect(errMsg(false)).toBe("");
    });

    it('formValidate test cover', () => {
        expect(formValidate(true)).toBe("");
    });

    it('formValidate fail test cover', () => {
        expect(formValidate(false)).toBe("Invalid");
    });

    it('pageHeading Test cover', () => {
        expect(pageHeading(true)).toBe("LOGIN.RESET_YOUR_PASS");
    });

    it('pageHeading fail test cover', () => {
        expect(pageHeading(false)).toBe("LOGIN.CREATE_NEW_PASS");
    });

    it('buttonName test cover', () => {
        expect(buttonName(true)).toBe("LOGIN.SUBMIT");
    });

    it('button name fail test cover', () => {
        expect(buttonName(false)).toBe("LOGIN.CREATE_PASS");
    });

    it('emptyErrorMsgThrow test cover', () => {
        expect(emptyErrorMsgThrow()).toBe(true);
    });

    it('emptyErrorMsgThrowDesign', () => {
        expect(emptyErrorMsgThrowDegign(true)).toBe("input error");
    });

    it('emptyErrorMsgThrow test cover', () => {
        expect(emptyErrorMsgThrowDegign(false)).toBe("input");
    });

    it('emptyInputErrorMsgThrow', () => {
        expect(emptyInputErrorMsgThrow("")).toBe(true);
    });

    it('errorValidateLoginPage test cover', () => {
        expect(errorValidateLoginPage()).toBe(false);
    });
});
