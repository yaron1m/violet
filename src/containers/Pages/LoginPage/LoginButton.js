import {connect} from 'react-redux';
import RaisedButton from "material-ui/RaisedButton";
import {getLabels} from "../../../store/labels/reducer";
import PropTypes from "prop-types";

function mapStateToProps(state) {
    return {
        label: getLabels(state).pages.loginPage.signIn,
        primary: true,
        style: {marginTop: 10},
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        onClick: ownProps.onClick
    }
}

const Container = connect(mapStateToProps, mapDispatchToProps)(RaisedButton);

Container.propTypes = {
    onClick: PropTypes.func.isRequired,
};

export default Container;