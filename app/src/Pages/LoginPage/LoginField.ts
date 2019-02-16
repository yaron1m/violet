import {connect} from 'react-redux';
import {getLabels} from '../../Store/Labels/Selectors';
import CustomTextField from '../../Components/CustomComponents/CustomTextField';
import {Size} from '../../Util/Constants/Size';
import {IDispatch, IState} from '../../Interfaces/ReduxInterfaces';

function mapStateToProps(state: IState, ownProps: LoginFieldProps) {
    return {
        titles: {[ownProps.type]: getLabels(state).pages.loginPage[ownProps.type]},
        values: {[ownProps.type]: ownProps.value},
        requiredFields: [],
        name: ownProps.type,
        type: ownProps.type,
        size: Size.XL,
    };
}

function mapDispatchToProps(dispatch: IDispatch, ownProps: LoginFieldProps) {
    return {
        updateAction: ownProps.onChange,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomTextField);

interface LoginFieldProps {
    value: string,
    onChange: (key: string, newValue: string) => void,
    type: 'email' | 'password';
}