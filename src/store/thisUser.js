import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api, { endPoint } from "../lib/api";

export const fakeRoles = {
  none: "None",
  guest: "Guest",
  user: "User",
  admin: "Admin",
  superadmin: "Superadmin"
}

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
  fakeRol: fakeRoles.none
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

export const updateThisUser = createAsyncThunk(
  "thisUser/updateThisUser",
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
    setFakeRol: (state, action) => { state.fakeRol = action.payload }
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
      })
      .addCase(updateThisUser.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export const selectThisUser = (state) => state.thisUser.user;
export const selectFakeRol = (state) => state.thisUser.fakeRol;
export const selectThisUserRoles = (state) => {
  return state.thisUser.fakeRol === fakeRoles.none ? state.thisUser.user.roles ? state.thisUser.user.roles.length ? state.thisUser.user.roles : ["User"] : ["Guest"] : [state.thisUser.fakeRol];
};
export const selectThisUserRolesWithoutFake = (state) => {
  return state.thisUser.user.roles ? state.thisUser.user.roles.length ? state.thisUser.user.roles[0] : "User" : "Guest";
};
export const selectThisUserId = (state) => {
  return state.thisUser.user.userDb && state.thisUser.user.userDb.id ? state.thisUser.user.userDb.id : -1;
};
export const selectThisUserSid = (state) => {
  return (state.thisUser.user && state.thisUser.user.userDb && state.thisUser.user.userDb.sid) ? state.thisUser.user.userDb.sid : undefined;
}

export const { start, setFakeRol } = thisUserSlice.actions;

export default thisUserSlice.reducer;
