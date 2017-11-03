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

const loginPage = {
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

const followUpPage = {
    title: "המשך טיפול - טבלת מעקב",
    tableTitle: "הזמנות בהן נדרש המשך טיפול",
    tableHeaders: [
        {id: "מספר הזמנה"},
        {organizationName: "שם הארגון"},
        {lectureDate: "תאריך הרצאה"},
        {topic: "נושא"},
        {status: "סטאטוס הזמנה"},
        {followUpDate: "תאריך המשך טיפול"},
        {followUpDetails: "פרטי המשך טיפול"}
    ]
};

const actionRequiredPage = {
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

const paymentPage = {
    title: "מעקב תשלומים",
    table: {
        title: "הזמנות ממתינות לתשלום",
        tableHeaders: [
            {id: "מספר הזמנה"},
            {organizationName: "שם הארגון"},
            {lectureDate: "תאריך הרצאה"},
            {topic: "נושא"},
            {expectedPayDate: "תאריך תשלום"},
            {amount: "סכום לתשלום"},
            {edit: "עריכה"}]
    },
};

const futureLecturesPage = {
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

const allOrdersPage = {
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

export const pages = {
    dashboard,
    loginPage,
    followUpPage,
    actionRequiredPage,
    paymentPage,
    futureLecturesPage,
    allOrdersPage,
    orderPage: orderPageLabels,
    organizationPage: organizationPageLabels,
};