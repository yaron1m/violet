import pages from './Pages/index'

export function getLabels(state) {
    return state.labels
}

export function getStatusLabels(state) {
    return getLabels(state).pages.orderPage.orderStatus
}

export function getStatusLabel(state, status){
    return getStatusLabels(state)[status];
}

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