export const logout = (props, history) => {

    sessionStorage.removeItem("Token");
    props.setIsAuthenticated(false);
    history.push("/");
};
