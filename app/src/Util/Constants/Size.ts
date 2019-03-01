export enum Size {
    S,
    M,
    L,
    XL,
    XXL,
}

export function getFieldWidth(fullWidth?: boolean, size?: Size) {
    if (fullWidth)
        return "100%";

    switch (size) {
        case Size.S:
            return 50;

        case Size.M:
            return 100;

        case Size.L:
        default:
            return 150;

        case Size.XL:
            return 200;

        case Size.XXL:
            return 250;
    }
}