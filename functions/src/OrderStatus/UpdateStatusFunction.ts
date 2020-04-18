import * as _ from 'lodash';
import * as express from "express";
import * as admin from "firebase-admin";
import IOrder from "../IOrder";
import {calculateOrderStatus} from "./OrderStatusCalculator";

export default async function (
    request: express.Request,
    response: express.Response,
    ordersRef: admin.database.Reference,
    publicCoursesRef: admin.database.Reference
) {
    try {
        const publicCoursesSnapshot = await publicCoursesRef.once('value');
        const publicCourses = publicCoursesSnapshot.val();
        const ordersSnapshot = await ordersRef.once('value');

        const updatedOrders : {[id: number]: IOrder} = {};

        ordersSnapshot.forEach(order => {
            const thisOrder = order.val() as IOrder;
            const calculatedStatus = calculateOrderStatus(thisOrder, publicCourses);

            if (!_.startsWith(calculatedStatus, thisOrder.status)) {
                console.log("id: " + thisOrder.id + ", old status: " + thisOrder.status + ", new status: " + calculatedStatus);
                thisOrder.status = calculatedStatus;
                updatedOrders[order.key] = thisOrder;
            }
        });

        if (_.isEmpty(updatedOrders)) {
            response.send("Done, No changes.");
            return;
        }

        await ordersRef.update(updatedOrders);
        const changelog = _.map(updatedOrders, order => {
            return {
                id: order.id,
                newStatus: order.status,
            }
        });

        response.send("Done, changelog: " + JSON.stringify(changelog));
    } catch (error) {
        console.error(error);
        response.status(400).send(error);
    }
}


