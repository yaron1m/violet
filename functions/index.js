const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

const ref = admin.database().ref("orders");

exports.updateStatus = functions.https.onRequest((request, response) => {


    ref.once('value').then(snapshot => {
        const updatedOrders = {};
        console.log("snapshot:" + JSON.stringify(snapshot));

        snapshot.forEach(order =>{
            const thisOrder=order.val();
            console.log("thisOrder:" + thisOrder);
            thisOrder.nextId= parseInt(thisOrder.id) + 1;
            console.log("thisOrder After:" + JSON.stringify(thisOrder));
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


