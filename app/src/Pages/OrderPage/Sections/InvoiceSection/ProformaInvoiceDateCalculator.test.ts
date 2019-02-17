import calculatePayDate from "./ProformaInvoiceDateCalculator";

const allPaymentConditions = {
    "immediate": "תשלום מיידי",
    "EOM": "שוטף + 0",
    "EOM+30": "שוטף + 30",
    "EOM+45": "שוטף + 45",
    "EOM+60": "שוטף + 60",
    "EOM+30+7": "שוטף + 30 + 7 לחודש",
    "EOM+30+22": "שוטף + 30 + 22 לחודש",
};

describe("Proforma Invoice Date Calculator", () => {
    it("should return null when empty input date", () => {
        const proformaInvoiceDate = "";

        const selectedPaymentConditions = allPaymentConditions.immediate;

        const result = calculatePayDate(proformaInvoiceDate, selectedPaymentConditions, allPaymentConditions);

        expect(result).toBeNull();
    });

    it("should return null when null input date", () => {
        const proformaInvoiceDate = null;

        const selectedPaymentConditions = allPaymentConditions.immediate;

        // @ts-ignore
        const result = calculatePayDate(proformaInvoiceDate, selectedPaymentConditions, allPaymentConditions);

        expect(result).toBeNull();
    });

    it("should return null when no payment conditions", () => {
        const proformaInvoiceDate = "2018-06-09";

        const selectedPaymentConditions = "";

        const result = calculatePayDate(proformaInvoiceDate, selectedPaymentConditions, allPaymentConditions);

        expect(result).toBeNull();
    });

    it("should return null when null payment conditions", () => {
        const proformaInvoiceDate = "2018-06-09";

        const selectedPaymentConditions = null;

        // @ts-ignore
        const result = calculatePayDate(proformaInvoiceDate, selectedPaymentConditions, allPaymentConditions);

        expect(result).toBeNull();
    });

    it("should return the same date when payment condition is immediate", () => {
        const proformaInvoiceDate = "2018-06-09";

        const selectedPaymentConditions = allPaymentConditions.immediate;

        const result = calculatePayDate(proformaInvoiceDate, selectedPaymentConditions, allPaymentConditions);

        expect(result).toEqual("2018-06-09");
    });

    it("should return the first day of the next month", () => {
        const proformaInvoiceDate = "2018-12-09";

        const selectedPaymentConditions = allPaymentConditions.EOM;

        const result = calculatePayDate(proformaInvoiceDate, selectedPaymentConditions, allPaymentConditions);

        expect(result).toEqual("2019-01-01");
    });

    it("should return End of Month + 30", () => {
        const proformaInvoiceDate = "2018-12-09";

        const selectedPaymentConditions = allPaymentConditions["EOM+30"];

        const result = calculatePayDate(proformaInvoiceDate, selectedPaymentConditions, allPaymentConditions);

        expect(result).toEqual("2019-02-01");
    });

    it("should return End of Month + 45", () => {
        const proformaInvoiceDate = "2018-12-09";

        const selectedPaymentConditions = allPaymentConditions["EOM+45"];

        const result = calculatePayDate(proformaInvoiceDate, selectedPaymentConditions, allPaymentConditions);

        expect(result).toEqual("2019-02-15");
    });

    it("should return End of Month + 60", () => {
        const proformaInvoiceDate = "2018-12-09";

        const selectedPaymentConditions = allPaymentConditions["EOM+60"];

        const result = calculatePayDate(proformaInvoiceDate, selectedPaymentConditions, allPaymentConditions);

        expect(result).toEqual("2019-03-01");
    });

    it("should return End of Month + 30 + 7", () => {
        const proformaInvoiceDate = "2018-12-09";

        const selectedPaymentConditions = allPaymentConditions["EOM+30+7"];

        const result = calculatePayDate(proformaInvoiceDate, selectedPaymentConditions, allPaymentConditions);

        expect(result).toEqual("2019-02-07");
    });

    it("should return End of Month + 30+22", () => {
        const proformaInvoiceDate = "2018-12-09";

        const selectedPaymentConditions = allPaymentConditions["EOM+30+22"];

        const result = calculatePayDate(proformaInvoiceDate, selectedPaymentConditions, allPaymentConditions);

        expect(result).toEqual("2019-02-22");
    });

    it("should return null when payment conditions are unknown", () => {
        const proformaInvoiceDate = "2018-12-09";

        const selectedPaymentConditions = "Blah";

        const result = calculatePayDate(proformaInvoiceDate, selectedPaymentConditions, allPaymentConditions);

        expect(result).toBeNull();
    });
});