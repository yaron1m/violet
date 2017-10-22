import {orderPageLabels} from "./order-page-labels";
import {organizationPageLabels} from "./organiztion-page-labels";

const dashboard = {
    navigationButtons: {
        newOrder: "הזמנה חדשה",
        allOrders: "כל ההזמנות",
    },
    infoBoxes: {
        futureLectures: "הרצאות עתידיות",
        followUp: "ממתינות לטיפול",
        waitingPayment: "ממתינות לתשלום",
        expectedIncome: "הכנסות צפויות",
        currencyIcon: "₪",
    }
};

export const pages = {
    dashboard,
    orderPage : orderPageLabels,
    organizationPage: organizationPageLabels,
};