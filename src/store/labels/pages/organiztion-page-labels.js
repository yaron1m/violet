const ordersSummarySectionLabels = {
    title: "הזמנות",
    addRow: "הוסף הזמנה חדשה",
    tableHeaders: [
        {id: "מספר הזמנה"},
        {date: "תאריך הרצאה"},
        {topic: "נושא"},
        {status: "סטאטוס"},
        {edit: "עריכה"}
    ]
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
    snackBar: {
        savedSuccessfully: 'ארגון "{0}" נשמר בהצלחה',
    },
};