export function getLabels(state) {
    return state.labels
}


export default function () {
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
            newOrderTitle: " - הזמנה חדשה",
            organizationSection: {
                sectionName: "פרטי הארגון",
                titles: {
                    name: "שם הארגון",
                    address: "כתובת הארגון",
                    companyId: "ח.פ / ע.מ",
                    howReachedUs: "איך הגיע אלינו"
                }
            },
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
                    sameAudience: "קהל יעד זהה"
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
                titles:{
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
                    paymentConditions: "תנאי תשלום",
                    expectedPayDay: "תאריך לתשלום",
                    actualPayDay: "תאריך תשלום בפועל",
                    proformaInvoiceNumber: "מספר חשבונית עסקה",
                    proformaInvoiceDate: "תאריך חשבונית עסקה",
                    taxInvoiceNumber: "מספר חשבונית מס",
                    taxInvoiceDate: "תאריך חשבונית מס"
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
            },
            orderStatus:{
                contact: "פניה",
                offer:"הזמנה",
                approvedOrder:"הזמנה מאושרת",
                isExecuting:"בביצוע",
                executed:"בוצע",
                waitingPayment:"ממתין לתשלום",
                payed:"שולם",

                cancelled:"בוטל",
                disapproved:"לא אושר",
                followUp:", המשך טיפול",
            }
        },
        OrganizationPage: {
            title: "פרטי ארגונים",
            ordersTable: {
                title: "הזמנות",
                newOrderButton: "הזמנה חדשה",
                tableHeaders: [{edit: "עריכה"}, {id: "מספר הזמנה"}, {date: "תאריך הרצאה"}, {topic: "נושא"}, {status: "סטאטוס"}]
            },
            contactsTable: {
                title: "אנשי קשר בארגון",
                tableHeaders: [{edit: "עריכה"}, {firstName: "שם פרטי"}, {lastName: "שם משפחה"}, {phone1: "טלפון"}, {phone2: "טלפון נוסף"}, {phoneExtension: "שלוחה"},
                    {email: "דואר אלקטרוני"}, {fax: "פקס"}, {job: "תפקיד"}],
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