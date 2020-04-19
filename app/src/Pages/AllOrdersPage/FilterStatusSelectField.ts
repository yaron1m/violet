import _ from "lodash";
import {connect} from "react-redux";
import {Size} from "../../Util/Constants/Size";
import CustomSelectField from "../../Components/CustomComponents/CustomSelectField";
import {IState} from "../../Interfaces/ReduxInterfaces";
import {getStatusLabels, Status} from "@violet/common";

function getStatuses() {
    const statusObjects = _.map(getStatusLabels(),
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
        title: "סנן לפי סטאטוס",
        value: ownProps.filterStatus as string,
        onChange: (value: string) => ownProps.updateStatus(value as Status),
        options: getStatuses(),
        size: Size.XL,
    };
}

interface FilterStatusSelectFieldProps {
    updateStatus: (status: Status) => void;
    filterStatus?: Status;
}

export default connect(mapStateToProps)(CustomSelectField);