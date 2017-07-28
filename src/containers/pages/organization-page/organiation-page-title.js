import React from 'react';
import PageTitle from '../../../components/page-title';
import {connect} from 'react-redux';
import IconButton from "material-ui/IconButton";
import SaveIcon from 'material-ui/svg-icons/content/save';
import AddIcon from 'material-ui/svg-icons/content/add';
import ClearIcon from 'material-ui/svg-icons/content/clear';
import {
    clearSelected, clearSelectedOrder, selectOrder, sendSelectedOrganizationToDatabase, setIsSelectedOrganization,
    updateSelectedOrganization
} from "../../../store/selected/actions";
import Snackbar from "material-ui/Snackbar";
import Dialog from "material-ui/Dialog";
import {getLabels} from "../../../store/labels/reducer";
import {getNextOrganizationId} from "../../../store/organizations/reducer";
import {getOrdersByOrganization} from "../../../store/orders/reducer";
import {getSelectedOrganization, isSelectedOrganization} from "../../../store/selected/reducer";
import {FlatButton} from "material-ui";

class OrganizationPageTitle extends React.Component {

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

    saveExistingOrganization() {
        if (!this.props.isSelectedOrganization) {
            this.setState(Object.assign({}, this.state, {
                dialogOpen: true,
                dialogTitle: "No organization selected", //TODO replace with labels
                dialogMessage: "You can not save unselected organization",
            }));
            return;
        }
        const promise = this.props.dispatch(sendSelectedOrganizationToDatabase());
        promise.then(
            () => this.setState(Object.assign({}, this.state, {
                snackbarOpen: true,
                snackbarMessage: this.props.labels.snackBar.savedSuccessfully.replace("{0}", this.props.selectedOrganization.name),
            })),
            (error) => {
                this.setState(Object.assign({}, this.state, {
                    dialogOpen: true,
                    dialogTitle: "Problem sending to database",
                    dialogMessage: "Failed sending to database",
                }));
                console.error(error);
            })
    }

    saveNewOrganization() {
        if (this.props.isSelectedOrganization) {
            this.setState(Object.assign({}, this.state, {
                dialogOpen: true,
                dialogTitle: "Organization already selected",
                dialogMessage: "Can not create new organization when other one is open",
            }));
            return;
        }
        const selectedOrganization = this.props.selectedOrganization;
        selectedOrganization.id = this.props.getNextOrganizationId();
        this.props.dispatch(updateSelectedOrganization('id', selectedOrganization.id));
        this.props.dispatch(setIsSelectedOrganization(true));
        // this.props.dispatch(sendInformationToDatabase("/organizations/" + this.props.selectedOrganization.id, this.props.selectedOrganization))
        //     .then(this.setState({ //TODO what if writing failed?
        //         snackbarOpen: true,
        //         snackbarMessage: this.props.labels.snackBar.savedSuccessfully.replace("{0}", this.props.selectedOrganization.name),
        //     }))
    }


    render() {
        const dialogAction = <FlatButton
            label="אישור"
            primary={true}
            onTouchTap={() => this.setState(Object.assign({}, this.state, {
                dialogOpen: false,
            }))}
        />;


        return (
            <PageTitle
                title={this.props.labels.title}
            >
                {/*save icon*/}
                <IconButton onClick={this.saveExistingOrganization.bind(this)}>
                    < SaveIcon/>
                </IconButton>

                {/*add icon*/}
                <IconButton onClick={this.saveNewOrganization.bind(this)}>
                    <AddIcon/>
                </IconButton>

                {/*clear icon*/}
                <IconButton onClick={() => this.props.dispatch(clearSelected())}>
                    <ClearIcon/>
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
                    modal={false}
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
        labels: getLabels(state).OrganizationPage,
        selectedOrganization: getSelectedOrganization(state),
        isSelectedOrganization: isSelectedOrganization(state),
        OrderOfSelectedOrganization: getOrdersByOrganization(state),
        getNextOrganizationId: getNextOrganizationId(state),
    };
}

export default connect(mapStateToProps)(OrganizationPageTitle);
