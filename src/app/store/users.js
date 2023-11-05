import { createAction, createSlice } from "@reduxjs/toolkit";
import userService from "../services/user.service";
import authService from "../services/auth.service";
import localStorageService from "../services/localStorage.service";
import randomInt from "../utils/getRandomInt";
import history from "../utils/history";
import { generationAuthError } from "../utils/generateAuthError";

const initialState = localStorageService.getAccessToken()
  ? {
      entities: null,
      isLoading: true,
      error: null,
      auth: { userId: localStorageService.getUserId() },
      isLoggedIn: true,
      dataLoaded: false
    }
  : {
      entities: null,
      isLoading: false,
      error: null,
      auth: null,
      isLoggedIn: false,
      dataLoaded: false
    };
const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    usersRequested: (state) => {
      state.isLoading = true;
    },
    usersReceved: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
      state.dataLoaded = true;
    },
    usersRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    authRequestSuccess: (state, action) => {
      state.auth = action.payload;
      state.isLoggedIn = true;
    },
    authRequestFailed: (state, action) => {
      state.error = action.payload;
    },
    userCreated: (state, action) => {
      if (!Array.isArray(state.entities)) {
        state.entities = [];
      }
      state.entities.push(action.payload);
    },
    userLoggedOut: (state) => {
      state.entities = null;
      state.auth = null;
      state.isLoggedIn = false;
      state.dataLoaded = false;
    },
    userUpdateSuccessed: (state, action) => {
      const index = state.entities.findIndex(
        (u) => u._id === state.auth.userId
      );
      state.entities[index] = action.payload;
    },
    authRequested: (state) => {
      state.error = null;
    }
  }
});
const userCreateRequested = createAction("users/userCreateRequested");
const createUserFailed = createAction("users/createUserFailed");
const userUpdateRequested = createAction("users/userUpdateRequested");
const updateUserFailed = createAction("users/updateUserFailed");

export const logOut = () => (dispatch) => {
  localStorageService.removeAuthData();
  dispatch(userLoggedOut());
  history.push("/");
};
export const login =
  ({ payload, redirect }) =>
  async (dispatch) => {
    const { email, password } = payload;
    dispatch(authRequested());
    try {
      const data = await authService.login({ email, password });
      dispatch(authRequestSuccess({ userId: data.localId }));
      localStorageService.setTokens(data);
      history.push(redirect);
    } catch (error) {
      const { code, message } = error.response.data.error;
      if (code === 400) {
        const errorMessage = generationAuthError(message);
        dispatch(authRequestFailed(errorMessage));
      } else {
        dispatch(authRequestFailed(error.message));
      }
    }
  };
export const signUp =
  ({ email, password, ...rest }) =>
  async (dispatch) => {
    dispatch(authRequested());
    try {
      const data = await authService.register({ email, password });
      localStorageService.setTokens(data);
      // console.log(data.localId);
      dispatch(authRequestSuccess({ userId: data.localId }));
      dispatch(
        createUser({
          _id: data.localId,
          email,
          rate: randomInt(1, 5),
          completedMeetings: randomInt(0, 200),
          image: `https://avatars.dicebear.com/api/avataaars/${(
            Math.random() + 1
          )
            .toString(36)
            .substring(7)}.svg`,
          ...rest
        })
      );
    } catch (error) {
      dispatch(authRequestFailed(error.message));
    }
  };
function createUser(payload) {
  return async function (dispatch) {
    dispatch(userCreateRequested());
    try {
      const { content } = await userService.create(payload);
      // console.log(content);
      dispatch(userCreated(content));
      history.push("/users");
    } catch (error) {
      dispatch(createUserFailed(error.message));
    }
  };
}

export const updateUser = (payload) => async (dispatch) => {
  dispatch(userUpdateRequested());
  try {
    const { content } = await userService.update(payload);
    // console.log(content);
    dispatch(userUpdateSuccessed(content));
    history.push(`/Users/${content._id}`);
  } catch (error) {
    dispatch(updateUserFailed(error.message));
  }
};

const { reducer: usersReducer, actions } = usersSlice;
const {
  usersRequested,
  usersReceved,
  usersRequestFailed,
  authRequestSuccess,
  authRequestFailed,
  userCreated,
  userLoggedOut,
  userUpdateSuccessed,
  authRequested
} = actions;

export const loadUsersList = () => async (dispatch) => {
  dispatch(usersRequested());
  try {
    const { content } = await userService.get();
    dispatch(usersReceved(content));
  } catch (error) {
    dispatch(usersRequestFailed(error.message));
  }
};

export const getUsers = () => (state) => state.users.entities;
export const getUsersLoadingStatus = () => (state) => state.users.isLoading;
export const getCurrentUserData = () => (state) => {
  return state.users.entities
    ? state.users.entities.find((u) => u._id === state.users.auth.userId)
    : null;
};
export const getUserById = (userId) => (state) => {
  return state.users.entities
    ? state.users.entities.find((u) => u._id === userId)
    : null;
};
export const getIsLoggedIn = () => (state) => state.users.isLoggedIn;
export const getDataStaus = () => (state) => state.users.dataLoaded;
export const getCurrentUserId = () => (state) => state.users.auth.userId;
export const getAuthErrors = () => (state) => state.users.error;
export default usersReducer;
