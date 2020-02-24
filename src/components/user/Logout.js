import {toast} from 'react-toastify';
import Notify from "../Notify";

export const logout = (props, history) => {
    sessionStorage.removeItem("Token");
    props.setIsAuthenticated(false);
    Notify(toast.TYPE.INFO, "Logged out");
    history.push("/");
};
