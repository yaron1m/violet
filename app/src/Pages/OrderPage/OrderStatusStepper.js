import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash'
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import {progressiveStatuses} from "../../Util/Constants/Status";

export default class OrderStatusStepper extends React.Component {

    render() {

        return (
            <Stepper
                nonLinear
                style={{backgroundColor: "inherit"}}
            >
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
