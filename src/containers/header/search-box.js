import React from 'react';
import {white, purple600} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import Search from 'material-ui/svg-icons/action/search';
import AutoComplete from 'material-ui/AutoComplete';
import {connect} from 'react-redux';
import {withRouter} from 'react-router'
import {getLabels} from "../../store/labels/reducer";
import {getOrganizations} from "../../store/organizations/reducer";
import {selectOrder, selectOrganization} from "../../store/selected/actions";
import {getOrders} from "../../store/orders/reducer";
import * as _ from "lodash";

class SearchBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchText: "",
        };
    }

    sourceTypes = {
        organization: 0,
        order: 1,
    };

    handleRequest(chosenRequest, index) {
        if (index === -1) {
            return; //TODO handle enter press
        }
        this.setState({searchText: ""});

        switch (chosenRequest.value.type) {
            case this.sourceTypes.organization:
                this.props.dispatch(selectOrganization(chosenRequest.value.id));
                if (this.props.history.location.pathname !== '/org')
                    this.props.history.push('/org');
                return;

            case this.sourceTypes.order:
                this.props.dispatch(selectOrder(chosenRequest.value.id));
                this.props.dispatch(selectOrganization(chosenRequest.value.organizationId));

                if (this.props.history.location.pathname !== '/form')
                    this.props.history.push('/form');
                return;

            default:
                return;
        }
    }

    render() {
        const styles = {
            iconButton: {
                float: 'left',
                marginTop: 9,
            },
            textField: {
                backgroundColor: purple600,
                borderRadius: 2,
                height: 35,
                paddingLeft: 10,
                color: white,
            },
            white: {
                WebkitTextFillColor: "inherit",
                color: white,
            },
            hintStyle: {
                height: 16,
                color: white,
            },
        };

        const organizationNamesObjects = _.values(this.props.organizations).map(
            (org) => ({
                text: org.organizationName,
                value: {
                    type: this.sourceTypes.organization,
                    id: org.id
                }
            }));

        const orderNumbersObjects = _.values(this.props.orders).map(
            (order) => ({
                text: order.id.toString() + " - " + this.props.organizations[order.organizationId],
                value: {
                    type: this.sourceTypes.order,
                    id: order.id,
                    organizationId: order.organizationId,
                }
            }));

        const dataSource = _.concat(organizationNamesObjects, orderNumbersObjects);

        return (
            <div>
                <IconButton style={styles.iconButton}>
                    <Search color={white}/>
                </IconButton>

                <AutoComplete
                    dataSource={dataSource}
                    hintText={this.props.labels.searchLineHint}
                    underlineShow={false}
                    fullWidth={true}
                    inputStyle={styles.white}
                    textFieldStyle={styles.textField}
                    hintStyle={styles.hintStyle}
                    onNewRequest={this.handleRequest.bind(this)}
                    searchText={this.state.searchText}
                    onUpdateInput={(searchText) => this.setState({searchText: searchText})}
                    maxSearchResults={10}
                />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        labels: getLabels(state).header,
        organizations: getOrganizations(state),
        orders: getOrders(state),
    };
}

export default withRouter(connect(mapStateToProps)(SearchBox));
