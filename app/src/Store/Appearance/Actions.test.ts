import * as actions from "./Actions";
import * as actionTypes from "./ActionTypes";

describe("Selected public course actions", () => {
    it("should dispatch action with dialog parameters without actions", () => {
        const result = actions.openDialog("myTitle", "MyContent");

        expect(result).toEqual({
            type: actionTypes.OPEN_DIALOG,
            title: "myTitle",
            content: "MyContent",
            actions: null,
        });
    });

    it("should dispatch action with dialog parameters with actions", () => {
        const result = actions.openDialog("myTitle", "MyContent", []);

        expect(result).toEqual({
            type: actionTypes.OPEN_DIALOG,
            title: "myTitle",
            content: "MyContent",
            actions: [],
        });
    });

    it("should dispatch action to close the dialog", () => {
        const result = actions.closeDialog();

        expect(result).toEqual({
            type: actionTypes.CLOSE_DIALOG,
        });
    });

    it("should dispatch action to open snackbar", () => {
        const result = actions.openSnackbar("message");

        expect(result).toEqual({
            type: actionTypes.OPEN_SNACKBAR,
            message: "message",
        });
    });

    it("should dispatch action to close the snackbar", () => {
        const result = actions.closeSnackbar();

        expect(result).toEqual({
            type: actionTypes.CLOSE_SNACKBAR,
        });
    });

    it("should dispatch action to show required fields", () => {
        const result = actions.showRequiredFields();

        expect(result).toEqual({
            type: actionTypes.SHOW_REQUIRED_FIELDS,
        });
    });

    it("should dispatch action to hide required fields", () => {
        const result = actions.hideRequiredFields();

        expect(result).toEqual({
            type: actionTypes.HIDE_REQUIRED_FIELDS,
        });
    });

});