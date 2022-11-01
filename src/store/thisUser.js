import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api, { endPoint } from "../lib/api";

const makeUserObject = (user) => {
  const social = user.sub.split("|");
  if (social[0].includes("google")) {
    return {
      first_name: user.given_name,
      last_name: user.family_name,
      email: user.email,
      picture_profile: user.picture,
      social: "google",
    };
  }
  if (social[0].includes("microsoft")) {
    return {
      first_name: user.given_name,
      last_name: user.family_name,
      email: user.email,
      picture_profile: user.picture,
      social: "microsoft",
    };
  }
  if (social[0].includes("auth0")) {
    return {
      first_name: user.nickname,
      email: user.email,
      picture_profile: user.picture,
      social: "auth0",
    };
  }
};

const initialState = {
  user: { toBeField: true },
};

export const getThisUser = createAsyncThunk(
  "thisUser/getThisUser",
  async ({ user, sid }) => {
    let userToPost = makeUserObject(user);
    userToPost.sid = sid;
    try {
      const response = await api.post(endPoint.thisUser, { data: userToPost });
      return response.data;
    } catch (error) {
      console.error(error);
      return error.message;
    }
  }
);

export const thisUserSlice = createSlice({
  name: "thisUser",
  initialState,
  reducers: {
    start: (state) => {
      state.user = { toBeField: true };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getThisUser.pending, (state) => {
        state.user = { idle: true };
      })
      .addCase(getThisUser.rejected, (state) => {
        state.user = [{ error: "Something went wrong" }];
      })
      .addCase(getThisUser.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export const selectThisUser = (state) => state.thisUser.user;
export const selectThisUserRoles = (state) => {
  return state.thisUser.user.roles ? state.thisUser.user.roles : ["Guest"];
};
export const selectThisUserSid = (state) => {
  return (state.thisUser.user && state.thisUser.user.userDb && state.thisUser.user.userDb.sid) ? state.thisUser.user.userDb.sid : undefined;
}

export const { start } = thisUserSlice.actions;

export default thisUserSlice.reducer;
