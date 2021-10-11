import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import userReducer from "./User/user.reducer";

export const rootReducer = combineReducers({
  user: userReducer,
});

const configStorage = {
  key: "root",
  storage,
  whitelist: ["cartData"],
};

export default persistReducer(configStorage, rootReducer);
