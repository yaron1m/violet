import {isEmptyValue} from "../../../util/string-util";
import PrintField from "./PrintField";

export default class PrintDate extends PrintField {

    getValue() {
        if (isEmptyValue(this.state, "value"))
            return null;

        return new Date(super.getValue()).toLocaleDateString();
    }
}

PrintDate.propTypes = {
    ...PrintField.propTypes
};
