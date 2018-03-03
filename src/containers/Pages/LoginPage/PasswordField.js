import {connect} from 'react-redux';
import {getLabels} from "../../../store/labels/reducer";
import TextField from "material-ui/TextField";
import PropTypes from "prop-types";

function mapStateToProps(state, ownProps) {
    return {
        floatingLabelText: getLabels(state).pages.loginPage.password,
        type: "password",
        style: {marginRight: 20},
        errorText: ownProps.errorText,
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        onChange: ownProps.onChange,
        onKeyDown: (event) => {
            if (event.key === "Enter")
                ownProps.onKeyDown();
        }
    }
}

const Container = connect(mapStateToProps, mapDispatchToProps)(TextField);

Container.propTypes = {
    errorText: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onKeyDown: PropTypes.func.isRequired,
};

export default Container;