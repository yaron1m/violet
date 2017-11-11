import React from 'react';
import connect from "react-redux/es/connect/connect";
import {getLabels} from "../../../store/labels/reducer";
import {getSelectedOrder, getSelectedOrganization, isSelectedOrder} from "../../../store/selected/reducer";
import {PrintPageTitle} from "../../../components/custom-components/order-print/print-page-title";
import LectureDetailsPrintSection from "./sections/lecture-details-print";
import ContactsPrintSection from "./sections/contacts-print";
import NotesPrintSection from "./sections/notes-print";
import OrganizationPrintSection from "./sections/organization-print";
import FollowUpPrintSection from "./sections/follow-up-print";
import PaymentPrintSection from "./sections/payment-print";

class PrintOrderPage extends React.Component {

    render() {
        if (!this.props.isSelectedOrder)
            return <PrintPageTitle title={this.props.labels.printNoOrderSelected}/>;

        const title = this.props.labels.printOrderNumberLabel
            + this.props.selectedOrder.id
            + this.props.labels.printOrganizationNameLabel
            + this.props.selectedOrganization.organizationName;

        return (
            <div>
                <PrintPageTitle title={title}/>

                <LectureDetailsPrintSection/>

                <ContactsPrintSection isFinancial={false}/>

                <OrganizationPrintSection/>

                <NotesPrintSection/>

                <ContactsPrintSection isFinancial={true}/>

                <FollowUpPrintSection/>

                <PaymentPrintSection/>
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