import { combineReducers, configureStore } from "@reduxjs/toolkit";
import qualitiesReducer from "./qualities";
import professionsReducer from "./profession";

const rootReducer = combineReducers({
  qualities: qualitiesReducer,
  professions: professionsReducer
});

export function createstore() {
  return configureStore({
    reducer: rootReducer
  });
}
