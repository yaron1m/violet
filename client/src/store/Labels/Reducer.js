import pages from './Pages/index'

export default function labels() {
    return {
        softwareName: "Violet",
        currencyIcon: "₪",
        header: {
            searchLineHint: "חיפוש...",
            organizationPrefix: "ארגון: ",
            orderPrefix: "הזמנה: ",
            logOut: "יציאה",
        },
        pages,
        orderTypes: {
            publicCourse: "קורס ציבורי"
        }
    };
}