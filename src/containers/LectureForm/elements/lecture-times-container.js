import React from 'react';
import Paper from 'material-ui/Paper';
import {Divider} from "material-ui";
import {grey100} from "material-ui/styles/colors";
import LectureTime from "./lecture-time";
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {connect} from "react-redux";
import {addLectureTime} from "../../../actions";

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

    addButtonClick(event){
        this.props.dispatch(addLectureTime());
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
            <Paper
                style={styles.paper}
            >
                <FloatingActionButton
                    onTouchTap={this.addButtonClick.bind(this)}
                    mini={true}
                >
                    <ContentAdd />
                </FloatingActionButton>

                {this.props.lectureTimes.map(this.eachLectureTime)}
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