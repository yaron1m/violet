import _ from 'lodash';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getLabels, getStatusLabels} from "../../../store/labels/reducer";
import Sizes from "../../../util/consts/sizes";
import CustomSelectField from "../../../components/custom-components/custom-select-field";

function getStatuses(state) {
    const statusObjects = _.map(getStatusLabels(state),
        (label, status) => {
            return {
                key: status,
                label
            }
        });

    return _.dropRight(statusObjects);
}

function mapStateToProps(state, ownProps) {
    const fieldData = {
        titles: getLabels(state).pages.allOrdersPage,
        values: {filterByStatus: ownProps.filterStatus},
        updateAction: function () { //TODO remove this once validation is updated
        },
    };

    return {
        data: fieldData,
        name: "filterByStatus",
        options: getStatuses(state),
        size: Sizes.XL,
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        onChange: (value) => ownProps.updateStatus(value),
    }
}

const Container = connect(mapStateToProps, mapDispatchToProps)(CustomSelectField);

Container.propTypes = {
    updateStatus: PropTypes.func.isRequired,
    filterStatus: PropTypes.string.isRequired,
};

export default Container;
