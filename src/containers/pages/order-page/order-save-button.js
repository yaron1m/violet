import React from 'react';
import {Dialog, FlatButton, IconButton, Snackbar} from "material-ui";
import {selectOrder, updateSelectedOrder} from "../../../store/selected/actions";
import {sendInformationToDatabase} from "../../../store/firebase/actions";
import connect from "react-redux/es/connect/connect";
import SaveIcon from 'material-ui/svg-icons/content/save';
import {getLabels} from "../../../store/labels/reducer";


class OrderSaveButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            snackbarOpen: false,
            snackbarMessage: "",
            dialogOpen: false,
        }
    }

    render() {
        return (
            <span>
            <IconButton
                onClick={function () {
                    if (!this.props.isSelected.organization) {
                        this.setState(Object.assign({}, this.state, {
                            dialogOpen: true,
                        }));
                        return;
                    }
                    if (!this.props.isSelected.order) {
                        const newOrderId = Math.max.apply(null, Object.keys(this.props.orders)) + 1;
                        this.props.dispatch(updateSelectedOrder("id", newOrderId));
                        this.props.dispatch(updateSelectedOrder("organizationId", this.props.selected.organization.id));
                    }
                    // this.props.dispatch(sendInformationToDatabase("/orders/" + this.props.selected.order.id, this.props.selected.order))
                    //     .then(() => {
                    //         if (!this.props.isSelected.order)
                    //             this.props.dispatch(selectOrder(this.props.selected.order));
                    //
                    //         this.setState(Object.assign({}, this.state, {
                    //             snackbarOpen: true,
                    //             snackbarMessage: this.props.labels.snackBar.savedSuccessfully.replace("{0}", this.props.selected.order.id),
                    //         }));
                    //     });

                }.bind(this)}
            > <SaveIcon /></IconButton>


            <Snackbar
                open={this.state.snackbarOpen}
                message={this.state.snackbarMessage}
                autoHideDuration={4000}
                onRequestClose={() => this.setState(Object.assign({}, this.state, {
                    snackbarOpen: true,
                    snackbarMessage: this.props.labels.snackBar.savedSuccessfully.replace("{0}", this.props.selected.order.id),
                }))}
            />

            <Dialog
                title={this.props.labels.dialog.noOrganizationSelectedTitle}
                actions={      <FlatButton
                    label="אישור"
                    primary={true}
                    onTouchTap={() => this.setState(Object.assign({}, this.state, {
                        dialogOpen: false,
                    }))}
                />}
                modal={false}
                open={this.state.dialogOpen}
                onRequestClose={() => this.setState(Object.assign({}, this.state, {
                    dialogOpen: false,
                }))}
            >
                 {this.props.labels.dialog.noOrganizationSelectedContent}
            </Dialog>
        </span>
        )
    }

}


function mapStateToProps(state) {
    return {
        labels: getLabels(state).orderPage,
        selected: state.selected,
        isSelected: state.isSelected,
        orders: state.orders,
    };
}

export default connect(mapStateToProps)(OrderSaveButton);
