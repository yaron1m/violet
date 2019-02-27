import React from "react";
import CustomPaper, {flexStyle} from "../../../../Components/CustomComponents/CustomPaper";
import {Size} from "../../../../Util/Constants/Size";
import {ISuggestion} from "../../../../Components/AutoSuggest";
import CustomSelectField, {IOption} from "../../../../Components/CustomComponents/CustomSelectField";
import CustomAutoComplete from "../../../../Components/CustomComponents/CustomAutoComplete";
import CustomTextField from "../../../../Components/CustomComponents/CustomTextField";
import IOrganization from "../../../../Interfaces/IOrganization";
import _ from "lodash";
import CustomToggle from "../../../../Components/CustomComponents/CustomToggle";

export default function OrganizationSection(props: OrganizationSectionProps) {
    const org = props.organization;

    return (
        <CustomPaper title="פרטי הארגון">
            <div style={flexStyle}>
                <CustomAutoComplete
                    title="שם הארגון"
                    value={org.organizationName}
                    isRequired={_.includes(props.requiredFields, "organizationName")}
                    onChange={props.onOrganizationChange("organizationName")}
                    suggestions={props.organizationSuggestions}
                    onSuggestionSelected={(suggestion: ISuggestion) => {
                        const organizationSuggestion = suggestion as IOrganizationSuggestion;
                        props.selectOrganization(organizationSuggestion.organizationId);
                        props.updateSelectedOrder("organizationId", organizationSuggestion.organizationId);
                    }}
                    size={Size.XXL}

                />
                <CustomTextField
                    title="כתובת הארגון"
                    value={org.organizationAddress}
                    isRequired={_.includes(props.requiredFields, "organizationAddress")}
                    onChange={props.onOrganizationChange("organizationAddress")}
                />
                <CustomTextField
                    title="עיר"
                    value={org.organizationCity}
                    isRequired={_.includes(props.requiredFields, "organizationCity")}
                    onChange={props.onOrganizationChange("organizationCity")}
                    size={Size.M}
                />
                <CustomTextField
                    title="מיקוד"
                    value={org.organizationPostalCode}
                    isRequired={_.includes(props.requiredFields, "organizationPostalCode")}
                    onChange={props.onOrganizationChange("organizationPostalCode")}
                    size={Size.S}
                />
                <CustomTextField
                    title="ח.פ / ע.מ"
                    value={org.companyId}
                    isRequired={_.includes(props.requiredFields, "companyId")}
                    onChange={props.onOrganizationChange("companyId")}
                    size={Size.M}
                />
                <CustomAutoComplete
                    title="תנאי תשלום"
                    value={org.paymentConditions}
                    isRequired={_.includes(props.requiredFields, "paymentConditions")}
                    onChange={props.onOrganizationChange("paymentConditions")}
                    suggestions={props.paymentConditionsSuggestions}
                />
            </div>
            <div style={flexStyle}>
                <CustomSelectField
                    title="איך הגיע אלינו ההגעה"
                    value={org.referralWay}
                    isRequired={_.includes(props.requiredFields, "referralWay")}
                    onChange={props.onOrganizationChange("referralWay")}
                    options={props.referralWayOptions}
                    size={Size.XL}
                />
                <CustomTextField
                    title="פרטי ההגעה"
                    value={org.referralWayDetails}
                    isRequired={_.includes(props.requiredFields, "referralWayDetails")}
                    onChange={props.onOrganizationChange("referralWayDetails")}
                    size={Size.XXL}
                />

                {props.fullDetails &&
                <CustomToggle
                    title="נדרשת הזמנת רכש"
                    value={org.internalOrderIdRequired}
                    isRequired={_.includes(props.requiredFields, "internalOrderIdRequired")}
                    onChange={props.onOrganizationChangeBoolean("internalOrderIdRequired")}
                />}
            </div>
        </CustomPaper>
    );
}

export interface IOrganizationSuggestion extends ISuggestion {
    organizationId: number;
}

interface OrganizationSectionProps {
    fullDetails: boolean;
    organization: IOrganization;
    requiredFields: string[];
    onOrganizationChange: (filedName: string) => (value: string) => void;
    onOrganizationChangeBoolean: (filedName: string) => (value: boolean) => void;
    paymentConditionsSuggestions: ISuggestion[];
    organizationSuggestions: IOrganizationSuggestion[];
    selectOrganization: (organizationId: number) => void;
    updateSelectedOrder: (key: string, value: any) => void;
    referralWayOptions: IOption[];
}