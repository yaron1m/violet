import React from 'react';
import Paper from 'material-ui/Paper';
import {Divider} from "material-ui";
import {grey100} from "material-ui/styles/colors";
import FormLectureField from "../Fields/FormLectureField";

class LectureTimes extends React.Component {

    render() {
        const style = {
            paper: {
                backgroundColor: grey100,
                display: "inline-block",
            },
            divider: {
                marginTop: 10,
            }
        };

        return (
            <Paper
                style={style.paper}
            >
                <FormLectureField/>

                <Divider style={style.divider}/>

                <FormLectureField/>
            </Paper>
        );
    }
}

export default LectureTimes;
