import React from 'react';
import OrganizationSection from "../page-sections/organization-section";
import LectureDetailsSection from "../page-sections/lecture-details-section";
import ContactsSection from "../page-sections/contacts-section";
import FollowUpSection from "../page-sections/follow-up-section";
import PaymentSection from "../page-sections/payment-section";
import NotesSection from "../page-sections/notes-section";
import {connect} from 'react-redux';
import PageTitle from "../page-title";
import IconButton from "material-ui/IconButton";
import ClearIcon from 'material-ui/svg-icons/content/clear';
import PrintIcon from 'material-ui/svg-icons/action/print';
import {clearSelectedOrder} from "../../../store/selected/actions";
import OrderSaveButton from './order-save-button'
import {getLabels} from "../../../store/labels/reducer";
import {getSelectedOrder, isSelectedOrder} from "../../../store/selected/reducer";
import {getOrders} from "../../../store/orders/reducer";

class OrderForm extends React.Component {

    render() {

        return (
            <div>
                <PageTitle
                    title={this.props.labels.title +
                    (this.props.isSelectedOrder ? this.props.labels.orderNumberTitle + this.props.selectedOrder.id : this.props.labels.newOrderTitle)
                    }
                    buttons={<div>
                        <OrderSaveButton/>

                        <IconButton><PrintIcon/></IconButton>

                        <IconButton><ClearIcon
                            onClick={function () {
                                this.props.dispatch(clearSelectedOrder())
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
        labels: getLabels(state).orderPage,
        selectedOrder: getSelectedOrder(state),
        isSelectedOrder: isSelectedOrder(state),
        orders: getOrders(state),
    };
}

export default connect(mapStateToProps)(OrderForm);
