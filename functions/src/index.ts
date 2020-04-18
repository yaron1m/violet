import {validatedHttpFunction} from "./Util/AuthorizationValidator";
import UpdateStatusFunction from "./OrderStatus/UpdateStatusFunction";
import * as functions from 'firebase-functions';
import * as admin from "firebase-admin";

admin.initializeApp(functions.config().firebase);

const database = admin.database();
const ordersRef = database.ref("orders");
const publicCoursesRef = database.ref("publicCourses");

export const updateStatusFunction = validatedHttpFunction(UpdateStatusFunction, ordersRef, publicCoursesRef);

