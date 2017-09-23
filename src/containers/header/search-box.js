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
import {redirect} from "../../util/history-util";

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
                redirect(this.props.history, '/org');
                return;

            case this.sourceTypes.order:
                this.props.dispatch(selectOrder(chosenRequest.value.id));
                this.props.dispatch(selectOrganization(chosenRequest.value.organizationId));

                redirect(this.props.history, '/form');
                return;

            default:
                return;
        }
    }

    render() {
        const styles = {
            iconButton: {
                float: 'left',
                margin: "-5px -5px 0 -10px",
                display: this.state.searchText === "" ? "inline-block" : "none",
            },
            autoComplete: {
                top: -14,
                marginLeft: 5,
            },
            container: {
                backgroundColor: purple600,
                borderRadius: 2,
                height: 35,
                paddingLeft: 10,
                marginRight: 10,
                marginTop: 15,
            },
            input: {
                WebkitTextFillColor: "inherit",
                color: white,
            },
            hintStyle: {
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
                text: order.id.toString() + " - " + this.props.organizations[order.organizationId].organizationName,
                value: {
                    type: this.sourceTypes.order,
                    id: order.id,
                    organizationId: order.organizationId,
                }
            }));

        const dataSource = _.concat(organizationNamesObjects, orderNumbersObjects);

        return (
            <div style={styles.container}>
                <IconButton style={styles.iconButton}>
                    <Search color={white}/>
                </IconButton>

                <AutoComplete
                    dataSource={dataSource}
                    hintText={this.props.labels.searchLineHint}
                    searchText={this.state.searchText}

                    onNewRequest={this.handleRequest.bind(this)}
                    onUpdateInput={(searchText) => this.setState({searchText: searchText})}

                    maxSearchResults={10}
                    underlineShow={false}
                    fullWidth={true}

                    inputStyle={styles.input}
                    style={styles.autoComplete}
                    hintStyle={styles.hintStyle}
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
