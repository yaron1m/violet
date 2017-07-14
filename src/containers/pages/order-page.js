import React from 'react';
import OrganizationSection from "./page-sections/organization-section";
import LectureDetailsSection from "./page-sections/lecture-details-section";
import ContactsSection from "./page-sections/contacts-section";
import FollowUpSection from "./page-sections/follow-up-section";
import PaymentSection from "./page-sections/payment-section";
import NotesSection from "./page-sections/notes-section";
import {connect} from 'react-redux';
import PageTitle from "./page-title";
import IconButton from "material-ui/IconButton";
import SaveIcon from 'material-ui/svg-icons/content/save';
import ClearIcon from 'material-ui/svg-icons/content/clear';
import PrintIcon from 'material-ui/svg-icons/action/print';
import {sendInformationToDatabase} from "../../actions/action-database";
import {clearSelected} from "../../actions/action-selected";

class OrderForm extends React.Component {

    render() {

        return (
            <div>
                <PageTitle
                    title={this.props.labels.title}
                    buttons={<div>
                        <IconButton
                            onClick={function () {
                                if (!this.props.selected.order.hasOwnProperty('id')){
                                    alert("Tried to save empty order");
                                    return;
                                }
                                    this.props.dispatch(sendInformationToDatabase("/orders/" + this.props.selected.order.id, this.props.selected.order))
                            }.bind(this)}
                        > <SaveIcon /></IconButton>

                        <IconButton><PrintIcon/></IconButton>

                        <IconButton><ClearIcon
                            onClick={function () {
                                this.props.dispatch(clearSelected())
                            }.bind(this)}
                        /></IconButton>
                    </div>
                    }
                />

                <OrganizationSection allowEdit={false}/>

                <LectureDetailsSection/>

                <ContactsSection/>

                <FollowUpSection/>

                <PaymentSection/>

                <NotesSection/>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        labels: state.softwareLabels.orderPage,
        selected: state.selected,
    };
}

export default connect(mapStateToProps)(OrderForm);
