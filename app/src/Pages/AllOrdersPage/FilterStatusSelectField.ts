import _ from 'lodash';
import {connect} from 'react-redux';
import {getLabels, getStatusLabels} from '../../Store/Labels/Selectors';
import {Size} from '../../Util/Constants/Size';
import CustomSelectField from '../../Components/CustomComponents/CustomSelectField';
import {IState} from '../../Interfaces/ReduxInterfaces';
import {Status} from '../../Util/Constants/Status';

function getStatuses(state: IState) {
    const statusObjects = _.map(getStatusLabels(state),
        (label, status) => {
            return {
                key: status,
                label
            };
        });

    return _.dropRight(statusObjects);
}

function mapStateToProps(state: IState, ownProps: FilterStatusSelectFieldProps) {
    return {
        name: 'filterByStatus',
        titles: getLabels(state).pages.allOrdersPage,
        values: {filterByStatus: ownProps.filterStatus as string},
        updateAction: (key: string, value: string) => ownProps.updateStatus(value as Status),
        options: getStatuses(state),
        size: Size.XL,
    };
}

interface FilterStatusSelectFieldProps {
    updateStatus: (status: Status) => void;
    filterStatus?: Status;
}

export default connect(mapStateToProps)(CustomSelectField);