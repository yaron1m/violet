export function getLabels(state) {
    return state.labels
}

export function convertStatus(status){
    return labels().orderPage.orderStatus[status];
}

export default function labels() {
    return {
        softwareName: "Violet",
        version: "0.1.0",
        header: {
            searchLineHint: "חיפוש...",
            organizationPrefix: "ארגון: ",
            orderPrefix: "הזמנה: ",
            logOut: "יציאה",
        },
        orderPage: {
            title: "טופס הזמנת הרצאה",
            orderNumberTitle: " - הזמנה מספר ",
            orderStatusTitle: " -    סטאטוס: ",
            newOrderTitle: " - הזמנה חדשה",
            lectureDetailsSection: {
                sectionName: "פרטי ההרצאה",
                titles: {
                    location: "מיקום ההרצאה",
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
                },
                lectureTimesSection: {
                    sectionName: "הרצאות",
                    tableHeaders: [{date: "תאריך"}, {startTime: "שעת התחלה"}, {endTime: "שעת סיום"}, {duration: "משך"}, {topic: "נושא"},
                        {audienceSize: "מס' משתתפים"}, {shirtColor: "צבע חולצה"}, {tie: "עניבה"}, {edit: "עריכה"}],
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
                            shirtColor: "צבע חולצה",
                            tie: "עניבה"
                        },
                    }
                }
            },
            contactsSection: {
                sectionName: "אנשי קשר",
                financialContactTitle: "איש קשר לתשלום",
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
                }
            },
            followUpSection: {
                sectionName: "המשך טיפול",
                titles: {
                    followUpRequired: "נדרש המשך טיפול",
                    followUpDate: "תאריך המשך טיפול",
                    followUpDetails: "פרטים"
                }
            },
            paymentSection: {
                sectionName: "תשלום",
                titles: {
                    amount: "סכום לתשלום",
                    proformaInvoiceNumber: "מספר חשבונית עסקה",
                    proformaInvoiceDate: "תאריך חשבונית עסקה",
                    expectedPayDay: "תאריך לתשלום",

                    taxInvoiceNumber: "מספר חשבונית מס",
                    taxInvoiceDate: "תאריך חשבונית מס",
                    receiptNumber: "מספר קבלה",
                    actualPayDay: "תאריך תשלום בפועל",
                }
            },
            notesSection: {
                sectionName: "הערות",
                titles: {
                    notes: "הערות נוספות"
                }
            },
            snackBar: {
                savedSuccessfully: 'הזמנה מספר {0} נשמרה בהצלחה',
            },
            dialog: {
                noOrganizationSelectedTitle: "לא נבחר ארגון",
                noOrganizationSelectedContent: "לשמירת הזמנה יש לבחור ארגון",
                noDataTitle: "לא הוכנסו נתונים",
                noDataContent: "לשמירת הזמנה חדשה יש להכניס נתונים",
                sendingToDatabaseFailedTitle: "שגיאה בשמירת הזמנה",
                sendingToDatabaseFailedContent: "חלה שגיאה בשמירת ההזמנה בשרת",
                missingFieldsTitle: "שדות חובה חסרים",
                missingFieldsContent: "יש למלא את כל שדות החובה לסטאטוס זה: ",
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
                disapproved: "לא אושר",
                followUp: " + נדרש המשך טיפול",
            },
            actionButtons:{
                save: "שמור הזמנה",
                send: "שלח הצעת מחיר",
                clean: "נקה טופס",
            }
        },
        OrganizationPage: {
            title: "פרטי ארגונים",
            organizationSection: {
                sectionName: "פרטי הארגון",
                titles: {
                    organizationName: "שם הארגון",
                    organizationAddress: "כתובת הארגון",
                    companyId: "ח.פ / ע.מ",
                    paymentConditions: "תנאי תשלום",
                    howReachedUs: "איך הגיע אלינו"
                }
            },
            ordersSummary: {
                title: "הזמנות",
                addRow: "הוסף הזמנה חדשה",
                tableHeaders: [{id: "מספר הזמנה"}, {date: "תאריך הרצאה"}, {topic: "נושא"}, {status: "סטאטוס"}, {edit: "עריכה"}]
            },
            contactsTable: {
                title: "אנשי קשר בארגון",
                tableHeaders: [{firstName: "שם פרטי"}, {lastName: "שם משפחה"}, {phone1: "טלפון"}, {phone2: "טלפון נוסף"}, {phoneExtension: "שלוחה"},
                    {email: "דואר אלקטרוני"}, {fax: "פקס"}, {job: "תפקיד"}, {edit: "עריכה"}],
                editDialog: {
                    dialogTitle: "ערוך פרטי איש קשר",
                    titles: {
                        firstName: "שם פרטי",
                        lastName: "שם משפחה",
                        phone1: "טלפון",
                        phone2: "טלפון נוסף",
                        phoneExtension: "שלוחה",
                        email: "דואר אלקטרוני",
                        fax: "פקס",
                        job: "תפקיד",
                    },
                }
            },
            snackBar: {
                savedSuccessfully: 'ארגון "{0}" נשמר בהצלחה',
            },
            dialog: {
                noOrganizationSelectedTitle: "לא נבחר ארגון",
                noOrganizationSelectedContent: "עדכון פרטי ארגון אפשרי רק עבור ארגונים קיימים, נסה לשמור ארגון חדש",
                noDataTitle: "לא הוכנסו נתונים",
                noDataContent: "לשמירת ארגון חדש יש להכניס נתונים",
                organizationAlreadySelectedTitle: "פרטי ארגון כבר טעונים במערכת",
                organizationAlreadySelectedContent: "לשמירת ארגון חדש יש ראשית לנקות את הארגון הטעון",
                sendingToDatabaseFailedTitle: "שגיאה בשמירת פרטי ארגון",
                sendingToDatabaseFailedContent: "חלה שגיאה בשמירת פרטי הארגון בשרת",
            }
        },
        loginPage: {
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
        }
    };
}