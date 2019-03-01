import React from "react";
import {PrintPageTitle} from "../../Components/CustomComponents/OrderPrint/PrintPageTitle";
import LectureTimesPrintSection from "./Sections/LectureTimesPrintContainer";
import LectureDetailsPrintSection from "./Sections/LectureDetailsContainer";
import ContactsPrintSection from "./Sections/ContactPrint";
import NotesPrintSection from "./Sections/NotesPrintContainer";
import OrganizationPrintSection from "./Sections/OrganizationPrintContainer";
import FollowUpPrintSection from "./Sections/FollowUpPrintContainer";
import PaymentSection from "./Sections/PaymentPrintContainer";

export default class PrintOrderPage extends React.Component<PrintOrderPageProps> {

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

interface PrintOrderPageProps {
    onLoad: () => void,
    isSelectedOrder: boolean,
    title: string,
}