import * as Immutable from "seamless-immutable";

export default function calculateOrderStatus(order){

    const status = "order";


    return Immutable.merge(order, {
        status: status
    });
}