import axios from "axios"
import { selectThisUserSid } from "../store/thisUser"
import { store } from "../store/store"

export const endPoint = {
    categories: "categories", comments: "comments", deliveries: "deliveries", orders: "orders", allOrders: "orders/all", payments: "payments", products: "products", postProducts: "products/postProducts", thisUser: "users/auth0", users: "users", mercado: "mercado", cart: "cart"
}

export const query = {
    name: "name", page: "page", quantity: "quantity", category: "category", typeOrder: "typeOrder", orderBy: "orderBy"
}

export const value = {
    ASC: "ASC", DESC: "DESC", id: "id", price: "price", description: "description", stock: "stock", rating: "rating", usersRolId: "usersRolId"
}

class Api {
    constructor() {
        const methods = ["get", "delete", "post", "put", "patch"]
        const instanceOfThis = this;
        methods.forEach((method) => {
            instanceOfThis[method] = async (endpoint, config) => {
                const sid = selectThisUserSid(store.getState());
                let request = {
                    url: `https://${process.env.REACT_APP_DEV_API || document.domain}/${endpoint}`,
                    method: method,

                }
                config && config.data && (request.data = config.data)
                config && config.params && (request.params = config.params)
                config && config.headers && (request.headers = config.headers)
                sid && (request.params ? (request.params = { ...request.params, sid: sid }) : (request.params = { sid: sid }))
                return axios(request);
            }
        })
    }
}

const api = new Api();
export default api;