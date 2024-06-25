import networkService from "../authentication/networkService";

export default async function deleteProductFromUserCart(product_id) {
    const path = "cart/remove"
    const body = {
        "product_id_ref": product_id
    };

    return await networkService.putFetchAuthenticated(path, body);
}