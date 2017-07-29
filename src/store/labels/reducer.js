export function getLabels(state) {
    return state.labels
}


export default function () {
    return {
        softwareName: "Violet",
        version: "0.0.0",
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
                tableHeaders: [{firstName: "שם פרטי"}, {lastName: "שם משפחה"}, {phone1: "טלפון"}, {phone2: "טלפון נוסף"}, {phoneExtension: "שלוחה"},
                    {email: "דואר אלקטרוני"}, {fax: "פקס"}, {job: "תפקיד"}]
            },
            followUpSection: {
                sectionName: "המשך טיפול",
                titles: {
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
            }
        },
        OrganizationPage: {
            title: "פרטי ארגונים",
            ordersTable: {
                title: "הזמנות",
                newOrderButton: "הזמנה חדשה",
                tableHeaders: [{id: "מספר הזמנה"}, {lectureDate: "תאריך הרצאה"}, {topic: "נושא"}, {status: "סטאטוס"}, {edit: "עריכה"}]
            },
            contactsTable: {
                title: "אנשי קשר בארגון",
                tableHeaders: [{firstName: "שם פרטי"}, {lastName: "שם משפחה"}, {phone1: "טלפון"}, {phone2: "טלפון נוסף"}, {phoneExtension: "שלוחה"},
                    {email: "דואר אלקטרוני"}, {fax: "פקס"}, {job: "תפקיד"}, {edit: "עריכה"}]
            },
            snackBar: {
                savedSuccessfully: 'ארגון "{0}" נשמר בהצלחה',
            },
            dialog: {
                noOrganizationSelectedTitle: "לא נבחר ארגון",
                noOrganizationSelectedContent: "עדכון פרטי ארגון אפשרי רק עבור ארגונים קיימים, נסה לשמור ארגון חדש",
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
        }
    };
}