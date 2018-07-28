import {connect} from 'react-redux';
import {getLabels} from "../../../store/Labels/Reducer";
import PropTypes from "prop-types";
import CustomTextField from "../../../components/CustomComponents/CustomTextField";
import Sizes from "../../../util/Constants/Sizes";


function mapStateToProps(state, ownProps) {
    return {
        titles: {[ownProps.type]: getLabels(state).pages.loginPage[ownProps.type]},
        values: {[ownProps.type]: ownProps.value},
        requiredFields: [],
        name: ownProps.type,
        type: ownProps.type,
        size: Sizes.XL,
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        updateAction: ownProps.onChange,
        onKeyDown: (event) => {
            if (event.key === "Enter")
                ownProps.onKeyDown();
        }
    }
}

const Container = connect(mapStateToProps, mapDispatchToProps)(CustomTextField);

Container.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onKeyDown: PropTypes.func.isRequired,
};

export default Container;