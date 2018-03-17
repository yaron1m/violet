import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash'
import {Step, StepLabel, Stepper} from "material-ui";
import {progressiveStatuses} from "../../../util/consts/status";

export default class OrderStatusStepper extends React.Component {

    render() {

        return (
            <Stepper linear={false}>
                {_.map(progressiveStatuses, status =>
                    <Step
                        key={status}
                        active={status === this.props.status}
                    >
                        <StepLabel>{this.props.statusLabels[status]}</StepLabel>
                    </Step>
                )}
            </Stepper>
        );
    }
}

OrderStatusStepper.propTypes = {
    status: PropTypes.string,
    statusLabels: PropTypes.object,
};

