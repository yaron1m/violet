import React from 'react';
import _ from 'lodash';
import {connect} from 'react-redux';
import {getLabels, getStatusLabels} from "../../../store/labels/reducer";
import Sizes from "../../../util/consts/sizes";
import CustomSelectField from "../../../components/custom-components/custom-select-field";

class FilterStatusChoose extends React.Component {
    constructor() {
        super();
        this.state = {
            filterByStatus: "",
        }
    }

    render() {
        const fieldData = {
            titles: this.props.labels,
            values: this.state,
            updateAction: function (key, value) {
                this.props.updateStatus(value);
                this.setState({
                    filterByStatus: value,
                });
            }.bind(this)
        };

        const statuses = _.dropRight(_.map(this.props.statuses, (label, status) => {
            return {
                key: status,
                label
            }
        }));

        return (
            <CustomSelectField
                data={fieldData}
                name="filterByStatus"
                options={statuses}
                size={Sizes.XL}
            />
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        labels: getLabels(state).pages.allOrdersPage,
        updateStatus: ownProps.updateStatus,
        statuses: getStatusLabels(state)
    };
}

export default connect(mapStateToProps)(FilterStatusChoose);
