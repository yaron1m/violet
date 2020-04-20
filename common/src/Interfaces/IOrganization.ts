export default interface IOrganization {
    id: number;
    organizationName: string;
    companyId: string;
    paymentConditions: string;
    organizationAddress: string;
    organizationCity: string;
    organizationPostalCode: string;
    internalOrderIdRequired: boolean;
    externalInvoiceHandler: string;
    referralWay: string;
    referralWayDetails: string;
}