import networkService from "../authentication/networkService";

export default async function addProductToCart(product_id, quantity) {
    const path = "cart/add"
    const body = {
        "product_id_ref": product_id,
        "quantity": quantity
    };

    return await networkService.putFetchAuthenticated(path, body);
}