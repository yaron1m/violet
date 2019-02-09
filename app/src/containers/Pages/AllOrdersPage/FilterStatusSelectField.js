import _ from 'lodash';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getStatusLabels} from "../../../Store/Labels/Selectors";
import {Sizes} from "../../../Util/Constants/Sizes";
import CustomSelectField from "../../../Components/CustomComponents/CustomSelectField";
import {getLabels} from "../../../Store/Labels/Selectors";

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
    return {
        name: "filterByStatus",
        titles: getLabels(state).pages.allOrdersPage,
        values: {filterByStatus: ownProps.filterStatus},
        updateAction: (key, value) => ownProps.updateStatus(value),
        options: getStatuses(state),
        size: Sizes.XL,
    };
}


const Container = connect(mapStateToProps)(CustomSelectField);

Container.propTypes = {
    updateStatus: PropTypes.func.isRequired,
    filterStatus: PropTypes.string,
};

export default Container;
