import React from 'react';
import {isEmptyValue} from "../../../util/string-util";
import PrintField from "./print-field";

export default class PrintBoolean extends PrintField {

    getValue() {
        const T = "V";
        const F = "X";
        if (isEmptyValue(this.state, "value"))
            return F;

        return super.getValue() ? T : F;
    }
}

PrintBoolean.propTypes = {
    ...PrintField.propTypes
};
