import React from 'react';
import {white, purple600} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import Search from 'material-ui/svg-icons/action/search';
import AutoComplete from 'material-ui/AutoComplete';
import {connect} from 'react-redux';
import {selectOrganization} from "../../actions/action-organizations";
import {withRouter} from 'react-router'
import {selectOrder} from "../../actions/action-orders";

class SearchBox extends React.Component {

    handleRequest(chosenRequest, index) {
        if (index === -1) {
            return; //TODO handle enter press
        }

        if(chosenRequest.startsWith(this.props.labels.organizationPrefix)) {
            //Find by index
            this.props.dispatch(selectOrganization(this.props.organizations[index]));
            this.props.history.push('/org');
            return;
        }

        if(chosenRequest.startsWith(this.props.labels.orderPrefix)) {
            const orderId = parseInt(chosenRequest.replace(this.props.labels.orderPrefix,""));
            //Find by orderNumber
            this.props.dispatch(selectOrder(this.props.orders[orderId]));
            const organizationId = this.props.orders[orderId].organizationId;
            this.props.dispatch(selectOrganization(this.props.organizations[organizationId]));
            this.props.history.push('/form');
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

        const organizationNames = Object.values(this.props.organizations).map(
            (org) => (this.props.labels.organizationPrefix + org.name));
        const orderNumbers = Object.values(this.props.orders).map(
            (order) => (this.props.labels.orderPrefix + order.id));

        const dataSource = organizationNames.concat(orderNumbers);

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
                />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        labels: state.softwareLabels.header,
        organizations: state.organizations,
        orders: state.orders
    };
}

export default withRouter(connect(mapStateToProps)(SearchBox));
