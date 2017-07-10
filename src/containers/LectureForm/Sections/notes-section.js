import React from 'react';
import CustomPage from "../../../components/formFields/custom-page";
import {connect} from 'react-redux';
import CustomTextField from "../../../components/formFields/custom-text-field";

class NotesSection extends React.Component {

    render() {
        const fieldData = {
            titles: this.props.labels.titles,
            values: {}
        };

        return (
            <CustomPage title={this.props.labels.sectionName}>
                <CustomTextField data={fieldData} name="notes" fullWidth={true}/>
            </CustomPage>
        );
    }
}


function mapStateToProps(state) {
    return {
        labels: state.softwareLabels.lectureForm.notesSection,
    };
}
export default connect(mapStateToProps)(NotesSection);