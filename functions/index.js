const functions = require('firebase-functions');
const admin = require('firebase-admin');
const orderStatusCalculator = require("./order-status");

admin.initializeApp(functions.config().firebase);

const ref = admin.database().ref("orders");

exports.updateStatus = functions.https.onRequest((request, response) => {


    ref.once('value').then(snapshot => {
        const updatedOrders = {};
        console.log("snapshot:" + JSON.stringify(snapshot));

        snapshot.forEach(order =>{
            const thisOrder=order.val();
            thisOrder.status= orderStatusCalculator.calculateOrderStatus(thisOrder);
            console.log("new Status:" + thisOrder.status);
            updatedOrders[order.key] = thisOrder;
        });

        console.log("updatedOrders:");
        console.log(updatedOrders);

        return updatedOrders;
    }).then(updatedOrders => {
        ref.update(updatedOrders).then(() => {
            response.send("done");
        }).catch( error => {
            response.send(error);
        });
    }).catch( error => {
        response.send(error);
    })


});


