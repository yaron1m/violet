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
            toggled: false
        };
    }
    
    onToggle(event, toggled) {
        this.setState({
            toggled: toggled
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
                isOpen = {this.state.toggled}
            >
                <div style={style.flex}>
                    <Toggle
                        style={style.toggle}
                        onToggle={this.onToggle.bind(this)}
                        toggled={this.state.toggled}
                    />

                    <CustomDatePicker
                        title={this.props.labels.titles.followUpDate}
                        disabled={!this.state.toggled}
                        size="L"
                    />
                </div>


                <div>
                    <CustomTextField
                        data={fieldData}
                        name="followUpDetails"
                        fullWidth={true}
                        disabled={!this.state.toggled}
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