const organizationSectionLabels = {
    sectionName: "פרטי הארגון",
    titles: {
        organizationName: "שם הארגון",
        organizationAddress: "כתובת הארגון",
        organizationCity: "עיר",
        organizationPostalCode: "מיקוד",
        companyId: "ח.פ / ע.מ",
        paymentConditions: "תנאי תשלום",
        howReachedUs: "איך הגיע אלינו",
        internalOrderIdRequired: "נדרשת הזמנת רכש",
    },
    paymentConditions: {
        "immediate": "תשלום מיידי",
        "EOM": "שוטף + 0",
        "EOM+30": "שוטף + 30",
        "EOM+45": "שוטף + 45",
        "EOM+60": "שוטף + 60",
        "EOM+30+7": "שוטף + 30 + 7 לחודש",
        "EOM+30+22": "שוטף + 30 + 22 לחודש",
    },
};

const contactsSectionLabels = {
    sectionName: "איש קשר",
    titles: {
        contactFirstName: "שם פרטי",
        contactLastName: "שם משפחה",
        contactPhone1: "טלפון",
        contactPhone2: "טלפון נוסף",
        contactPhoneExtension: "שלוחה",
        contactEmail: "דואר אלקטרוני",
        contactFax: "פקס",
        contactJob: "תפקיד",

        financialContactFirstName: "שם פרטי",
        financialContactLastName: "שם משפחה",
        financialContactPhone1: "טלפון",
        financialContactPhone2: "טלפון נוסף",
        financialContactPhoneExtension: "שלוחה",
        financialContactEmail: "דואר אלקטרוני",
        financialContactFax: "פקס",
        financialContactJob: "תפקיד",
    },
    importContactsDialog: {
        buttonTooltip: "יבא איש קשר",
        dialogTitle: "יבא איש קשר",
        financialSuffix: " לתשלום",
        noOrganizationSelectedTitle: "לא נבחר ארגון",
        noOrganizationSelectedContent: "כדי לייבא אנשי קשר יש לבחור ארגון",
        tableHeaders: [
            {pick: "בחר"},
            {contactFirstName: "שם פרטי"},
            {contactLastName: "שם משפחה"},
            {contactJob: "תפקיד"},
            {contactPhone1: "טלפון"},
            {contactEmail: "דואר אלקטרוני"},
        ],
    }
};

const lectureDetailsSectionLabels = {
    sectionName: "פרטי ההרצאה",
    titles: {
        street: "רחוב",
        streetNumber: "מספר",
        city: "עיר",
        location: "מיקום",
        floor: "קומה",
        room: "חדר",
        audienceType: "קהל היעד",
        daySchedule: "מהות היום + לו\"ז",
        projector: "מקרן",
        soundSystem: "מערכת הגברה",
        microphone: "מיקרופון דש",
        parking: "חניה",
        orderApproved: "הזמנה אושרה",
        sameAudience: "קהל יעד זהה",
        cancelled: "הזמנה בוטלה",
        cancellationReason: "סיבת ביטול",
        cancellationDetails: "פרטי הביטול",
        rejected: "הזמנה לא יצאה לפועל",
        rejectionReason: "סיבת דחיה",
        rejectionDetails: "פרטי הדחיה",
    }
};

const lectureTimesSectionLabels = {
    sectionName: "הרצאות",
    tableHeaders: [{date: "תאריך"}, {startTime: "שעת התחלה"}, {endTime: "שעת סיום"}, {duration: "משך"}, {topic: "נושא"},
        {audienceSize: "מס' משתתפים"}, {tie: "עניבה"}, {edit: "עריכה"}],
    addRow: "הוסף תאריך חדש",
    editDialog: {
        dialogTitle: "ערוך פרטי הרצאה",
        titles: {
            date: "תאריך",
            startTime: "שעת התחלה",
            endTime: "שעת סיום",
            length: "משך",
            topic: "נושא",
            audienceSize: "מס' משתתפים",
            tie: "עניבה"
        },
    }
};

const followUpSectionLabels = {
    sectionName: "המשך טיפול",
    titles: {
        followUpRequired: "נדרש המשך טיפול",
        followUpDate: "תאריך המשך טיפול",
        followUpDetails: "פרטים"
    }
};

