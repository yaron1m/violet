import React from 'react';
import connect from "react-redux/es/connect/connect";
import {getLabels} from "../../../store/labels/reducer";
import {getSelectedOrder, getSelectedOrganization, isSelectedOrder} from "../../../store/selected/reducer";
import LectureDetailsPrintSection from "./sections/lecture-details-print";
import ContactsPrintSection from "./sections/contacts-print";
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
                <ContactsPrintSection/>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        labels: getLabels(state).pages.printPage,
        selectedOrder: getSelectedOrder(state),
        selectedOrganization: getSelectedOrganization(state),
        isSelectedOrder: isSelectedOrder(state),
    };
}

export default connect(mapStateToProps)(PrintOrderPage);