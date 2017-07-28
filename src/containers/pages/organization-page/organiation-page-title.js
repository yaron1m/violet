import React from 'react';
import PageTitle from '../page-title';
import {connect} from 'react-redux';
import IconButton from "material-ui/IconButton";
import SaveIcon from 'material-ui/svg-icons/content/save';
import AddIcon from 'material-ui/svg-icons/content/add';
import ClearIcon from 'material-ui/svg-icons/content/clear';
import {
    clearSelected, clearSelectedOrder, selectOrder, setIsSelectedOrganization, updateSelectedOrganization
} from "../../../store/selected/actions";
import {RaisedButton} from "material-ui";
import Snackbar from "material-ui/Snackbar";
import {getLabels} from "../../../store/labels/reducer";
import {getNextOrganizationId} from "../../../store/organizations/reducer";
import {getOrdersByOrganization} from "../../../store/orders/reducer";
import {getSelectedOrganization, isSelectedOrganization} from "../../../store/selected/reducer";

class OrganizationPageTitle extends React.Component {

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
        // this.props.dispatch(sendInformationToDatabase("/organizations/" + this.props.selectedOrganization.id, this.props.selectedOrganization))
        //     .then(this.setState({
        //         snackbarOpen: true,
        //         snackbarMessage: this.props.labels.snackBar.savedSuccessfully.replace("{0}", this.props.selectedOrganization.name),
        //     }))
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
        // this.props.dispatch(sendInformationToDatabase("/organizations/" + this.props.selectedOrganization.id, this.props.selectedOrganization))
        //     .then(this.setState({ //TODO what if writing failed?
        //         snackbarOpen: true,
        //         snackbarMessage: this.props.labels.snackBar.savedSuccessfully.replace("{0}", this.props.selectedOrganization.name),
        //     }))
    }


    render() {
        return (
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
        );
    }
}


function mapStateToProps(state) {
    return {
        labels: getLabels(state).OrganizationPage,
        selectedOrganization: getSelectedOrganization(state),
        isSelectedOrganization: isSelectedOrganization(state),
        OrderOfSelectedOrganization : getOrdersByOrganization(state),
        getNextOrganizationId: getNextOrganizationId(state),
    };
}

export default connect(mapStateToProps)(OrganizationPageTitle);
