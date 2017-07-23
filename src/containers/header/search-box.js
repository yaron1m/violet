import React from 'react';
import {white, purple600} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import Search from 'material-ui/svg-icons/action/search';
import AutoComplete from 'material-ui/AutoComplete';
import {connect} from 'react-redux';
import {selectOrganization} from "../../actions/action-organizations";
import {withRouter} from 'react-router'
import {selectOrder} from "../../actions/action-orders";
import {getLabels} from "../../store/labels/reducer";

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


        if (chosenRequest.value.type === this.sourceTypes.organization) {
            //Find by index
            this.props.dispatch(selectOrganization(chosenRequest.value.obj));
            this.props.history.push('/org');
            return;
        }

        if (chosenRequest.value.type === this.sourceTypes.order) {
            this.props.dispatch(selectOrder(chosenRequest.value.obj));
            const organizationId = chosenRequest.value.obj.organizationId;
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

        const organizationNamesObjects = Object.values(this.props.organizations).map(
            (org) => ({text: org.name, value: {type: this.sourceTypes.organization, obj: org}}));
        const orderNumbersObjects = Object.values(this.props.orders).map(
            (order) => ({text: order.id.toString(), value: {type: this.sourceTypes.order, obj: order}}));

        const dataSource = organizationNamesObjects.concat(orderNumbersObjects);

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
                />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        labels: getLabels(state).header,
        organizations: state.organizations,
        orders: state.orders
    };
}

export default withRouter(connect(mapStateToProps)(SearchBox));
