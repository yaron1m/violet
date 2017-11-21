import {orderPageLabels} from "./order-page-labels";
import {organizationPageLabels} from "./organiztion-page-labels";

const dashboardLabels = {
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

const loginPageLabels = {
    title: "כניסת משתמשים",
    email: "דואר אלקטרוני:",
    password: "סיסמה:",
    signIn: "כניסה",
    errors: {
        wrongPassword: "שם משתמש ו/או סיסמה אינם נכונים",
        invalidEmail: "דואר אלקטרוני לא תקין",
        userDisabled: "המשתמש אינו תקין",
        userNotFound: "משתמש אינו קיים",
    }
};

const followUpPageLabels = {
    title: "המשך טיפול - טבלת מעקב",
    tableTitle: "הזמנות בהן נדרש המשך טיפול",
    tableHeaders: [
        {id: "מספר הזמנה"},
        {organizationName: "שם הארגון"},
        {createdDate: "תאריך יצירה"},
        {topic: "נושא"},
        {status: "סטאטוס הזמנה"},
        {followUpDate: "תאריך המשך טיפול"},
        {followUpDetails: "פרטי המשך טיפול"}
    ]
};

const actionRequiredPageLabels = {
    title: "הזמנות דורשות טיפול",
    tableHeaders: [
        {id: "מספר הזמנה"},
        {createdDate: "תאריך יצירת הזמנה"},
        {organizationName: "שם הארגון"},
        {status: "סטאטוס הזמנה"},
        {issue: "בעיה"},
        {edit: "עריכה"}
    ],
    issues: {
        followUpRequired: "נדרש המשך טיפול",
        notPaidOnTime: "תאריך לתשלום עבר",
        twoWeeksPassedFromCreation: "חלפו שבועיים מיצירת ההזמנה ללא התקדמות",
        executedAndNoInvoice: "לא הונפקה חשבונית",
        noOrderApproval: "הזמנה לא אושרה, הרצאה עוד שבועיים",
    },
};

const paymentPageLabels = {
    title: "מעקב תשלומים",
    table: {
        title: "הזמנות ממתינות לתשלום",
        tableHeaders: [
            {id: "מספר הזמנה"},
            {organizationName: "שם הארגון"},
            {lectureDate: "תאריך הרצאה"},
            {topic: "נושא"},
            {expectedPayDate: "תאריך תשלום"},
            {totalSum: "סכום לתשלום"},
            {edit: "עריכה"}],
    },
};

const futureLecturesPageLabels = {
    title: "הרצאות עתידיות",
    table: {
        title: "הרצאות עתידיות",
        tableHeaders: [
            {orderId: "מספר הזמנה"},
            {date: "תאריך הרצאה"},
            {topic: "נושא"},
            {organizationName: "שם הארגון"},
            {edit: "עריכה"}]
    },
};

const allOrdersPageLabels = {
    table: {
        title: "כל ההזמנות",
        tableHeaders: [
            {id: "מספר הזמנה"},
            {organizationName: "שם הארגון"},
            {date: "תאריך הרצאה"},
            {topic: "נושא"},
            {status: "סטאטוס"},
            {edit: "עריכה"}]
    },
};

const printPageLabels = {
    printOrderNumberLabel: "הזמנה מספר ",
    printNoOrderSelected: "לא נבחרה הזמנה"
};

export const pages = {
    dashboard: dashboardLabels,
    loginPage: loginPageLabels,
    followUpPage: followUpPageLabels,
    actionRequiredPage: actionRequiredPageLabels,
    paymentPage: paymentPageLabels,
    futureLecturesPage: futureLecturesPageLabels,
    allOrdersPage: allOrdersPageLabels,
    orderPage: orderPageLabels,
    organizationPage: organizationPageLabels,
    printPage: printPageLabels,
};