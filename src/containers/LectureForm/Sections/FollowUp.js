import React from 'react';
import labels from '../../../lables.json';
import CardBase from "../SectionBases/CardBase";
import Toggle from "material-ui/Toggle";
import FormDatePicker from "../Fields/FormDatePicker";
import TextField from 'material-ui/TextField';
import {black} from 'material-ui/styles/colors';

class FollowUp extends React.Component {

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
        const sectionLabels = labels.lectureForm.followUpSection;
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
            <CardBase
                title={sectionLabels.sectionName}
                // isOpen = {} //Base this on the toggle state
            >
                <div style={style.flex}>
                    <Toggle
                        //label={sectionLabels.fields.followUpRequired}
                        style={style.toggle}
                        onToggle={this.onToggle.bind(this)}
                    />

                    <FormDatePicker title={sectionLabels.fields.followUpDate} disabled={this.state.disabled}/>
                </div>


                <div>
                    <TextField
                        floatingLabelText={sectionLabels.fields.followUpDetails}
                        floatingLabelStyle={style.floatingLabelText}
                        fullWidth={true}
                        multiLine={true}
                        rowsMax={4}
                        disabled={this.state.disabled}
                    />
                </div>
            </CardBase>
        );
    }
}

export default FollowUp;