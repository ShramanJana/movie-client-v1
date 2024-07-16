
// isLoggedIn =>
export const isLoggedIn = () => {
    let authData = localStorage.getItem("auth");
    return authData != null;
}

// doLogin =>
export const doLogin = (authData, next) =>{
    localStorage.setItem("auth", JSON.stringify(authData));
    // can be used to redirect to a page after login
    next();
}

// doLogout =>
export const doLogout = (next) => {
    localStorage.removeItem("auth");
    // can be used to redirect to a page after login
    next();
}

//get currect user
export const getCurrentUserName = () => {
    if(isLoggedIn())
        return JSON.parse(localStorage.getItem("auth")).username;
    return undefined;
}

// get JWT token
export const getJwtToken = () => {
    if(isLoggedIn())
        return JSON.parse(localStorage.getItem("auth")).jwtToken;

    return undefined;
}
