import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api, { endPoint } from "../lib/api";
import axios from "axios";

// Constantes para usar las queries de getProducts
export const NAME = "name";
export const PAGE = "page";
export const QUANTITY = "quantity";
export const CATEGORY = "category";
export const TYPE_ORDER = "typeOrder";
export const ASC = "ASC";
export const DESC = "DESC";
export const ORDERBY = "orderBy";
export const ID = "id";
export const PRICE = "price";
export const DESCRIPTION = "description";
export const STOCK = "stock";
export const RATING = "rating";
export const USER_ROL_ID = "usersRolId";

export const getProductsEndpoint = async (flags) => {
  try {
    const response = await api.get(endPoint.products, { params: flags });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const initialState = {
  products: { toBeField: true },
};

export const getProducts = createAsyncThunk(
  "products/getProducts",
  getProductsEndpoint
);

export const postProducts = createAsyncThunk(
  "products/postProducts",
  async ({ input }) => {
    try {
      const response = await api.post(postProducts, { data: input });
      alert("Product created successfully");
      return response.data;
    } catch (error) {
      alert("Error: " + error.message);
      console.error(error);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProdcuts",
  async ({ input, sid, setUpdate }) => {
    try {
      axios
        .put(
          `https://${
            process.env.REACT_APP_DEV_API || document.domain
          }/products?sid=${sid}`,
          input
        )
        .then((res) => {
          setUpdate({
            name: res.data.name,
            price: res.data.price,
            description: res.data.description,
            stock: res.data.stock,
            images: res.data.images,
          });
          alert("Product updated successfully");
        });
    } catch (error) {
      alert("Error: " + error.message);
      console.error(error);
    }
  }
);

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    start: (state) => {
      state.products = { toBeField: true };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.products = { idle: true };
      })
      .addCase(getProducts.rejected, (state) => {
        state.products = { error: "Something went wrong" };
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.products = action.payload;
      });
  },
});

export const selectProducts = (state) => state.products.products;

export const { start } = productsSlice.actions;

export default productsSlice.reducer;
