import React, {PropTypes} from 'react';
import Paper from 'material-ui/Paper';
import {white} from 'material-ui/styles/colors';
import labels from '../lables.json';
import {typography} from 'material-ui/styles';
import OrganizationDetailsSection from "./LectureFormSections/OrganizationDetailsSection";
import LectureDetailsSection from "./LectureFormSections/LectureDetailsSection";

class LectureForm extends React.Component {

    render() {

        const style = {
            paper: {
                padding: 10,
                marginTop: 20,
            },
            pageTitle: {
                fontSize: 24,
                fontWeight: typography.fontWeightLight,
                marginBottom: 20
            }
        };

        return (
            <div>
                <span style={style.pageTitle}>{labels.lectureForm.title}</span>

                <OrganizationDetailsSection/>

                <LectureDetailsSection/>

            </div>
        );
    }
}

export default LectureForm;
