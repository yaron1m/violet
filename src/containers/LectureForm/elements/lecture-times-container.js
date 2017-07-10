import React from 'react';
import Paper from 'material-ui/Paper';
import {Divider} from "material-ui";
import {grey100} from "material-ui/styles/colors";
import LectureTime from "./lecture-time";
import {connect} from "react-redux";

class LectureTimesContainer extends React.Component {

    eachLectureTime(element, index) {
        const styles = {
            divider: {
                marginTop: 10,
            }
        };

        return (
            <div key={index}>
                <LectureTime index={index}/>
                <Divider style={styles.divider}/>
            </div>
        )
    }

    render() {
        const styles = {
            paper: {
                backgroundColor: grey100,
                display: "inline-block",
            },
            divider: {
                marginTop: 10,
            },
        };

        return (
            <Paper style={styles.paper}>
                {this.props.lectureTimes.array.map(this.eachLectureTime)}
            </Paper>
        );
    }
}

function mapStateToProps(state) {
    return {
        lectureTimes: state.lectureTimes,
    };
}
export default connect(mapStateToProps)(LectureTimesContainer);