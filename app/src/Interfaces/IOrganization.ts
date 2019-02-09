export default interface IOrganization{
    id: number;
    organizationName: string;
    companyId: string;
    organizationAddress: string;
    organizationCity: string;
    organizationPostalCode: string;
    internalOrderIdRequired?: boolean;
}