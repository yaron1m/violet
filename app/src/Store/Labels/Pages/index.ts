import {orderPageLabels} from './OrderPageLabels';
import {organizationPageLabels} from './OrganizationPageLabels';
import {publicCourseLabels} from './PublicCourseLabels';

const dashboardLabels = {
    navigationButtons: {
        newOrder: 'הזמנה חדשה',
        allOrders: 'כל ההזמנות',
        newPublicCourse: 'קורס ציבורי חדש',
        allPublicCourses: 'כל הקורסים הציבוריים',
    },
    infoBoxes: {
        futureLectures: 'הרצאות עתידיות',
        followUp: 'ממתינות לטיפול',
        expectedIncome: 'צבר הזמנות',
        waitingPayment: 'ממתין לתשלום',
    }
};

const loginPageLabels = {
    title: 'כניסת משתמשים',
    email: 'דואר אלקטרוני',
    password: 'סיסמה',
    signIn: 'כניסה',
    errors: {
        wrongPassword: 'שם משתמש ו/או סיסמה אינם נכונים',
        invalidEmail: 'דואר אלקטרוני לא תקין',
        userDisabled: 'המשתמש אינו תקין',
        userNotFound: 'משתמש אינו קיים',
    }
};

const followUpPageLabels = {
    title: 'המשך טיפול - טבלת מעקב',
    tableHeaders: [
        {orderId: 'מספר הזמנה'},
        {organizationName: 'שם הארגון'},
        {createdDate: 'תאריך יצירה'},
        {topic: 'נושא'},
        {status: 'סטאטוס הזמנה'},
        {followUpDate: 'תאריך המשך טיפול'},
        {followUpDetails: 'פרטי המשך טיפול'}
    ]
};

const actionRequiredPageLabels = {
    title: 'הזמנות שדורשות פעולה',
    tableHeaders: [
        {orderId: 'מספר הזמנה'},
        {createdDate: 'תאריך יצירת הזמנה'},
        {organizationName: 'שם הארגון'},
        {status: 'סטאטוס הזמנה'},
        {issue: 'בעיה'},
        {edit: 'עריכה'}
    ],
    issues: {
        followUpRequired: 'נדרש המשך טיפול',
        notPaidOnTime: 'תאריך לתשלום עבר',
        twoWeeksPassedFromCreation: 'חלפו שבועיים מיצירת ההזמנה ללא התקדמות',
        executedAndNoInvoice: 'לא הונפקה חשבונית',
        noOrderApproval: 'הזמנה לא אושרה, הרצאה עוד שבועיים',
    },
};

const paymentPageLabels = {
    title: 'מעקב תשלומים',
    table: {
        title: 'הזמנות ממתינות לתשלום',
        tableHeaders: [
            {orderId: 'מספר הזמנה'},
            {organizationName: 'שם הארגון'},
            {lectureDate: 'תאריך הרצאה'},
            {proformaInvoiceNumber: 'חשבונית עסקה'},
            {expectedPayDate: 'תאריך תשלום'},
            {totalSum: 'סכום לתשלום'},
            {edit: 'עריכה'}],
    },
};

const expectedIncomePageLabels = {
    title: 'צבר הזמנות',
    table: {
        title: 'הזמנות מאושרות',
        tableHeaders: [
            {orderId: 'מספר הזמנה'},
            {organizationName: 'שם הארגון'},
            {lectureDate: 'תאריך הרצאה'},
            {topic: 'נושא'},
            {status: 'סטאטוס'},
            {expectedPayDate: 'תאריך תשלום'},
            {totalSum: 'סכום לתשלום'}
        ]
    }
};

const futureLecturesPageLabels = {
    title: 'הרצאות עתידיות',
    table: {
        title: 'הרצאות עתידיות',
        tableHeaders: [
            {orderId: 'מספר הזמנה'},
            {date: 'תאריך הרצאה'},
            {topic: 'נושא'},
            {organizationName: 'שם הארגון'},
            {edit: 'עריכה'}]
    },
};

const allOrdersPageLabels = {
    filterByStatus: 'סנן לפי סטאטוס',
    title: 'כל ההזמנות',
    tableHeaders: [
        {orderId: 'מספר הזמנה'},
        {organizationName: 'שם הארגון'},
        {date: 'תאריך הרצאה'},
        {topic: 'נושא'},
        {status: 'סטאטוס'},
        {edit: 'עריכה'}]
};

const allPublicCoursesPageLabels = {
    title: 'כל הקורסים הציבוריים',
    tableHeaders: [
        {courseName: 'שם הקורס'},
        {courseLocation: 'מיקום הקורס'},
        {date: 'תאריך הרצאה'},
        {courseIncome: 'הכנסות'},
        {edit: 'עריכה'}]
};

const printPageLabels = {
    printOrderNumberLabel: 'הזמנה מספר ',
    printNoOrderSelected: 'לא נבחרה הזמנה'
};

export default {
    dashboard: dashboardLabels,
    loginPage: loginPageLabels,
    followUpPage: followUpPageLabels,
    actionRequiredPage: actionRequiredPageLabels,
    paymentPage: paymentPageLabels,
    expectedIncome: expectedIncomePageLabels,
    futureLecturesPage: futureLecturesPageLabels,
    allOrdersPage: allOrdersPageLabels,
    allPublicCoursesPage: allPublicCoursesPageLabels,
    orderPage: orderPageLabels,
    organizationPage: organizationPageLabels,
    printPage: printPageLabels,
    publicCoursePage: publicCourseLabels,
};