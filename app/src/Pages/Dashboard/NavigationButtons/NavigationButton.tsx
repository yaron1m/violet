import React from "react";
import CustomPaper from "../../../Components/CustomComponents/CustomPaper";

export default function NavigationButton(props: NavigationButtonProps) {
    const style = {
        width: 250,
        cursor: "pointer"   ,
        textAlign: "center" as "center",
        fontSize: 18,
        fontWeight: "bold" as "bold",
    };

    return (
        <CustomPaper style={style} onClick={props.onClick}>
            {props.title}
        </CustomPaper>
    );
}

interface NavigationButtonProps {
    title: string;
    onClick: () => void;
}
