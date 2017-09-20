import React from 'react';
import {cyan600, pink600, brown500, green500} from 'material-ui/styles/colors';
import CheckBox from 'material-ui/svg-icons/action/check-circle';
import Payment from 'material-ui/svg-icons/editor/attach-money';
import Waiting from 'material-ui/svg-icons/action/watch-later';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';
import InfoBox from "../../../components/dashboard/info-box";
import {connect} from "react-redux";
import {getLabels} from "../../../store/labels/reducer";
import {redirect} from "../../../util/history-util";
import {withRouter} from "react-router";

class InfoBoxes extends React.Component {
    render() {

        const style = {
            box: {
                width: "25%",
                margin: 10,
                cursor: "pointer",
            }
        };


        return (
            <div style={{display: "flex"}}>
                <div style={style.box}>
                    <InfoBox
                        style={style.box}
                        Icon={CheckBox}
                        color={cyan600}
                        title={this.props.labels.futureLectures}
                        value="15"
                    />
                </div>


                <div style={style.box} onClick={() => redirect(this.props.history, '/followup')}>
                    <InfoBox
                        style={style.box}
                        Icon={NotificationsIcon}
                        color={pink600}
                        title={this.props.labels.followUp}
                        value="4231"
                    />
                </div>

                <div style={style.box}>
                    <InfoBox
                        style={style.box}
                        Icon={Waiting}
                        color={brown500}
                        title={this.props.labels.waitingPayment}
                        value="460"
                    />
                </div>

                <div style={style.box}>
                    <InfoBox
                        style={style.box}
                        Icon={Payment}
                        color={green500}
                        title={this.props.labels.expectedIncome}
                        value={"248" + this.props.labels.currencyIcon}
                    />
                </div>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        labels: getLabels(state).homePage.infoBoxes,
    };
}

export default withRouter(connect(mapStateToProps)(InfoBoxes));