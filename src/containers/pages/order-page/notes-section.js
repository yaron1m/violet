import React from 'react';
import CustomPage from "../../../components/custom-components/custom-page";
import {connect} from 'react-redux';
import {CustomText} from "../../../components/custom-components/custom-text-field";

class NotesSection extends React.Component {

    render() {
        const fieldData = {
            titles: this.props.labels.titles,
            values: this.props.selected.order,
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
        labels: state.softwareLabels.orderPage.notesSection,
        selected: state.selected,
    };
}
export default connect(mapStateToProps)(NotesSection);