import React from 'react';
import CustomCard from "../../../../components/custom-components/custom-card";
import ContactDetails from "../../../LectureForm/elements/contact-details";
import {Divider, Paper} from "material-ui";
import {connect} from 'react-redux';

class ContactsSection extends React.Component {

    render() {
        const style = {
            paper: {
                display: "inline-block",
            },
            divider: {
                marginTop: 10,
            }
        };

        return (
            <CustomCard title={this.props.labels.sectionName}>
                <Paper
                    style={style.paper}
                >
                    <ContactDetails/>

                    <Divider style={style.divider}/>

                    <ContactDetails/>
                </Paper>
            </CustomCard>
        );
    }
}

function mapStateToProps(state) {
    return {
        labels: state.softwareLabels.orderPage.contactsSection,
    };
}
export default connect(mapStateToProps)(ContactsSection);
