import authService from "../../DATA/API/authentication/authService";
import storageService from "../../DATA/API/authentication/storageService";

async function logInEvent(email, password) {
    try {
        const token = await authService.loginUser(email, password);
        storageService.setAuthToken(token.token, token.id);
        return token
    } catch (error) {
        console.error(error);
        return (error)
    }
}

async function registerEvent(email, password, name) {
    try {
        const userRegister = await authService.registerUser(
            email,
            password,
            name
        );
        if (userRegister.status === "OK") {
            await logInEvent(email, password)
            return
        } else {
            alert(userRegister.message)
            return
        }
    }
    catch (error) {
        console.log("Error", error);
        return (error)
    }
}
export default {
    logInEvent,
    registerEvent
}