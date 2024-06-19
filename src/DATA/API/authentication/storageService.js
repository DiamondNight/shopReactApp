function getAuthToken() {
    return localStorage.getItem("at");
}

function getId() {
    return localStorage.getItem("id");
}

function setAuthToken(token) {
    localStorage.setItem("at", token);
}

function removeAuthToken() {
    localStorage.removeItem("at");
    localStorage.removeItem("id");
}

export default {
    getAuthToken,
    setAuthToken,
    removeAuthToken,
    getId
}