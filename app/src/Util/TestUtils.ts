import {IGetState} from "../Interfaces/ReduxInterfaces";

export function getMockedDispatch(mockedGetState: IGetState) {
    const mockedDispatch = jest.fn(action => {
        if (isFunction(action))
            action(mockedDispatch, mockedGetState);
    });

    return mockedDispatch;
}

function isFunction(functionToCheck: Function) {
    return functionToCheck && {}.toString.call(functionToCheck) === "[object Function]";
}