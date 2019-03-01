import {IStringObject} from "../../../Interfaces/IOrder";

const ordersSummarySectionLabels = {
    title: "הזמנות",
    addRow: "הוסף הזמנה חדשה",
    tableHeaders: [
        {orderId: "מספר הזמנה"},
        {date: "תאריך הרצאה"},
        {topic: "נושא"},
        {status: "סטאטוס"},
        {edit: "עריכה"}
    ] as IStringObject[]
};

const organizationPageDialogLabels = {
    noOrganizationSelectedTitle: "לא נבחר ארגון",
    noOrganizationSelectedContent: "עדכון פרטי ארגון אפשרי רק עבור ארגונים קיימים, נסה לשמור ארגון חדש",
    noDataTitle: "לא הוכנסו נתונים",
    noDataContent: "לשמירת ארגון חדש יש להכניס נתונים",
    organizationAlreadySelectedTitle: "פרטי ארגון כבר טעונים במערכת",
    organizationAlreadySelectedContent: "לשמירת ארגון חדש יש ראשית לנקות את הארגון הטעון",
    sendingToDatabaseFailedTitle: "שגיאה בשמירת פרטי ארגון",
    sendingToDatabaseFailedContent: "חלה שגיאה בשמירת פרטי הארגון בשרת",
};

export const organizationPageLabels = {
    title: "פרטי ארגונים",
    ordersSummarySection: ordersSummarySectionLabels,
    dialog: organizationPageDialogLabels,
    actionButtons: {
        save: "שמור ארגון",
    },
    snackBar: {
        savedSuccessfully: 'ארגון "{0}" נשמר בהצלחה',
    },
};