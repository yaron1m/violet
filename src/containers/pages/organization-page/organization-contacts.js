import React from 'react';
import {connect} from 'react-redux';
import CustomPage from "../../../components/custom-components/custom-page";
import CustomTable from "../../../components/custom-components/custom-table";
import {getLabels} from "../../../store/labels/reducer";
import {getSelectedOrganization} from "../../../store/selected/reducer";
import CustomDialog from "../../../components/custom-components/custom-dialog";
import CustomText from "../../../components/custom-components/custom-text-field";
import * as Immutable from "seamless-immutable";
import {updateSelectedOrganization} from "../../../store/selected/actions";

class OrganizationContacts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dialogOpen: false,
            selectedContactIndex: null,
        };
    }

    editContact(index) {
        this.setState(Object.assign({}, this.state, {
            dialogOpen: true,
            selectedContactIndex: index
        }));
    }

    render() {
        function updateContact(key, value) {
            let contacts = Immutable.asMutable(this.props.selectedOrganization.contacts, {deep: true});
            contacts[this.state.selectedContactIndex][key] = value;
            this.props.dispatch(updateSelectedOrganization("contacts", contacts));
        }

        const tableFieldData = {
            titles: this.props.labels.editDialog.titles,
            values: this.state.selectedContactIndex === null ? null :
                this.props.selectedOrganization.contacts[this.state.selectedContactIndex],
            updateAction: updateContact.bind(this)
        };


        return (
            <CustomPage title={this.props.labels.title}>
                <CustomTable
                    headers={this.props.labels.tableHeaders}
                    data={this.props.selectedOrganization.contacts}
                    onEditButton={this.editContact.bind(this)}
                />

                <CustomDialog
                    open={this.state.dialogOpen}
                    title={this.props.labels.editDialog.dialogTitle}
                    onRequestClose={function () {
                        this.setState(Object.assign({}, this.state, {
                            dialogOpen: false,
                            selectedContactIndex: null,
                        }))
                    }.bind(this)}
                >

                    <CustomText data={tableFieldData} name="firstName"/>
                    <CustomText data={tableFieldData} name="lastName"/>
                    <CustomText data={tableFieldData} name="phone1"/>
                    <CustomText data={tableFieldData} name="phone2"/>
                    <CustomText data={tableFieldData} name="phoneExtension"/>
                    <CustomText data={tableFieldData} name="email"/>
                    <CustomText data={tableFieldData} name="fax"/>
                    <CustomText data={tableFieldData} name="job"/>
                </CustomDialog>
            </CustomPage>
        );
    }
}


function mapStateToProps(state) {
    return {
        labels: getLabels(state).OrganizationPage.contactsTable,
        selectedOrganization: getSelectedOrganization(state),
    };
}

export default connect(mapStateToProps)(OrganizationContacts);
