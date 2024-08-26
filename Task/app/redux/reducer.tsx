import { SELECTED_STATUS } from "./action";

const initialStatusState={
    value:""
};

export const selectedStatusReducer=(state=initialStatusState,action:any)=>{
    switch(action.type){
        case SELECTED_STATUS:
        return {...state,value:action.payload}
        default:
        return state
    }  
}