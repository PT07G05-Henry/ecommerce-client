import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
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
  let queries = "?";
  flags &&
    typeof flags !== "string" &&
    Object.keys(flags).forEach((e) => {
      queries = queries + `${e}=${flags[e]}&`;
    });
  try {
    const response = await axios.get(
      !flags || typeof flags !== "string"
        ? `https://${process.env.REACT_APP_DEV_API || document.domain
        }/products${queries.length > 1 ? queries : ""}`
        : flags
    );
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
  "products/postProdcuts",
  async ({ input, sid }) => {
    try {
      const response = await axios.post(
        `https://${process.env.REACT_APP_DEV_API || document.domain}/products?sid=${sid}`, input
      );
      alert('Product created successfully');
      return response.data;
    } catch (error) {
      alert('Error: ' + error.message);
      console.error(error);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProdcuts",
  async ({ input, sid, setUpdate  }) => {
    try {
      axios.put(
        `https://${process.env.REACT_APP_DEV_API || document.domain}/products?sid=${sid}`,
        input
      ).then((res) => {
        setUpdate({
          name: res.data.name,
          price: res.data.price,
          description: res.data.description,
          stock: res.data.stock,
          images: res.data.images
        })
      });
      alert('Product updated successfully');

    }
    catch (error) {
      alert('Error: ' + error.message);
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
