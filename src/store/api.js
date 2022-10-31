/*

ATENCIÓN! > ESTE ES UN ARCHIVO DEDICADO UNICAMENTE PARA MANTENER LA COMPATIBILIDAD DE LOS
COMPONENTES CREADOS ANTES DE LA MODULARIZACIÓN DEL STORE DE REDUX.

NO IMPORTAR ESTE ARCHIVO A NUEVOS COMPONENTES NI VOLVER A MODIFICAR

SI NECESITAN EXTENDER LA FUNCIONALIDAD DEL STORE PARA NUEVOS COMPONENTES O ACTUALIZAR 
COMPONENTES VIEJOS USEN E IMPORTEN LOS NUEVOS MÓDULOS.

*/

import { getCategories as newGetCategories, postCategories as newPostCategories,selectCategories as newSelectCategories } from "./categories";
import { getComments as newGetComments, selectComments as newSelectComments } from "./comments";
import { getDeliveries as newGetDeliveries, selectDeliveries as newSelectDeliveries } from "./deliveries";
import { getOrders as newGetOrders, selectOrders as newSelectOrders } from "./orders";
import { getPayments as newGetPayments, selectPayments as newSelectPayments } from "./payments";
import {
    NAME as NEW_NAME,
    PAGE as NEW_PAGE,
    QUANTITY as NEW_QUANTITY,
    CATEGORY as NEW_CATEGORY,
    TYPE_ORDER as NEW_TYPE_ORDER,
    ASC as NEW_ASC,
    DESC as NEW_DESC,
    ORDERBY as NEW_ORDERBY,
    ID as NEW_ID,
    PRICE as NEW_PRICE,
    DESCRIPTION as NEW_DESCRIPTION,
    STOCK as NEW_STOCK,
    RATING as NEW_RATING,
    USER_ROL_ID as NEW_USER_ROL_ID,
    getProducts as newGetProducts,
    selectProducts as newSelectProducts,
    postProducts as newPostProducts,
} from "./products";
import { getProductsByName as newGetProductsByName, selectProductsByName as newSelectProductsByName } from "./productsByName";
import { getProductById as newGetProductById, selectProductsById as newSelectProductsById } from "./productById";
import { getUsers as newGetUsers, selectUser as newSelectUser,  updateUsers as newUpdateUsers } from "./users";
import { getUsersById as newGetUsersById, selectUserById as newSelectUserById } from "./userById";

export const postCategories = newPostCategories;
export const getCategories = newGetCategories;
export const selectCategories = newSelectCategories;
export const getComments = newGetComments;
export const selectComments = newSelectComments;
export const getDeliveries = newGetDeliveries;
export const selectDeliveries = newSelectDeliveries;
export const getOrders = newGetOrders;
export const selectOrders = newSelectOrders;
export const getPayments = newGetPayments;
export const selectPayments = newSelectPayments;
export const NAME = NEW_NAME;
export const PAGE = NEW_PAGE;
export const QUANTITY = NEW_QUANTITY;
export const CATEGORY = NEW_CATEGORY;
export const TYPE_ORDER = NEW_TYPE_ORDER;
export const ASC = NEW_ASC;
export const DESC = NEW_DESC;
export const ORDERBY = NEW_ORDERBY;
export const ID = NEW_ID;
export const PRICE = NEW_PRICE;
export const DESCRIPTION = NEW_DESCRIPTION;
export const STOCK = NEW_STOCK;
export const RATING = NEW_RATING;
export const USER_ROL_ID = NEW_USER_ROL_ID;
export const postProducts = newPostProducts;
export const getProducts = newGetProducts;
export const selectProducts = newSelectProducts;
export const getProductsByName = newGetProductsByName;
export const selectProductsByName = newSelectProductsByName;
export const getProductById = newGetProductById;
export const selectProduct = newSelectProductsById;
export const getUsers = newGetUsers;
export const selectUser = newSelectUser;
export const getUsersById = newGetUsersById;
export const selectUsers = newSelectUserById;
export const updateUser = newUpdateUsers;
