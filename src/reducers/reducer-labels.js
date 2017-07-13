export default function () {
    return {
        softwareName: "Violet",
        version: "0.0.0",
        header: {
            searchLineHint: "חיפוש..."
        },
        orderPage: {
            title: "טופס הזמנת הרצאה",
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
                table: "lectureDetails",
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
                    table: "lectureTimes",
                    sectionName: "הרצאות",
                    titles: {
                        date: "תאריך",
                        startTime: "שעת התחלה",
                        endTime: "שעת סיום",
                        length: "משך",
                        topic: "נושא",
                        audienceSize: "מס' משתתפים",
                        shirtColor: "צבע חולצה",
                        tie: "עניבה"
                    }
                }
            },
            contactsSection: {
                sectionName: "איש קשר",
                titles: {
                    firstName: "שם פרטי",
                    lastName: "שם משפחה",
                    phone1: "טלפון",
                    phone2: "טלפון נוסף",
                    phoneExtension: "שלוחה",
                    email: "דואר אלקטרוני",
                    fax: "פקס",
                    job: "תפקיד"
                }
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
            financialContactsSection: {
                sectionName: "איש קשר לתשלום",
                titles: {
                   firstName: "שם פרטי",
                   lastName: "שם משפחה",
                   phone1: "טלפון",
                   phone2: "טלפון נוסף",
                   phoneExtension: "שלוחה",
                   email: "דואר אלקטרוני",
                   fax: "פקס",
                   job: "תפקיד"
                }
            },
            notesSection: {
                sectionName: "הערות",
                titles: {
                    notes: "הערות נוספות"
                }
            }
        },
        OrganizationPage: {
            title: "פרטי ארגונים",
            ordersTable: {
                title: "הזמנות",
                tableHeaders: ["מספר הזמנה", "תאריך הרצאה", "נושא", "סטאטוס", "עריכה"]
            }
        },
        buttons: {
            ok: "אישור",
            cancel: "ביטול"
        }
    };
}