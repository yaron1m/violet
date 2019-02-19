import React from "react";
import CustomPaper, {flexStyle} from "../../../../Components/CustomComponents/CustomPaper";
import {Size} from "../../../../Util/Constants/Size";
import {
    OrganizationCustomAutoComplete,
    OrganizationCustomSelectField,
    OrganizationCustomText,
    OrganizationCustomToggle
} from "../ConnectedCustomComponents/OrganizationCustomFields";
import {ISuggestion} from "../../../../Components/AutoSuggest";
import {IOption} from "../../../../Components/CustomComponents/CustomSelectField";

export default function OrganizationSection(props: OrganizationSectionProps) {
    return (
        <CustomPaper title={props.sectionName}>
            <div style={flexStyle}>
                <OrganizationCustomAutoComplete
                    name="organizationName"
                    suggestions={props.organizationSuggestions}
                    onSuggestionSelected={(suggestion: ISuggestion) => {
                        const organizationSuggestion = suggestion as IOrganizationSuggestion;
                        props.selectOrganization(organizationSuggestion.organizationId);
                        props.updateSelectedOrder("organizationId", organizationSuggestion.organizationId);
                    }}
                    size={Size.XXL}
                />
                <OrganizationCustomText name="organizationAddress"/>
                <OrganizationCustomText name="organizationCity" size={Size.M}/>
                <OrganizationCustomText name="organizationPostalCode" size={Size.S}/>
                <OrganizationCustomText name="companyId" size={Size.M}/>
                <OrganizationCustomAutoComplete name="paymentConditions" suggestions={props.paymentConditionsSuggestions}/>
            </div>
            <div style={flexStyle}>
                <OrganizationCustomSelectField name="referralWay" size={Size.XL} options={props.referralWayOptions}/>
                <OrganizationCustomText name="referralWayDetails" size={Size.XXL}/>

                {props.fullDetails && <OrganizationCustomToggle name="internalOrderIdRequired"/>}
            </div>
        </CustomPaper>
    );
}

export interface IOrganizationSuggestion extends ISuggestion {
    organizationId: number;
}

interface OrganizationSectionProps {
    fullDetails?: boolean;
    sectionName: string;
    paymentConditionsSuggestions: ISuggestion[];
    organizationSuggestions: IOrganizationSuggestion[];
    selectOrganization: (organizationId: number) => void;
    updateSelectedOrder: (key: string, value: any) => void;
    referralWayOptions: IOption[];
}