import React from 'react';
import CustomCard from "../../../components/formFields/custom-card";
import Toggle from "material-ui/Toggle";
import CustomDatePicker from "../../../components/formFields/custom-date-picker";
import TextField from 'material-ui/TextField';
import {black} from 'material-ui/styles/colors';
import {connect} from 'react-redux';

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
            floatingLabelText: {
                color: black
            }
        };

        return (
            <CustomCard
                title={this.props.labels.sectionName}
                // isOpen = {} //Base this on the toggle state
            >
                <div style={style.flex}>
                    <Toggle
                        //label={this.props.labels.fields.followUpRequired}
                        style={style.toggle}
                        onToggle={this.onToggle.bind(this)}
                    />

                    <CustomDatePicker
                        title={this.props.labels.fields.followUpDate}
                        disabled={this.state.disabled}
                        size="L"
                    />
                </div>


                <div>
                    <TextField
                        floatingLabelText={this.props.labels.fields.followUpDetails}
                        floatingLabelStyle={style.floatingLabelText}
                        fullWidth={true}
                        multiLine={true}
                        rowsMax={4}
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