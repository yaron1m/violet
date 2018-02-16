import React from 'react';
import IconButton from 'material-ui/IconButton';
import SearchIcon from 'material-ui-icons/Search';
import AutoComplete from 'material-ui/AutoComplete';
import * as _ from "lodash";
import {MenuItem} from "material-ui";
import EventIcon from 'material-ui-icons/EventNote';
import BusinessIcon from 'material-ui-icons/Business';
import {redirect} from "../../../util/history-util";
import Colors from "../../../util/consts/colors";


export default class SearchBox extends React.Component {

    constructor() {
        super();
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

        switch (chosenRequest.info.type) {
            case this.sourceTypes.organization:
                this.props.selectOrganization(chosenRequest.info.organizationId);
                redirect('/org');
                return;

            case this.sourceTypes.order:
                this.props.selectOrder(chosenRequest.info.orderId);
                this.props.selectOrganization(chosenRequest.info.organizationId);

                redirect('/form');
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
                backgroundColor: Colors.lightPurple,
                borderRadius: 2,
                height: 35,
                paddingLeft: 10,
                marginRight: 10,
                marginTop: 15,
            },
            input: {
                WebkitTextFillColor: "inherit",
                color: Colors.white,
            },
            hintStyle: {
                color: Colors.white,
            },
        };

        const organizationNamesObjects = _.values(this.props.organizations).map(
            (org) => ({
                text: org.organizationName,
                info: {
                    type: this.sourceTypes.organization,
                    organizationId: org.id
                },
                value: (<MenuItem
                    primaryText={org.organizationName}
                    leftIcon={<BusinessIcon color={Colors.organizationIconColor}/>}
                />)
            }));

        const orderNumbersObjects = _.values(this.props.orders).map(
            (order) => ({
                text: order.id.toString() + " - " + this.props.organizations[order.organizationId].organizationName,
                info: {
                    type: this.sourceTypes.order,
                    orderId: order.id,
                    organizationId: order.organizationId,
                },
                value: (<MenuItem
                    primaryText={order.id.toString() + " - " + this.props.organizations[order.organizationId].organizationName}
                    leftIcon={<EventIcon color={Colors.orderIconColor}/>}
                />)
            }));

        const dataSource = _.concat(organizationNamesObjects, orderNumbersObjects);

        return (
            <div style={styles.container}>
                <IconButton style={styles.iconButton}>
                    <SearchIcon color={Colors.white}/>
                </IconButton>

                <AutoComplete
                    dataSource={dataSource}
                    hintText={this.props.hintText}
                    searchText={this.state.searchText}
                    filter={AutoComplete.caseInsensitiveFilter}

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
