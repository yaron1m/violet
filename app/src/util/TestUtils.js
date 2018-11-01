export function getMockedDispatch(mockedGetState) {
    const mockedDispatch = jest.fn(action => {
        if (isFunction(action))
            action(mockedDispatch, mockedGetState);
    });

    return mockedDispatch;
}

function isFunction(functionToCheck) {
    return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
}