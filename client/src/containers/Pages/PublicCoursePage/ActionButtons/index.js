import React from 'react';
import SavePublicCourseButton from './SavePublicCourseContainer';
import {ActionButtonsBox} from "../../../../components/ActionButtons/ActionButtonsBox";

export default class PublicCourseActionButtons extends React.Component {
    render() {

        return (
            <ActionButtonsBox>

                <SavePublicCourseButton/>

            </ActionButtonsBox>
        );
    }
}