import React from 'react';
import connect from "react-redux/es/connect/connect";
import {getLabels} from "../../../store/labels/reducer";
import {getSelectedOrder, getSelectedOrganization, isSelectedOrder} from "../../../store/selected/reducer";
import {PrintPageTitle} from "../../../components/custom-components/order-print/print-page-title";
import LectureTimesPrintSection from "./sections/lecture-times-print";
import LectureDetailsPrintSection from "./sections/lecture-details-print";
import ContactsPrintSection from "./sections/contacts-print";
import NotesPrintSection from "./sections/notes-print";
import OrganizationPrintSection from "./sections/organization-print";
import FollowUpPrintSection from "./sections/follow-up-print";
import PaymentSection from "./sections/payment-print";

class PrintOrderPage extends React.Component {

    componentDidMount() {
        if (this.props.isSelectedOrder)
            window.print();
    }

    render() {
        if (!this.props.isSelectedOrder)
            return <PrintPageTitle title={this.props.labels.printNoOrderSelected}/>;

        const title = this.props.labels.printOrderNumberLabel
            + this.props.selectedOrder.id
            + ": "
            + this.props.selectedOrganization.organizationName;

        return (
            <div>
                <PrintPageTitle title={title}/>

                <LectureTimesPrintSection/>

                <LectureDetailsPrintSection/>

                <ContactsPrintSection/>

                <NotesPrintSection/>

                <OrganizationPrintSection/>

                {/*<InvoicePrintSection/>*/}

                <PaymentSection/>

                <FollowUpPrintSection/>
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