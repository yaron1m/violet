import {validatedHttpFunction} from "./Util/AuthorizationValidator";
import * as UpdateStatusFunction from "./OrderStatus/UpdateStatusFunction";
import * as functions from 'firebase-functions';
import * as admin from "firebase-admin";

admin.initializeApp(functions.config().firebase);

const database = admin.database();
const ordersRef = database.ref("orders");
const publicCoursesRef = database.ref("publicCourses");

export const updateStatusFunction = validatedHttpFunction(UpdateStatusFunction.handleHttp, ordersRef, publicCoursesRef);
export const updateStatusCron = functions.pubsub
    .schedule("0 12 * * *")
    .timeZone("Asia/Jerusalem")
    .onRun(async (context) => {
        await UpdateStatusFunction.handle(ordersRef, publicCoursesRef);
        return null;
    });

