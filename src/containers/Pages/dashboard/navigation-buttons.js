import React from 'react';
import CustomPaper from "../../../components/custom-components/custom-paper";
import {connect} from "react-redux";
import {getLabels} from "../../../store/labels/reducer";
import {redirect} from "../../../util/history-util";
import {clearSelected} from "../../../store/selected/actions";

class NavigationButtons extends React.Component {

    render() {
        const style = {
            container: {
                display: "flex",
            },
            paper: {
                width: "50%",
                cursor: "pointer",
                textAlign: "center",
                fontSize: 18,
                fontWeight: "bold",
                marginRight: 20,
            },
            lastPaper: {
                width: "50%",
                cursor: "pointer",
                textAlign: "center",
                fontSize: 18,
                fontWeight: "bold",
            }
        };


        return (
            <div style={style.container}>
                <CustomPaper style={style.paper} onClick={() => {
                    redirect("/form");
                    this.props.dispatch(clearSelected());
                }}>
                    {this.props.labels.newOrder}
                </CustomPaper>
                <CustomPaper style={style.lastPaper} onClick={() => redirect("/allOrders")}>
                    {this.props.labels.allOrders}
                </CustomPaper>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        labels: getLabels(state).pages.dashboard.navigationButtons,
    };
}


export default connect(mapStateToProps)(NavigationButtons);