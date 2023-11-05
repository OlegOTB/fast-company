import { combineReducers, configureStore } from "@reduxjs/toolkit";
import qualitiesReducer from "./qualities";
import professionsReducer from "./profession";
import usersReducer from "./users";

const rootReducer = combineReducers({
  qualities: qualitiesReducer,
  professions: professionsReducer,
  users: usersReducer
});

export function createstore() {
  return configureStore({
    reducer: rootReducer
  });
}
