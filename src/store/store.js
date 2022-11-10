import { configureStore } from '@reduxjs/toolkit';
import categoriesReducer from "./categories"
import commentsReducer from "./comments"
import deliveriesReducer from "./deliveries"
import ordersReducer from "./orders"
import paymentsReducer from "./payments"
import productByIdReducer from "./productById"
import productsReducer from "./products"
import productsByNameReducer from "./productsByName"
import userByIdReducer from "./userById"
import usersReducer from "./users"
import cartReducer, { selectCarts } from "./cart"
import thisUserReducer, { selectThisUserRoles, selectThisUser } from "./thisUser"
import allOrdersReducer from './allOrders'
import allProductsReducer from './allProducts'
import windowReducer from "./window"
import api, { endPoint } from '../lib/api';


export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    comments: commentsReducer,
    deliveries: deliveriesReducer,
    orders: ordersReducer,
    payments: paymentsReducer,
    productById: productByIdReducer,
    products: productsReducer,
    productsByName: productsByNameReducer,
    userById: userByIdReducer,
    users: usersReducer,
    cart: cartReducer,
    thisUser: thisUserReducer,
    allOrders: allOrdersReducer,
    allProducts: allProductsReducer,
    window: windowReducer,
  },
});

store.subscribe(() => {
  ((selectThisUserRoles(store.getState())[0]) === "Guest") ?
    (selectCarts(store.getState()).length ?
      window.localStorage.setItem("cart", JSON.stringify(selectCarts(store.getState()))) : window.localStorage.clear()) :
    api.put(endPoint.cart, { data: { userId: selectThisUser(store.getState()).userDb.id, products: selectCarts(store.getState()) } })
})