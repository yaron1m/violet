import * as express from 'express';
import * as functions from 'firebase-functions';
import * as admin from "firebase-admin";

export type HttpFunctionHandler =
    (
        req: express.Request,
        resp: express.Response,
        ordersRef: admin.database.Reference,
        publicCoursesRef: admin.database.Reference
    ) => void;

export function validatedHttpFunction(
    handler: HttpFunctionHandler,
    ordersRef: admin.database.Reference,
    publicCoursesRef: admin.database.Reference) {
    return functions.https.onRequest((request, response) => {
        if (!isAuthorized(request, response)) {
            return;
        }

        return handler(request, response, ordersRef, publicCoursesRef);
    });
}

function isAuthorized(request, response) {
    const rightKey = functions.config().functions.key;
    const requestKey = request.headers.authorization;

    if (rightKey !== requestKey) {
        // eslint-disable-next-line no-magic-numbers
        response.status(403).send('Unauthorized. Please add valid Authorization header.');
        return false;
    }

    return true;
}

