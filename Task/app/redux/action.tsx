export const SELECTED_STATUS="SELECTED_STATUS";

export const selectedStatus=(text:any)=>{
    return {type:SELECTED_STATUS,
            payload:text,}
}
;