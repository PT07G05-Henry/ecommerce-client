import { selectThisUserRoles } from "../store/thisUser"
import { store } from "../store/store"

const access = () => {
    let rol = selectThisUserRoles(store.getState());
    if (rol.find((e) => e === "Superadmin")) {
        return "Superadmin";
    }
    if (rol.find((e) => e === "Admin")) {
        return "Admin";
    }
    if (rol.find((e) => e === "User")) {
        return "User";
    }
    if (rol.find((e) => e === "Guest")) {
        return "Guest";
    }
};

export default access;