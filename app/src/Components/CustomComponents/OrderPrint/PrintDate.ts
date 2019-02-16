import {isEmptyValue} from '../../../Util/StringUtil';
import PrintField from './PrintField';

export default class PrintDate extends PrintField {
    getValue() {
        if (isEmptyValue(this.state, 'value'))
            return '';

        return new Date(super.getValue()).toLocaleDateString();
    }
}