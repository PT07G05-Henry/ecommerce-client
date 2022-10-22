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
import cartReducer from "./cart"

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
  },
});