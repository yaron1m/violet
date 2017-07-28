import React from 'react';
import {connect} from 'react-redux';
import PageTitle from "../../../../components/page-title";
import IconButton from "material-ui/IconButton";
import ClearIcon from 'material-ui/svg-icons/content/clear';
import PrintIcon from 'material-ui/svg-icons/action/print';
import SaveIcon from 'material-ui/svg-icons/content/save';
import Snackbar from "material-ui/Snackbar";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import {
    clearSelectedOrder, sendSelectedOrderToDatabase, setIsSelectedOrder,
    updateSelectedOrder
} from "../../../../store/selected/actions";
import {getLabels} from "../../../../store/labels/reducer";
import {
    getSelectedOrder, getSelectedOrganization, isSelectedOrder,
    isSelectedOrganization
} from "../../../../store/selected/reducer";
import {getNextOrderId} from "../../../../store/orders/reducer";
import * as _ from "lodash";

class OrderPageTitle extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            snackbarOpen: false,
            snackbarMessage: "",
            dialogOpen: false,
            dialogTitle: "",
            dialogMessage: "",
        };
    }

    async saveOrder() {
        if (!this.props.isSelectedOrganization) {
            this.setState(Object.assign({}, this.state, {
                dialogOpen: true,
                dialogTitle: "No organization selected",
                dialogMessage: "You must select and organization first",
            }));
            return;
        }
        if (!this.props.isSelectedOrder) {
            //Check if only data in order is id and organization:
            if(_.isEmpty(this.props.selectedOrder)) {
                this.setState(Object.assign({}, this.state, {
                    dialogOpen: true,
                    dialogTitle: "No data",
                    dialogMessage: "No data inserted",
                }));
                return;
            }
            await this.props.dispatch(updateSelectedOrder("id", this.props.nextOrderId));
            await this.props.dispatch(updateSelectedOrder("organizationId", this.props.selectedOrganization.id));
        }
        const promise =  this.props.dispatch(sendSelectedOrderToDatabase());
        this.handleDatabasePromise(promise);
    }

    handleDatabasePromise(promise) {
        function success() {
            this.setState(Object.assign({}, this.state, {
                snackbarOpen: true,
                snackbarMessage: this.props.labels.snackBar.savedSuccessfully.replace("{0}", this.props.selectedOrder.id),
            }));
            this.props.dispatch(setIsSelectedOrder());
        }

        function failure(error) {
            this.setState(Object.assign({}, this.state, {
                dialogOpen: true,
                dialogTitle: "Problem sending order database",
                dialogMessage: "Failed sending order to database",
            }));
            console.error(error);
        }

        promise.then(success.bind(this), failure.bind(this));
    }


    render() {
        const pageTitle = this.props.labels.title +
            (this.props.isSelectedOrder ? this.props.labels.orderNumberTitle + this.props.selectedOrder.id : this.props.labels.newOrderTitle);

        const dialogAction = <FlatButton
            label="אישור"
            primary={true}
            onTouchTap={() => this.setState(Object.assign({}, this.state, {
                dialogOpen: false,
            }))}
        />;

        return (
            <PageTitle title={pageTitle}>

                <IconButton onClick={this.saveOrder.bind(this)}>
                    <SaveIcon/>
                </IconButton>

                <IconButton><PrintIcon/></IconButton>

                <IconButton>
                    <ClearIcon onClick={() => this.props.dispatch(clearSelectedOrder())}/>
                </IconButton>





                <Snackbar
                    open={this.state.snackbarOpen}
                    message={this.state.snackbarMessage}
                    autoHideDuration={4000}
                    onRequestClose={() => this.setState({snackbarOpen: false})}
                />

                <Dialog
                    title={this.state.dialogTitle}
                    actions={dialogAction}
                    open={this.state.dialogOpen}
                    onRequestClose={() => this.setState(Object.assign({}, this.state, {
                        dialogOpen: false,
                    }))}
                >
                    {this.state.dialogMessage}
                </Dialog>
            </PageTitle>
        );
    }
}


function mapStateToProps(state) {
    return {
        labels: getLabels(state).orderPage,
        selectedOrganization: getSelectedOrganization(state),
        isSelectedOrganization: isSelectedOrganization(state),
        selectedOrder: getSelectedOrder(state),
        isSelectedOrder: isSelectedOrder(state),
        nextOrderId : getNextOrderId(state),
    };
}

export default connect(mapStateToProps)(OrderPageTitle);
