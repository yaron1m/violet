const _ = require('lodash');


module.exports = function (request, response, ref) {
    ref.once('value').then(snapshot => {
        const ordersToUpdate = {};

        snapshot.forEach(order => {
            const updatedOrder = getUpdatedOrder(order.val());

            if (updatedOrder !== null)
                ordersToUpdate[order.key] = updatedOrder;
        });

        console.log("orders to update" + JSON.stringify(ordersToUpdate));
        return ordersToUpdate;
    }).then(ordersToUpdate => {
        if (_.isEmpty(ordersToUpdate)) {
            response.send("Done, No changes.");
            return;
        }

        ref.update(ordersToUpdate).then(() => {
            const changelog = _.map(ordersToUpdate, order => {
                return {
                    id: order.id,
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


};

function getUpdatedOrder(order) {
    updateField(order, "actualPayDay");
    updateField(order, "expectedPayDate");
    updateField(order, "followUpDate");
    updateField(order, "taxInvoiceDate");
    updateField(order, "proformaInvoiceDate");
    delete order.actualPayDay;
    
    if (_.has(order, "lectureTimes"))
        _.map(order.lectureTimes, time => {
            updateField(time, "date");
            delete time.organizationName;
            delete time.status;
            delete time.orderId;
            delete time.shirtColor;
        });
    return order;
}

function updateField(obj, fieldName) {
    if (_.has(obj, fieldName))
        obj[fieldName] = toSimpleDate(obj[fieldName]);
}

function toSimpleDate(dateString) {
    if (!dateString || dateString.length === 0 || !dateString.includes('T'))
        return dateString;

    let date = new Date(dateString);
    if (date.getHours() >= 20)
        date.setHours(date.getHours() + 4); //Increment day by one for time zone change

    const day = pad(date.getDate());
    const month = pad(date.getMonth() + 1);
    const year = date.getFullYear();

    return year + "-" + month + "-" + day;
}

function pad(number) {
    if (number >= 10)
        return number.toString();
    return '0' + number.toString();
}