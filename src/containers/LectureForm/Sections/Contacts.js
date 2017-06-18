import React from 'react';
import labels from '../../../lables.json';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import CardBase from "../SectionBases/CardBase";
import FormLectureField from "../Fields/FormContactField";
import {Divider, Paper} from "material-ui";

class Contacts extends React.Component {

    render() {
        const sectionLabels = labels.lectureForm.contactsSection;

        const style = {
            paper: {
                //backgroundColor: purple100,
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
                    <FormLectureField/>

                    <Divider style={style.divider}/>

                    <FormLectureField/>
                </Paper>
            </CardBase>
        );
    }
}

export default Contacts;
