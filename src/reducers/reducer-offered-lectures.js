import {RECEIVE_OFFERED_LECTURES} from '../actions/action-database';


export default (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_OFFERED_LECTURES:
            return action.payload;

        default:
            return state;
    }
}


// export default function () {
//     return [
//         {name: '17025', isActive: true},
//         {name: '18001', isActive: true},
//         {name: '9001 מהדורת 2015', isActive: true},
//         {name: 'AS-9100 C 2009 01', isActive: true},
//         {name: 'GPS ככלי לניהול איכות', isActive: true},
//         {name: 'GPS ככלי לניהול בטיחות', isActive: true},
//         {name: 'אופיין שרות', isActive: true},
//         {name: 'אחריות הורית', isActive: true},
//         {name: 'אחריות חברתית', isActive: true},
//         {name: 'איך להצליח בעסקים', isActive: true},
//         {name: 'איכות WIIFM', isActive: true},
//         {name: 'איכות בניהול', isActive: true},
//         {name: 'איכות בשרות פנימי', isActive: true},
//         {name: 'איכות בשרשרת האספקה', isActive: true},
//         {name: 'איכות בתעבורה', isActive: true},
//         {name: 'איכות השרות', isActive: true},
//         {name: 'איכות ובטיחות', isActive: true},
//         {name: 'אירוע קייזן', isActive: true},
//         {name: 'בין איכות ליצירתיות', isActive: true},
//         {name: 'בין בטיחות ליצירתיות (ירון)', isActive: true},
//         {name: 'הבטחת איכות בסיסית', isActive: true},
//         {name: 'הגדרת אמן בנשמ', isActive: true},
//         {name: 'הגורם האנושי בכביש', isActive: true},
//         {name: 'הדפסת  נתונים', isActive: true},
//         {name: 'הדפסת נתונים גיבוי', isActive: true},
//         {name: 'המסע מאיכות למצוינות עובר דרך חשיבה יצירתית', isActive: true},
//         {name: 'הצעת מחיר כללית', isActive: true},
//         {name: 'התמודדות עם שינויים', isActive: true},
//         {name: 'חקר אירוע והפקת לקחים', isActive: true},
//         {name: 'חשיבה יצירתית', isActive: true},
//         {name: 'חשמל סטאטי', isActive: true},
//         {name: 'טיפול בתלונות לקוח', isActive: true},
//         {name: 'טכניקות סטטיסטיות', isActive: true},
//         {name: 'יום ריענון לקורס עורכי מבדקים', isActive: true},
//         {name: 'יחסי ספק לקוח', isActive: true},
//         {name: 'כלים ניהוליים להשגת מטרות אישיות מקצועיות ומשפחתיות', isActive: true},
//         {name: 'כתיבת נהלים והוראות עבודה', isActive: true},
//         {name: 'מודעות לאיכות הסביבה', isActive: true},
//         {name: 'מודעות לאיכות', isActive: true},
//         {name: 'מודעות לבטיחות', isActive: true},
//         {name: 'מניעת פציעות כתוצאה מהחלקה ומעידה', isActive: true},
//         {name: 'מניעת פציעות כתוצאה משבר כלי זכוכית', isActive: true},
//         {name: 'מערכת ניהול איכות משולבת', isActive: true},
//         {name: 'מצויינות אישית וארגונית', isActive: true},
//         {name: 'מתי 005', isActive: true},
//         {name: 'נבדקים', isActive: true},
//         {name: 'עורכי מבדקי איכות פנימיים עם סימולציה', isActive: true},
//         {name: 'עורכי מבדקים למערכות ניהול משולבות', isActive: true},
//         {name: 'עורכי מבדקים פנימיים לפי 14001', isActive: true},
//         {name: 'עורכי מבדקים פנימיים לפי 18001', isActive: true},
//         {name: 'עורכי מבדקים', isActive: true},
//         {name: 'עלויות אי איכות', isActive: true},
//         {name: 'פעילות חוויתית בנושא איכות ומצוינות', isActive: true},
//         {name: 'צוותי שיפור', isActive: true},
//         {name: 'ק.ע.מ.ב.', isActive: true},
//         {name: 'ק.ע.מ.פ. AS9100', isActive: true},
//         {name: 'קורס מנחי קייזן למשתתף בודד', isActive: true},
//         {name: 'קורס מנחי קייזן פנים ארגוני', isActive: true},
//         {name: 'קייזן', isActive: true},
//         {name: 'שדרוג עורכי מבדקים ל16949', isActive: true},
//         {name: 'שדרוג עורכי מבדקים ל9100', isActive: true},
//         {name: 'שדרוג עורכי מבדקים לבכירים', isActive: true},
//         {name: 'תחרות איכות פנים ארגונית', isActive: true},
//         {name: 'תחרות הפרס הלאומי לאיכות', isActive: true},
//         {name: 'תרבות ניהול איכות', isActive: true}
//     ]
// }
