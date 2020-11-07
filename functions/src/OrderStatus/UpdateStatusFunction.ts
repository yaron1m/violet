import * as _ from 'lodash';
import * as express from "express";
import * as admin from "firebase-admin";
import {IOrder, IPublicCourse, calculateOrderStatus, isPublicCourseOrder} from "../Common";

export async function handleHttp(
    request: express.Request,
    response: express.Response,
    ordersRef: admin.database.Reference,
    publicCoursesRef: admin.database.Reference
) {
    try {
        const changelog = await handle(ordersRef, publicCoursesRef);
        response.send("Done, changelog: " + JSON.stringify(changelog));
    } catch (error) {
        console.error(error);
        response.status(400).send(error);
    }
}

export async function handle(
    ordersRef: admin.database.Reference,
    publicCoursesRef: admin.database.Reference
) {
    try {
        const publicCoursesSnapshot = await publicCoursesRef.once('value');
        const publicCourses = publicCoursesSnapshot.val() as IPublicCourse[];
        const ordersSnapshot = await ordersRef.once('value');

        const updatedOrders : {[id: number]: IOrder} = {};

        ordersSnapshot.forEach(order => {
            const thisOrder = order.val() as IOrder;
            let publicCourse: IPublicCourse;
            if (isPublicCourseOrder(thisOrder)) {
                publicCourse = publicCourses[thisOrder.publicCourseId];
            }

            const calculatedStatus = calculateOrderStatus(thisOrder, publicCourse);

            if (!_.startsWith(calculatedStatus, thisOrder.status)) {
                console.log("id: " + thisOrder.id + ", old status: " + thisOrder.status + ", new status: " + calculatedStatus);
                thisOrder.status = calculatedStatus;
                updatedOrders[order.key] = thisOrder;
            }
        });

        if (_.isEmpty(updatedOrders)) {
            return "No changes";
        }

        await ordersRef.update(updatedOrders);
        const changelog = _.map(updatedOrders, order => {
            return {
                id: order.id,
                newStatus: order.status,
            }
        });

        console.log(changelog);

        return changelog;

    } catch (error) {
        console.error(error);
        return error.message;
    }
}


