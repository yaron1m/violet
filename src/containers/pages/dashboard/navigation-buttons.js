import React from 'react';
import CustomPaper from "../../../components/custom-components/custom-paper";
import {connect} from "react-redux";
import {withRouter} from "react-router";
import {getLabels} from "../../../store/labels/reducer";
import {redirect} from "../../../util/history-util";

class NavigationButtons extends React.Component {

    render() {
        const style = {
            container: {
                display: "flex",
                marginLeft: 20,
            },
            paper: {
                width: "50%",
                cursor: "pointer",
                textAlign:"center",
                fontSize: 18,
                fontWeight: "bold",
            },
        };


        return (
            <div style={style.container}>
                <CustomPaper style={style.paper} onClick={()=>redirect(this.props.history, "/form")}>
                    {this.props.labels.newOrder}
                </CustomPaper>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        labels: getLabels(state).homePage.navigationButtons,
    };
}


export default withRouter(connect(mapStateToProps)(NavigationButtons));