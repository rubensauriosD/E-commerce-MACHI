import {} from "../actions/action.jsx"

const initialState={
    Products:[]
}

const rootReducer=(state=initialState,{type, payload})=>{
    switch (type) {
        //case   : return {}

        default: return state
    }
}
export default rootReducer