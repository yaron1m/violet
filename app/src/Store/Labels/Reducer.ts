import pages from './Pages';

export default function labels() {
    return {
        softwareName: 'Violet',
        currencyIcon: '₪',
        header: {
            searchLineHint: 'חיפוש...',
            organizationPrefix: 'ארגון: ',
            orderPrefix: 'הזמנה: ',
            logOut: 'יציאה',
        },
        pages,
        orderTypes: {
            internalCourse: 'קורס פנים ארגוני',
            publicCourse: 'קורס ציבורי'
        },
        orderStatus: {
            contact: 'פנייה',
            offer: 'הצעת מחיר',
            order: 'הזמנה',
            approvedOrder: 'הזמנה מאושרת',
            isExecuting: 'בביצוע',
            executed: 'בוצע',
            waitingPayment: 'ממתין לתשלום',
            payed: 'שולם',
            cancelled: 'בוטל',
            rejected: 'לא אושר',
            followUp: ' + המשך טיפול',
        },
    };
}