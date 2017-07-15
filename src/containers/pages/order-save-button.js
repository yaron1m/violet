import React from 'react';
import {IconButton} from "material-ui";
import {updateValueInSelectedOrder} from "../../actions/action-selected";
import {sendInformationToDatabase} from "../../actions/action-database";
import {selectOrder} from "../../actions/action-orders";
import connect from "react-redux/es/connect/connect";
import SaveIcon from 'material-ui/svg-icons/content/save';


class OrderSaveButton extends React.Component {

    render() {
        return (
            <IconButton
                onClick={function () {
                    if(!this.props.isSelected.organization){
                        alert("No organization selected");
                        return;
                    }
                    if (!this.props.isSelected.order) {
                        const newOrderId = Math.max.apply(null, Object.keys(this.props.orders)) + 1;
                        this.props.dispatch(updateValueInSelectedOrder("id", newOrderId));
                        this.props.dispatch(updateValueInSelectedOrder("organizationId", this.props.selected.organization.id));
                    }
                    this.props.dispatch(sendInformationToDatabase("/orders/" + this.props.selected.order.id, this.props.selected.order))
                        .then(() => {
                            if (!this.props.isSelected.order)
                                this.props.dispatch(selectOrder(this.props.selected.order))
                        });

                }.bind(this)}
            > <SaveIcon /></IconButton>

        )
    }

}


function mapStateToProps(state) {
    return {
        labels: state.softwareLabels.orderPage,
        selected: state.selected,
        isSelected: state.isSelected,
        orders: state.orders,
    };
}

export default connect(mapStateToProps)(OrderSaveButton);
