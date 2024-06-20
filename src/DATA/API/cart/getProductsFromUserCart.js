import networkService from "../authentication/networkService";

export default async function getProductsFromUserCart() {

    let path = "cart/"
    const result = await networkService.getFetchAuthenticated(path);
    const productArray = await Promise.all(result.array_products.map(async (element) => {
        const productId = element.product_id_ref;
        const productPath = "products/" + productId;
        const product = await networkService.getFetch(productPath);
        const result = {
            product ,
            quantity: element.quantity
        }
        return result;
    }))
    result.array_products = productArray;
    return result
}