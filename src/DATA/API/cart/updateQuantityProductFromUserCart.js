import networkService from "../authentication/networkService";

export default async function updateQuantityProductFromUserCart(product_id, quantity) {
    const path = "cart/update/quantity"
    const body = {
        "product_id_ref": product_id,
        "quantity": quantity
    };

    return await networkService.putFetchAuthenticated(path, body);
}