import React from 'react';
import {PrintPageTitle} from "../../../components/custom-components/order-print/print-page-title";
import LectureTimesPrintSection from "./sections/LectureTimesPrintContainer";
import LectureDetailsPrintSection from "./sections/LectureDetailsContainer";
import ContactsPrintSection from "./sections/ContactPrintContainer";
import NotesPrintSection from "./sections/NotesPrintContainer";
import OrganizationPrintSection from "./sections/OrganizationPrintContainer";
import FollowUpPrintSection from "./sections/FollowUpPrintContainer";
import PaymentSection from "./sections/PaymentPrintContainer";

export default class PrintOrderPage extends React.Component {

    componentDidMount() {
        this.props.onLoad();
    }

    render() {
        if (!this.props.isSelectedOrder)
            return <PrintPageTitle title={this.props.title}/>;

        return (
            <div>
                <PrintPageTitle title={this.props.title}/>

                <LectureTimesPrintSection/>

                <LectureDetailsPrintSection/>

                <ContactsPrintSection/>

                <NotesPrintSection/>

                <OrganizationPrintSection/>

                <PaymentSection/>

                <FollowUpPrintSection/>
            </div>
        );
    }
}
