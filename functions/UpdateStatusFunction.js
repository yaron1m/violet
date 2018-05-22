const functions = require('firebase-functions');
const admin = require('firebase-admin');
const orderStatusCalculator = require("./order-status");
const _ = require('lodash');

admin.initializeApp(functions.config().firebase);

const ref = admin.database().ref("orders");

exports.updateStatus = functions.https.onRequest((request, response) => {

    const rightKey = functions.config().updatestatus.key;
    const requestKey = request.headers.authorization;

    if(rightKey !== requestKey){
        response.status(403).send('Unauthorized');
        return;
    }


    ref.once('value').then(snapshot => {
        const updatedOrders = {};

        snapshot.forEach(order => {
            const thisOrder = order.val();
            const calculatedStatus = orderStatusCalculator.calculateOrderStatus(thisOrder);

            if (!_.startsWith(calculatedStatus, thisOrder.status)) {
                console.log("id: " + thisOrder.id + ", old status: " + thisOrder.status + ", new status: " + calculatedStatus);
                thisOrder.status = calculatedStatus;
                updatedOrders[order.key] = thisOrder;
            }

        });

        return updatedOrders;
    }).then(updatedOrders => {
        if (_.isEmpty(updatedOrders)) {
            response.send("Done, No changes.");
            return;
        }

        ref.update(updatedOrders).then(() => {
            const changelog = _.map(updatedOrders, order => {
                return {
                    id: order.id,
                    newStatus: order.status,
                }
            });

            response.send("Done, changelog: " + JSON.stringify(changelog));
        }).catch(error => {
            console.error(error);
            response.status(400).send(error);
        });
    }).catch(error => {
        console.error(error);
        response.status(400).send(error);
    })


});


