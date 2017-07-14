import React from 'react';
import {white, purple600} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import Search from 'material-ui/svg-icons/action/search';
import AutoComplete from 'material-ui/AutoComplete';
import {connect} from 'react-redux';
import {selectOrganization} from "../../actions/action-organizations";
import {withRouter} from 'react-router'

class SearchBox extends React.Component {

    handleRequest(chosenRequest, index) {
        if (this.props.location.pathname !== '/org') {
            this.props.history.push('/org');
        }
        if (index !== -1) {
            this.props.dispatch(selectOrganization(this.props.organizations[index]));
        }
        //TODO handle enter press
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

        const organizationNames = [];
        for (let orgIndex in this.props.organizations) {
            if (this.props.organizations.hasOwnProperty(orgIndex))
                organizationNames.push(this.props.organizations[orgIndex].name);
        }

        return (
            <div>
                <IconButton style={styles.iconButton}>
                    <Search color={white}/>
                </IconButton>
                <AutoComplete
                    dataSource={organizationNames}
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
        organizations: state.organizations
    };
}

export default withRouter(connect(mapStateToProps)(SearchBox));
