export function getLabels(state) {
    return state.labels
}

export default function labels() {
    return {
        softwareName: "Violet",
        version: "1.1.0",
        header: {
            searchLineHint: "חיפוש...",
            organizationPrefix: "ארגון: ",
            orderPrefix: "הזמנה: ",
            logOut: "יציאה",
        },
        homePage: {
            navigationButtons:{
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
        },
        orderPage: {
            title: "טופס הזמנת הרצאה",
            orderNumberTitle: " - הזמנה מספר ",
            orderStatusTitle: "סטאטוס: ",
            newOrderTitle: " - הזמנה חדשה",
            lectureDetailsSection: {
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
                financialContactTitle: "איש קשר לתשלום",
                titles: {
                    amount: "סכום לתשלום",
                    proformaInvoiceNumber: "מספר חשבונית עסקה",
                    proformaInvoiceDate: "תאריך חשבונית עסקה",
                    expectedPayDate: "תאריך לתשלום",
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
                unrecognizedOrganization: "ארגון \"{0}\" אינו מזוהה. האם זהו ארגון חדש או קיים?",
                newOrganization: "ארגון חדש",
                existingOrganization: "ארגון קיים",
                noDataTitle: "לא הוכנסו נתונים",
                noDataContent: "לשמירת הזמנה חדשה יש להכניס נתונים",
                sendingToDatabaseFailedTitle: "שגיאה בשמירת הזמנה",
                sendingToDatabaseFailedContent: "חלה שגיאה בשמירת ההזמנה בשרת",
                missingFieldsTitle: "שדות חובה חסרים",
                missingFieldsContent: "יש למלא את כל שדות החובה המסומנים",
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
            actionButtons: {
                save: "שמור הזמנה",
                send: "שלח הצעת מחיר",
                clear: "נקה טופס",
            }
        },
        OrganizationPage: {
            title: "פרטי ארגונים",
            organizationSection: {
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
        },
        followUpPage: {
            title: "המשך טיפול - טבלת מעקב",
            table: {
                title: "הזמנות בהן נדרש המשך טיפול",
                tableHeaders: [
                    {id: "מספר הזמנה"},
                    {organizationName: "שם הארגון"},
                    {lectureDate: "תאריך הרצאה"},
                    {topic: "נושא"},
                    {status: "סטאטוס הזמנה"},
                    {followUpDate: "תאריך המשך טיפול"},
                    {followUpDetails: "פרטי המשך טיפול"},
                    {edit: "עריכה"}]
            },
        },
        paymentPage: {
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
        },
        futureLecturesPage: {
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
        },
        allOrdersPage: {
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
        },
    };
}