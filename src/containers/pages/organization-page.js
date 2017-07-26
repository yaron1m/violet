import React from 'react';
import PageTitle from './page-title';
import OrganizationSection from "./page-sections/organization-section";
import {connect} from 'react-redux';
import CustomPage from "../../components/custom-components/custom-page";
import CustomTable from "../../components/custom-components/custom-table";
import IconButton from "material-ui/IconButton";
import SaveIcon from 'material-ui/svg-icons/content/save';
import AddIcon from 'material-ui/svg-icons/content/add';
import ClearIcon from 'material-ui/svg-icons/content/clear';
import {sendInformationToDatabase} from "../../store/firebase/actions";
import {
    clearSelected, clearSelectedOrder, selectOrder, setIsSelectedOrganization, updateSelectedOrganization
} from "../../store/selected/actions";
import {RaisedButton} from "material-ui";
import Snackbar from "material-ui/Snackbar";
import {getLabels} from "../../store/labels/reducer";
import {getNextOrganizationId} from "../../store/organizations/reducer";
import {getOrdersByOrganization} from "../../store/orders/reducer";
import {getSelectedOrganization, isSelectedOrganization} from "../../store/selected/reducer";

class OrganizationPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            snackbarOpen: false,
            snackbarMessage: "",
        }
    }

    saveExistingOrganization() {
        if (!this.props.isSelectedOrganization.organization) {
            alert("Can not save unselected organization");
            return;
        }
        this.props.dispatch(sendInformationToDatabase("/organizations/" + this.props.selectedOrganization.id, this.props.selectedOrganization))
            .then(this.setState({
                snackbarOpen: true,
                snackbarMessage: this.props.labels.snackBar.savedSuccessfully.replace("{0}", this.props.selectedOrganization.name),
            }))
    }

    saveNewOrganization() {
        if (this.props.isSelectedOrganization.organization) {
            alert("Can not create new organization when other one is open");
            return;
        }
        const selectedOrganization = this.props.selectedOrganization;
        selectedOrganization.id = this.props.getNextOrganizationId();
        this.props.dispatch(updateSelectedOrganization('id', selectedOrganization.id));
        this.props.dispatch(setIsSelectedOrganization(true));
        this.props.dispatch(sendInformationToDatabase("/organizations/" + this.props.selectedOrganization.id, this.props.selectedOrganization))
            .then(this.setState({ //TODO what if writing failed?
                snackbarOpen: true,
                snackbarMessage: this.props.labels.snackBar.savedSuccessfully.replace("{0}", this.props.selectedOrganization.name),
            }))
    }


    render() {
        return (
            <div>
                <PageTitle
                    title={this.props.labels.title}
                    buttons={<div>
                        {/*save icon*/}
                        <IconButton onClick={this.saveExistingOrganization.bind(this)}>
                            < SaveIcon />
                        </IconButton>

                        {/*add icon*/}
                        <IconButton onClick={this.saveNewOrganization.bind(this)}>
                            <AddIcon />
                        </IconButton>

                        {/*clear icon*/}
                        <IconButton onClick={() => this.props.dispatch(clearSelected()) }>
                            <ClearIcon/>
                        </IconButton>

                        <Snackbar
                            open={this.state.snackbarOpen}
                            message={this.state.snackbarMessage}
                            autoHideDuration={4000}
                            onRequestClose={() => this.setState({snackbarOpen: false})}
                        />
                    </div>
                    }
                />

                <OrganizationSection/>

                {/*Orders summary*/}
                <CustomPage
                    title={this.props.labels.ordersTable.title}
                    titleButton={
                        <RaisedButton primary={true} label={this.props.labels.ordersTable.newOrderButton}
                                      onClick={() => {
                                          this.props.dispatch(clearSelectedOrder());
                                          this.props.history.push('/form');
                                      }}
                        />}
                    titleButtonCondition={this.props.isSelectedOrganization}
                >
                    <CustomTable
                        headers={this.props.labels.ordersTable.tableHeaders}
                        data={this.props.getOrdersByOrganization(this.props.selectedOrganization.id) }
                        onEditButton={(order) => {
                            this.props.dispatch(selectOrder(order));
                            this.props.history.push('/form');
                        }}
                    />
                </CustomPage>

                {/*Contacts*/}
                <CustomPage title={this.props.labels.contactsTable.title}>
                    <CustomTable
                        headers={this.props.labels.contactsTable.tableHeaders}
                        data={this.props.selectedOrganization.contacts}
                    />
                </CustomPage>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        labels: getLabels(state).OrganizationPage,
        selectedOrganization: getSelectedOrganization(state),
        isSelectedOrganization: isSelectedOrganization(state),
        getOrdersByOrganization : (organizationId) => getOrdersByOrganization(state, organizationId),
        getNextOrganizationId: getNextOrganizationId(state),
    };
}

export default connect(mapStateToProps)(OrganizationPage);
