import React from "react";
import FutureLecturesInfoBox from "./InfoBoxes/FutureLecturesInfoBox";
import FollowUpInfoBox from "./InfoBoxes/FollowUpInfoBox";
import ExpectedIncomeInfoBox from "./InfoBoxes/ExpectedIncomeInfoBox";
import WaitingPaymentInfoBox from "./InfoBoxes/WaitingPaymentInfoBox";
import NavigationButton from "./NavigationButton";
import {redirect} from "../../Util/HistoryUtil";
import {Path} from "../Path";

const styles = {
    rowDiv: {
        display: "flex",
        flexDirection: "row" as "row",
        justifyContent: "space-between",
        flexWrap: "wrap" as "wrap",
    }
};

export default function Dashboard(props: DashboardProps) {

    return (
        <div>
            <div style={styles.rowDiv}>
                <NavigationButton title="הזמנה חדשה" onClick={() => {
                    redirect(Path.order);
                    props.clearSelectedOrder();
                    props.clearSelectedOrganization();
                }}/>

                <NavigationButton title="כל ההזמנות" onClick={() => redirect(Path.allOrders)}/>

                <NavigationButton title="כל ההזמנות" onClick={() => {
                    redirect(Path.publicCourse);
                    props.clearSelectedPublicCourse();
                }}/>

                <NavigationButton title="כל הקורסים הציבוריים" onClick={() => redirect(Path.allPublicCourses)}/>
            </div>

            {props.isSuperUser &&
            <div style={styles.rowDiv}>
                <FutureLecturesInfoBox/>
                <FollowUpInfoBox/>
                <ExpectedIncomeInfoBox/>
                <WaitingPaymentInfoBox/>
            </div>
            }
        </div>
    );
}

interface DashboardProps {
    isSuperUser: boolean;
    clearSelectedOrder: () => void;
    clearSelectedOrganization: () => void;
    clearSelectedPublicCourse: () => void;
}