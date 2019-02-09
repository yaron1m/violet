import {connect} from 'react-redux';
import {getLabels} from "../../Store/Labels/Selectors";
import PropTypes from "prop-types";
import {CustomRaisedButton} from "../../Components/CustomComponents/CustomButtons";

function mapStateToProps(state) {
    return {
        label: getLabels(state).pages.loginPage.signIn,
        style: {marginTop: 10},
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        onClick: ownProps.onClick
    }
}

const Container = connect(mapStateToProps, mapDispatchToProps)(CustomRaisedButton);

Container.propTypes = {
    onClick: PropTypes.func.isRequired,
};

export default Container;