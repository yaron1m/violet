const orderStatusCalculator = require("./order-status");
const _ = require('lodash');

module.exports = function (request, response, ordersRef, publicCoursesRef) {
    publicCoursesRef.once('value').then(publicCoursesSnapshot => {
        return publicCoursesSnapshot.val();
    }).then(publicCourses => {
        ordersRef.once('value').then(snapshot => {
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

            ordersRef.update(updatedOrders).then(() => {
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
};


