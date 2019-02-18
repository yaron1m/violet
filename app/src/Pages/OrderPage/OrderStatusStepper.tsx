import React from "react";
import _ from 'lodash';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import {progressiveStatuses, Status} from "../../Util/Constants/Status";
import {IStringObject} from '../../Interfaces/IOrder';

export default function OrderStatusStepper(props: OrderStatusStepperProps) {
    return (
        <Stepper
            nonLinear
            style={{backgroundColor: "inherit"}}
        >
            {_.map(progressiveStatuses, (status: string) =>
                <Step
                    key={status}
                    active={status === props.status}
                >
                    <StepLabel>{props.statusLabels[status]}</StepLabel>
                </Step>
            )}
        </Stepper>
    );
}

interface OrderStatusStepperProps {
    status: Status,
    statusLabels: IStringObject,
}

