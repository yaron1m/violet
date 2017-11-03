const Sizes = {
    S: 0,
    M: 1,
    L: 2,
    XL: 3,
};

export function isValidSize(size) {
    return Object.values(Sizes).indexOf(size) > -1;
}

export default Sizes;