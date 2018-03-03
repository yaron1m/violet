import {connect} from 'react-redux';
import {getLabels} from "../../../store/labels/reducer";
import TextField from "material-ui/TextField";
import PropTypes from "prop-types";

function mapStateToProps(state) {
    return {
        floatingLabelText: getLabels(state).pages.loginPage.email,
        type: "email",
        style: {marginRight: 20},
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
    onChange: PropTypes.func.isRequired,
    onKeyDown: PropTypes.func.isRequired,
};

export default Container;