const paymentSectionLabels = {
    sectionName: "תשלום",
    financialContactTitle: "איש קשר לתשלום",
    titles: {
        cost: "מחיר הרצאות",
        oneWayDistance:"מרחק כיוון אחד",
        travelExpenses: "עלות נסיעות",
        extraCosts :"עלויות נוספות",
        sum :"סכום לפני מע\"מ",
        vat: "מע\"מ",
        totalSum: "סה\"כ לתשלום",
    },
    buttonTooltip: "חשב מחירים",
};

const invoiceSectionLabels = {
    sectionName: "חשבוניות",
    titles: {
        proformaInvoiceNumber: "מספר חשבונית עסקה",
        proformaInvoiceDate: "תאריך חשבונית עסקה",
        expectedPayDate: "תאריך לתשלום",
        taxInvoiceNumber: "מספר חשבונית מס",
        taxInvoiceDate: "תאריך חשבונית מס",
        receiptNumber: "מספר קבלה",
        actualPayDay: "תאריך תשלום בפועל",
        internalOrderNumber: "מספר הזמנת רכש",
    }
};
const notesSectionLabels = {
    sectionName: "הערות",
    titles: {
        notes: "הערות נוספות"
    }
};

const orderPageDialogLabels = {
    noOrganizationSelectedTitle: "לא נבחר ארגון",
    noOrganizationSelectedContent: "לשמירת הזמנה יש לבחור ארגון",
    unrecognizedOrganization: "ארגון \"{0}\" אינו מזוהה. האם זהו ארגון חדש או קיים?",
    newOrganization: "ארגון חדש",
    existingOrganization: "ארגון קיים",
    noDataTitle: "לא הוכנסו נתונים",
    noDataContent: "לשמירת הזמנה חדשה יש להכניס נתונים",
    sendingToDatabaseFailedTitle: "שגיאה בשמירת הזמנה",
    sendingToDatabaseFailedContent: "חלה שגיאה בשמירת ההזמנה בשרת",
    missingFieldsTitle: "שדות חובה חסרים",
    missingFieldsContent: "יש למלא את כל שדות החובה המסומנים",
};

const orderPageActionButtonsLabels = {
    save: "שמור הזמנה",
    send: "שלח הצעת מחיר",
    edit: "ערוך הצעת מחיר",
    clear: "נקה טופס",
    print: "הדפס הזמנה",
    clearDialog: {
        title: "ניקוי טופס הזמנה",
        content: "האם אתה בטוח שברצונך לנקות את כל השדות בטופס?",
        clear: "נקה טופס",
        cancel: "בטל",
    }
};

export const orderPageLabels = {
    title: {
        orderNumberTitle: "הזמנה מספר ",
        newOrderTitle: "הזמנה חדשה",
    },

    sections: {
        organization: organizationSectionLabels,
        contacts: contactsSectionLabels,
        lectureDetails: lectureDetailsSectionLabels,
        lectureTimes: lectureTimesSectionLabels,
        followUp: followUpSectionLabels,
        payment: paymentSectionLabels,
        invoice: invoiceSectionLabels,
        notes: notesSectionLabels,
        titles:{
            ...organizationSectionLabels.titles,
            ...contactsSectionLabels.titles,
            ...lectureDetailsSectionLabels.titles,
            ...lectureTimesSectionLabels.titles,
            ...followUpSectionLabels.titles,
            ...paymentSectionLabels.titles,
            ...invoiceSectionLabels.titles,
            ...notesSectionLabels.titles,
        }
    },
    dialog: orderPageDialogLabels,
    actionButtons: orderPageActionButtonsLabels,
    snackBar: {
        savedSuccessfully: 'הזמנה מספר {0} נשמרה בהצלחה',
    },
    orderStatus: {
        contact: "פנייה",
        offer: "הצעת מחיר",
        order: "הזמנה",
        approvedOrder: "הזמנה מאושרת",
        isExecuting: "בביצוע",
        executed: "בוצע",
        waitingPayment: "ממתין לתשלום",
        payed: "שולם",
        cancelled: "בוטל",
        rejected: "לא אושר",
        followUp: " + המשך טיפול",
    },
    editTimes: {
        createdDate: "תאריך יצירה - ",
        changedDate: "תאריך שינוי - ",
    }

};