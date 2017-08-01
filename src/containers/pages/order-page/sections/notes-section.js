import React from 'react';
import CustomPage from "../../../../components/custom-components/custom-page";
import {connect} from 'react-redux';
import CustomText from "../../../../components/custom-components/custom-text-field";
import {updateSelectedOrder} from "../../../../store/selected/actions";
import {getLabels} from "../../../../store/labels/reducer";

class NotesSection extends React.Component {

    render() {
        const fieldData = {
            titles: this.props.labels.titles,
            values: this.props.selected.order,
            updateAction: updateSelectedOrder,
            dispatch: this.props.dispatch,
        };

        return (
            <CustomPage title={this.props.labels.sectionName}>
                <CustomText data={fieldData} name="notes" fullWidth={true}/>
            </CustomPage>
        );
    }
}


function mapStateToProps(state) {
    return {
        labels: getLabels(state).orderPage.notesSection,
        selected: state.selected,
    };
}
export default connect(mapStateToProps)(NotesSection);