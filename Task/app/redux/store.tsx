import { createStore,combineReducers} from "redux";
import { selectedStatusReducer } from "./reducer";

const rootReducer =combineReducers({
    status: selectedStatusReducer
  });

const store=createStore(
    rootReducer
)
   
export default store;