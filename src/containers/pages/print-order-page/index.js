import React from 'react';
import connect from "react-redux/es/connect/connect";
import {getLabels} from "../../../store/labels/reducer";
import {getSelectedOrder, getSelectedOrganization} from "../../../store/selected/reducer";
import LectureDetailsPrintSection from "./sections/lecture-details-pring";
import {PrintPageTitle} from "../../../components/custom-components/order-print/print-page-title";

class PrintOrderPage extends React.Component {

    render() {
        if (!this.props.isSelectedOrder)
            return <PrintPageTitle title={this.props.labels.printNoOrderSelected}/>;


        let title = this.props.labels.printOrderNumberLabel;
        title += this.props.selectedOrder.id;
        title += this.props.labels.printOrganizationNameLabel;
        title += this.props.selectedOrganization.organizationName;


        return (
            <div>
                <PrintPageTitle title={title}/>
                <LectureDetailsPrintSection/>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        labels: getLabels(state).pages.printPage,
        selectedOrder: getSelectedOrder(state),
        selectedOrganization: getSelectedOrganization(state),
    };
}

export default connect(mapStateToProps)(PrintOrderPage);