import networkService from "./networkService"

async function registerUser(email, password, name) {
    const body = {
        email,
        password,
        name
    }
    return networkService.postFetch("user/register", body);
}

async function loginUser(email, password) {
    const body = {
        email,
        password
    };
    return await networkService.postFetch("user/login", body);
}

export default {
    registerUser,
    loginUser
}