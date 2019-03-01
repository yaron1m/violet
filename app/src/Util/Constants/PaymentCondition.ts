export enum PaymentCondition {
    Immediate = "immediate",
    EndOfTheMonth = "EOM",
    EndOfTheMonthPlus30 = "EOM+30",
    EndOfTheMonthPlus45 = "EOM+45",
    EndOfTheMonthPlus60 = "EOM+60",
    EndOfTheMonthPlus30plus7 = "EOM+30+7",
    EndOfTheMonthPlus30plus22 = "EOM+30+22",
}

export const paymentConditionLabels = {
    "immediate": "תשלום מיידי",
    "EOM": "שוטף + 0",
    "EOM+30": "שוטף + 30",
    "EOM+45": "שוטף + 45",
    "EOM+60": "שוטף + 60",
    "EOM+30+7": "שוטף + 30 + 7 לחודש",
    "EOM+30+22": "שוטף + 30 + 22 לחודש",
};