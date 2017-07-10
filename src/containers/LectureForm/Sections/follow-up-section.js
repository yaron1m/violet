import React from 'react';
import CustomCard from "../../../components/formFields/custom-card";
import Toggle from "material-ui/Toggle";
import CustomDatePicker from "../../../components/formFields/custom-date-picker";
import {connect} from 'react-redux';
import CustomTextField from "../../../components/formFields/custom-text-field";

class FollowUpSection extends React.Component {

    constructor() {
        super();
        this.state = {
            disabled: true
        };
    }
    
    onToggle(event, isInputChecked) {
        this.setState({
            disabled: !isInputChecked
        });
    }

    render() {
        const style = {
            toggle: {
                maxWidth: 50,
                paddingBottom: 10
            },
            flex: {
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                alignItems: "flex-end"
            },
        };

        const fieldData = {
            titles: this.props.labels.titles,
            values: {}
        };

        return (
            <CustomCard
                title={this.props.labels.sectionName}
                // isOpen = {} //Base this on the toggle state
            >
                <div style={style.flex}>
                    <Toggle
                        style={style.toggle}
                        onToggle={this.onToggle.bind(this)}
                    />

                    <CustomDatePicker
                        title={this.props.labels.titles.followUpDate}
                        disabled={this.state.disabled}
                        size="L"
                    />
                </div>


                <div>
                    <CustomTextField
                        data={fieldData}
                        name="followUpDetails"
                        fullWidth={true}
                        disabled={this.state.disabled}
                    />
                </div>
            </CustomCard>
        );
    }
}

function mapStateToProps(state) {
    return {
        labels: state.softwareLabels.lectureForm.followUpSection,
    };
}
export default connect(mapStateToProps)(FollowUpSection);