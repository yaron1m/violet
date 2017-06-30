import React from 'react';
import Paper from 'material-ui/Paper';
import {Divider} from "material-ui";
import {grey100} from "material-ui/styles/colors";
import FormLectureField from "../Fields/FormLectureField";
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

class LectureTimes extends React.Component {

    constructor() {
        super();
        this.state = {
            lectureTimes: [{}, {}]
        };
    }


    addLectureTimeField(event) {
        var lectureTimesArray = this.state.lectureTimes;
        lectureTimesArray = lectureTimesArray.concat({})
        this.setState({
            lectureTimes: lectureTimesArray
        });
    }


    eachLectureTime() {
        const styles = {
            divider: {
                marginTop: 10,
            }
        };

        return (
            <div>
                <FormLectureField
                    //removeLectureTime =  {this.addLectureTimeField.bind(this)}
                />
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
            addButton: {}
        };

        return (
            <Paper
                style={styles.paper}
            >
                <FloatingActionButton
                    onTouchTap={this.addLectureTimeField.bind(this)}
                    mini={true}
                    style={styles.addButton}>
                    <ContentAdd />
                </FloatingActionButton>

                {this.state.lectureTimes.map(this.eachLectureTime)}
            </Paper>
        );
    }
}

export default LectureTimes;
