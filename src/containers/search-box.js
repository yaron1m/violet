import React from 'react';
import {white, purple600} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import Search from 'material-ui/svg-icons/action/search';
import AutoComplete from 'material-ui/AutoComplete';
import {connect} from 'react-redux';

class SearchBox extends React.Component {

    render() {
        const styles = {
            iconButton: {
                float: 'right',
                paddingTop: 21,
            },
            textField: {
                backgroundColor: purple600,
                borderRadius: 2,
                height: 35,
                paddingRight: 10,
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

        const organizationNames = this.props.organizations.map((lecture) => {
            return lecture.name;
        });

        return (
            <div className="this is search box">
                <IconButton style={styles.iconButton}>
                    <Search color={white}/>
                </IconButton>
                <AutoComplete
                    dataSource={organizationNames}
                    // onUpdateInput = {this.onUpdateInput}
                    hintText={this.props.labels.search}
                    underlineShow={false}
                    fullWidth={true}
                    inputStyle={styles.white}
                    textFieldStyle={styles.textField}
                    hintStyle={styles.hintStyle}
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

export default connect(mapStateToProps)(SearchBox);
