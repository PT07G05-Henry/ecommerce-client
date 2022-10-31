import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  users: [{ toBeField: true }],
};


export const getUsers = createAsyncThunk("users/getUsers", async (flags) => {
  let queries = "?";
  flags &&
    typeof flags !== "string" &&
    Object.keys(flags).forEach((e) => {
      queries = queries + `${e}=${flags[e]}&`;
    });
  try {
    const response = await axios.get(
      !flags || typeof flags !== "string"
        ? `https://${
            process.env.REACT_APP_DEV_API || document.domain
          }/users/all${queries.length > 1 ? queries : ""}`
        : flags
    );
    return response.data;
    // if (email) {
    //   const response = await axios.get(
    //     `https://${
    //       process.env.REACT_APP_DEV_API || document.domain
    //     }/users?email=${email}`
    //   );
    //   return response.data;
    // } else {
    // }
  } catch (error) {
    console.error(error);
  }
});

export const updateUsers = createAsyncThunk(
  "users/updateUsers",
  async ({ input, sid, setUpdate  }) => {
    try {
      axios.put(
        `https://${process.env.REACT_APP_DEV_API || document.domain}/users?sid=${sid}`,
        input
      ).then((res) => {
        setUpdate({
          first_name: res.data.first_name,
          last_name: res.data.last_name,
          birth_date: res.data.birth_date,
          profile_picture: res.data.profile_picture,
          password: res.data.password
        })
      });
      alert('Your profile was updated successfully');
    } catch (error) {
      alert('Error: ' + error.message);
      console.error(error);
    }
  }
);

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    start: (state) => {
      state.users = [{ toBeField: true }];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.users = [{ idle: true }];
      })
      .addCase(getUsers.rejected, (state) => {
        state.users = [{ error: "Something went wrong" }];
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      });
  },
});

export const selectUser = (state) => state.users.users;

export const { start } = usersSlice.actions;

export default usersSlice.reducer;
