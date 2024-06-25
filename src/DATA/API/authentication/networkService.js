import storageService from "./storageService";
import URL from "../URL";

async function getFetch(path) {
    const url = URL + path;

    const response = await fetch(url);
    const result = await response.json();

    return result;
}

async function getFetchAuthenticated(path) {
    const url = URL + path;
    const options = {
        headers: {
            token: storageService.getAuthToken()
        }
    }

    const response = await fetch(url, options);
    const result = await response.json();

    return result;
}

async function postFetch(path, body) {
    const url = URL + path;
    const options = {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        },
    }

    const response = await fetch(url, options);
    const result = await response.json();

    return result;
}

async function postFetchAuthenticated(path, body) {
    try {
        const url = URL + path;
        console.log(url);
        const token = storageService.getAuthToken();
        const options = {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                token,
            },
        }
        const response = await fetch(url, options);
        const result = await response.json();
        return result;

    } catch (error) {
        console.error("Error:", error)
    }

}

async function putFetchAuthenticated(path, body) {
    try {
        const url = URL + path;
        const token = storageService.getAuthToken();
        const options = {
            method: "PUT",
            body: JSON.stringify(body),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                token,
            },
        }
        const response = await fetch(url, options);
        const result = await response.json();
        return result;

    } catch (error) {
        console.error("Error:", error)
    }

}

export default {
    getFetch,
    getFetchAuthenticated,
    postFetch,
    postFetchAuthenticated,
    putFetchAuthenticated

}