import {connect} from 'react-redux';
import {getLabels} from "../../Store/Labels/Selectors";
import {CustomRaisedButton} from "../../Components/CustomComponents/CustomButtons";
import {IDispatch, IState} from '../../Interfaces/ReduxInterfaces';

function mapStateToProps(state: IState) {
    return {
        label: getLabels(state).pages.loginPage.signIn,
        style: {marginTop: 10},
    };
}

function mapDispatchToProps(dispatch: IDispatch, ownProps: { onClick: () => void }) {
    return {
        onClick: ownProps.onClick
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomRaisedButton);