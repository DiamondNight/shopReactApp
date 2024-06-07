import { useEffect, useState } from "react";
import URL from "./URL";

export default async function useGetProducts(type) {
    const url = URL + 'products/' + type;
    const [productData, setProductData] = useState([]);
    useEffect(() => {
        async function getProducts() {
            try {
                const response = await fetch(url);
                const result = await response.json();
                console.log(result);
                setProductData(result)
            } catch (error) {
                console.error(error);
            }

        }
        getProducts()
    }, [url])

    return productData;
}



