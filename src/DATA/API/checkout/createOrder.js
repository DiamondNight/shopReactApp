import networkService from "../authentication/networkService";

async function createOrder(params) {
    const body = {
        "payment_method": params.payment_method,
        "payment_price": params.payment_price,
        "address": params.address,
    }

    console.log(body);
    return await networkService.postFetchAuthenticated("order/create", body);
}

export default createOrder