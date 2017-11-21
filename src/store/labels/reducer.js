import {pages} from './pages/index'

export function getLabels(state) {
    return state.labels
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

    };
}