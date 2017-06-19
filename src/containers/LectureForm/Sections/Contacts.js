import React from 'react';
import labels from '../../../lables.json';
import CardBase from "../SectionBases/CardBase";
import FormContactField from "../Fields/FormContactField";
import {Divider, Paper} from "material-ui";

class Contacts extends React.Component {

    render() {
        const sectionLabels = labels.lectureForm.contactsSection;

        const style = {
            paper: {
                display: "inline-block",
            },
            divider: {
                marginTop: 10,
            }
        };

        return (
            <CardBase title={sectionLabels.sectionName}>
                <Paper
                    style={style.paper}
                >
                    <FormContactField/>

                    <Divider style={style.divider}/>

                    <FormContactField/>
                </Paper>
            </CardBase>
        );
    }
}

export default Contacts;
