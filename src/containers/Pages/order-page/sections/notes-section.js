import React from 'react';
import CustomPaper from "../../../../components/custom-components/custom-paper";
import {connect} from 'react-redux';
import CustomText from "../../../../components/custom-components/custom-text-field";
import {updateSelectedOrder} from "../../../../store/selected/actions";
import {getLabels} from "../../../../store/labels/reducer";

class NotesSection extends React.Component {

    render() {
        const fieldData = {
            titles: this.props.labels.titles,
            values: this.props.selected.order,
            updateAction: function (key, value) {
                this.props.dispatch(updateSelectedOrder(key, value));
            }.bind(this)
        };

        return (
            <CustomPaper title={this.props.labels.sectionName}>
                <CustomText data={fieldData} name="notes" fullWidth={true}/>
            </CustomPaper>
        );
    }
}


function mapStateToProps(state) {
    return {
        labels: getLabels(state).pages.orderPage.sections.notes,
        selected: state.selected,
    };
}
export default connect(mapStateToProps)(NotesSection);