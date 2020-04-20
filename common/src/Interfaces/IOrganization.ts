export default interface IOrganization {
    id: number;
    organizationName: string;
    companyId: string;
    paymentConditions: string;
    organizationAddress: string;
    organizationCity: string;
    organizationPostalCode: string;
    internalOrderIdRequired: boolean;
    externalInvoiceReceiverRequired: boolean;
    referralWay: string;
    referralWayDetails: string;
}